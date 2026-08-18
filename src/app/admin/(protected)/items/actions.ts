'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/server/auth/helpers';
import { createItem, updateItem, deleteItem, quickUpdateUrl } from '@/server/data/items';
import { createItemSchema, updateItemSchema, quickUpdateUrlSchema } from '@/server/validations/item';

export async function createItemAction(formData: FormData) {
  await requireAuth();

  const tags = (formData.get('tags') as string || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const raw = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    section: formData.get('section') as string,
    description: formData.get('description') as string,
    content: formData.get('content') as string || '',
    tags,
    status: (formData.get('status') as string) || 'ACTIVE',
    url: (formData.get('url') as string) || undefined,
    imageUrl: (formData.get('imageUrl') as string) || undefined,
    featured: formData.get('featured') === 'true',
    pinned: formData.get('pinned') === 'true',
    urlUnstable: formData.get('urlUnstable') === 'true',
  };

  const parsed = createItemSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Validation failed' };
  }

  await createItem(parsed.data);
  revalidatePath('/', 'layout');
  return { success: true };
}

export async function updateItemAction(id: string, formData: FormData) {
  await requireAuth();

  const tags = (formData.get('tags') as string || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const raw = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    section: formData.get('section') as string,
    description: formData.get('description') as string,
    content: formData.get('content') as string || '',
    tags,
    status: (formData.get('status') as string) || 'ACTIVE',
    url: (formData.get('url') as string) || undefined,
    imageUrl: (formData.get('imageUrl') as string) || undefined,
    featured: formData.get('featured') === 'true',
    pinned: formData.get('pinned') === 'true',
    urlUnstable: formData.get('urlUnstable') === 'true',
  };

  const parsed = updateItemSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Validation failed' };
  }

  await updateItem(id, parsed.data);
  revalidatePath('/', 'layout');
  return { success: true };
}

export async function deleteItemAction(id: string) {
  await requireAuth();
  await deleteItem(id);
  revalidatePath('/', 'layout');
  return { success: true };
}

export async function quickUpdateUrlAction(id: string, url: string) {
  await requireAuth();

  const parsed = quickUpdateUrlSchema.safeParse({ url });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid URL' };
  }

  await quickUpdateUrl(id, parsed.data.url);
  revalidatePath('/', 'layout');
  return { success: true };
}
