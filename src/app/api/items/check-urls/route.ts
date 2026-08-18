import { NextResponse } from 'next/server';
import { updateTag } from 'next/cache';
import { auth } from '@/server/auth';
import { connectDB } from '@/server/db';
import { Item } from '@/server/db/models';

interface CheckResult {
  id: string;
  title: string;
  oldUrl: string;
  newUrl?: string;
  status: 'updated' | 'down' | 'ok';
  error?: string;
}

async function checkUrl(url: string): Promise<{ finalUrl: string; ok: boolean; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SinglaWorkshop/1.0)' },
    });

    clearTimeout(timeout);

    const finalUrl = res.url || url;
    return { finalUrl, ok: res.ok };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return { finalUrl: url, ok: false, error: 'Timeout (10s)' };
    }
    return { finalUrl: url, ok: false, error: err.message || 'Connection failed' };
  }
}

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  const items = await Item.find({ urlUnstable: true, url: { $exists: true, $ne: '' } }).lean();
  const results: CheckResult[] = [];

  for (const item of items) {
    const { finalUrl, ok, error } = await checkUrl(item.url);

    if (!ok) {
      results.push({
        id: item._id.toString(),
        title: item.title,
        oldUrl: item.url,
        status: 'down',
        error: error || 'Site returned error status',
      });
    } else if (finalUrl !== item.url) {
      await Item.findByIdAndUpdate(item._id, { url: finalUrl });
      results.push({
        id: item._id.toString(),
        title: item.title,
        oldUrl: item.url,
        newUrl: finalUrl,
        status: 'updated',
      });
    } else {
      results.push({
        id: item._id.toString(),
        title: item.title,
        oldUrl: item.url,
        status: 'ok',
      });
    }
  }

  if (results.some((r) => r.status === 'updated')) {
    updateTag('items');
  }

  return NextResponse.json({ results, checkedAt: new Date().toISOString() });
}
