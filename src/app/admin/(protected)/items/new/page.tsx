import { connection } from 'next/server';
import type { Metadata } from 'next';
import { getAllSections } from '@/server/data/sections';
import { ItemForm } from '@/features/admin/components/item-form';

export const metadata: Metadata = { title: 'Create Item' };

export default async function AdminNewItemPage() {
  await connection();
  const sections = await getAllSections();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Create Item</h1>
      <p className="text-muted-foreground mt-1 text-sm">Add a new item to your workshop.</p>
      <div className="mt-6 max-w-2xl">
        <ItemForm sections={JSON.parse(JSON.stringify(sections))} />
      </div>
    </div>
  );
}
