import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllItems } from '@/server/data/items';
import { ItemListAdmin } from '@/features/admin/components/item-list-admin';

export const metadata: Metadata = { title: 'Manage Items' };

export default async function AdminItemsPage() {
  const items = await getAllItems();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Items</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            All content items across all sections.
          </p>
        </div>
        <Link
          href="/admin/items/new"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          New Item
        </Link>
      </div>

      <div className="mt-6">
        <ItemListAdmin items={JSON.parse(JSON.stringify(items))} />
      </div>
    </div>
  );
}
