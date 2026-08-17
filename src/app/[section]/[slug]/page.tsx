import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getItemBySlug } from '@/server/data/items';
import { ItemDetail } from '@/features/section/components/item-detail';

interface PageProps {
  params: Promise<{ section: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section, slug } = await params;
  const item = await getItemBySlug(section, slug);
  if (!item) return { title: 'Not Found' };
  return {
    title: item.title,
    description: item.description || `${item.title} in Singla Workshop.`,
  };
}

export default async function ItemPage({ params }: PageProps) {
  const { section, slug } = await params;
  const item = await getItemBySlug(section, slug);
  if (!item) notFound();

  return (
    <div className="px-4 py-8 md:px-8 lg:px-10">
      <ItemDetail item={JSON.parse(JSON.stringify(item))} sectionSlug={section} />
    </div>
  );
}
