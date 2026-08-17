'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteItemAction } from '@/app/admin/items/actions';

interface Item {
  _id: string;
  title: string;
  slug: string;
  status: string;
  section: { _id: string; name: string; slug: string } | null;
  updatedAt: string;
}

interface ItemListAdminProps {
  items: Item[];
}

export function ItemListAdmin({ items }: ItemListAdminProps) {
  const router = useRouter();

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
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item._id}
          className="border-border flex items-center justify-between rounded-md border px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-muted-foreground text-xs">
              {item.section?.name ?? 'No section'} · {item.status.replace('_', ' ')} ·{' '}
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
  );
}
