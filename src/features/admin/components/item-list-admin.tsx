'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Check, X, AlertTriangle, RefreshCw } from 'lucide-react';
import { deleteItemAction, quickUpdateUrlAction } from '@/app/admin/(protected)/items/actions';

interface Item {
  _id: string;
  title: string;
  slug: string;
  url?: string;
  urlUnstable?: boolean;
  status: string;
  section: { _id: string; name: string; slug: string } | null;
  updatedAt: string;
}

interface ItemListAdminProps {
  items: Item[];
}

interface CheckResult {
  id: string;
  title: string;
  oldUrl: string;
  newUrl?: string;
  status: 'updated' | 'down' | 'ok';
  error?: string;
}

function InlineUrlEdit({ itemId, currentUrl }: { itemId: string; currentUrl: string }) {
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(currentUrl);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSave() {
    if (!url || url === currentUrl) {
      setEditing(false);
      return;
    }
    setSaving(true);
    await quickUpdateUrlAction(itemId, url);
    setSaving(false);
    setEditing(false);
    router.refresh();
  }

  if (!editing) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground max-w-[200px] truncate font-mono text-[11px]">
          {currentUrl || 'No URL'}
        </span>
        <button
          onClick={() => setEditing(true)}
          className="text-muted-foreground hover:text-primary p-0.5 transition-colors"
          title="Quick edit URL"
        >
          <Pencil className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') { setUrl(currentUrl); setEditing(false); }
        }}
        autoFocus
        disabled={saving}
        className="border-border bg-background w-[220px] rounded border px-2 py-0.5 font-mono text-[11px] focus:border-primary focus:outline-none"
      />
      <button onClick={handleSave} disabled={saving} className="text-green-500 hover:text-green-400 p-0.5">
        <Check className="h-3 w-3" />
      </button>
      <button onClick={() => { setUrl(currentUrl); setEditing(false); }} className="text-muted-foreground hover:text-destructive p-0.5">
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

function UrlCheckResults({ results }: { results: CheckResult[] }) {
  const updated = results.filter((r) => r.status === 'updated');
  const down = results.filter((r) => r.status === 'down');
  const ok = results.filter((r) => r.status === 'ok');

  return (
    <div className="border-border bg-card rounded-lg border p-4 space-y-3">
      <h3 className="text-sm font-semibold">URL Check Results</h3>

      {updated.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-green-400">Updated ({updated.length})</p>
          {updated.map((r) => (
            <p key={r.id} className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{r.title}</span>:{' '}
              <span className="line-through">{r.oldUrl}</span> → <span className="text-green-400">{r.newUrl}</span>
            </p>
          ))}
        </div>
      )}

      {down.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-red-400">Down ({down.length}) — needs manual action</p>
          {down.map((r) => (
            <p key={r.id} className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{r.title}</span>:{' '}
              {r.oldUrl} — <span className="text-red-400">{r.error}</span>
            </p>
          ))}
        </div>
      )}

      {ok.length > 0 && (
        <p className="text-xs text-muted-foreground">{ok.length} site(s) OK — no changes needed.</p>
      )}
    </div>
  );
}

export function ItemListAdmin({ items }: ItemListAdminProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [checkResults, setCheckResults] = useState<CheckResult[] | null>(null);

  const unstableCount = items.filter((i) => i.urlUnstable).length;

  async function handleCheckUrls() {
    setChecking(true);
    setCheckResults(null);
    try {
      const res = await fetch('/api/items/check-urls', { method: 'POST' });
      const data = await res.json();
      setCheckResults(data.results);
      router.refresh();
    } catch {
      setCheckResults([]);
    }
    setChecking(false);
  }

  if (items.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No items yet. Create one to get started.
      </p>
    );
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deleteItemAction(id);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {unstableCount > 0 && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleCheckUrls}
            disabled={checking}
            className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 disabled:opacity-50 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${checking ? 'animate-spin' : ''}`} />
            {checking ? 'Checking...' : `Check Unstable URLs (${unstableCount})`}
          </button>
        </div>
      )}

      {checkResults && <UrlCheckResults results={checkResults} />}

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item._id}
            className="border-border flex items-center justify-between rounded-md border px-4 py-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{item.title}</p>
                {item.urlUnstable && (
                  <span title="URL may change">
                    <AlertTriangle className="h-3 w-3 text-amber-400" />
                  </span>
                )}
              </div>
              <InlineUrlEdit itemId={item._id} currentUrl={item.url ?? ''} />
              <p className="text-muted-foreground text-xs">
                {item.section?.name ?? 'No category'} ·{' '}
                {new Date(item.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/items/${item._id}/edit`}
                className="text-primary text-xs font-medium hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item._id, item.title)}
                className="text-destructive text-xs font-medium hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
