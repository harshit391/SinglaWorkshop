import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getItemById } from '@/server/data/items';
import { getAllSections } from '@/server/data/sections';
import { ItemForm } from '@/features/admin/components/item-form';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: 'Edit Item' };

export default async function AdminEditItemPage({ params }: PageProps) {
  const { id } = await params;
  const [item, sections] = await Promise.all([getItemById(id), getAllSections()]);

  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Item</h1>
      <p className="text-muted-foreground mt-1 text-sm">Update &ldquo;{(item as any).title}&rdquo;</p>
      <div className="mt-6 max-w-2xl">
        <ItemForm
          item={JSON.parse(JSON.stringify(item))}
          sections={JSON.parse(JSON.stringify(sections))}
        />
      </div>
    </div>
  );
}
