import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSectionBySlug } from '@/server/data/sections';
import { getItemsBySection } from '@/server/data/items';
import { SectionHeader } from '@/features/section/components/section-header';
import { ItemList } from '@/features/section/components/item-list';

interface PageProps {
  params: Promise<{ section: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section: slug } = await params;
  const section = await getSectionBySlug(slug);
  if (!section) return { title: 'Not Found' };
  return {
    title: section.name,
    description: section.description || `Explore ${section.name} in Singla Workshop.`,
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { section: slug } = await params;
  const section = await getSectionBySlug(slug);
  if (!section || !section.isVisible) notFound();

  const items = await getItemsBySection(section._id.toString());

  return (
    <div className="px-4 py-8 md:px-8 lg:px-10">
      <SectionHeader name={section.name} description={section.description} icon={section.icon} />
      <div className="mt-8">
        <ItemList items={JSON.parse(JSON.stringify(items))} sectionSlug={slug} />
      </div>
    </div>
  );
}
