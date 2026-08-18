import { HeroSection } from '@/features/home/components/hero-section';
import { DirectoryBrowser } from '@/features/home/components/directory-browser';
import { WorkshopStats } from '@/features/home/components/workshop-stats';
import { RecentActivity } from '@/features/home/components/recent-activity';
import { getItemCounts, getRecentItems, getAllActiveItems, getSections } from '@/server/data';

export default async function HomePage() {
  const [stats, recentItems, allItems, sections] = await Promise.all([
    getItemCounts(),
    getRecentItems(5),
    getAllActiveItems(),
    getSections(),
  ]);

  const recentFormatted = recentItems.map((item: any) => ({
    title: item.title,
    sectionName: item.section?.name ?? 'Uncategorized',
    sectionSlug: item.section?.slug ?? '',
    sectionColor: item.section?.color ?? 'hsl(36 100% 50%)',
    updatedAt: item.updatedAt.toString(),
  }));

  const directoryItems = allItems.map((item: any) => ({
    _id: item._id.toString(),
    title: item.title,
    slug: item.slug,
    description: item.description ?? '',
    url: item.url ?? '',
    urlUnstable: item.urlUnstable ?? false,
    pinned: item.pinned ?? false,
    featured: item.featured ?? false,
    sectionName: item.section?.name ?? 'Uncategorized',
    sectionSlug: item.section?.slug ?? '',
    sectionColor: item.section?.color ?? 'hsl(36 100% 50%)',
  }));

  const sectionsFormatted = sections.map((s: any) => ({
    _id: s._id.toString(),
    name: s.name,
    slug: s.slug,
    color: s.color ?? 'hsl(36 100% 50%)',
    icon: s.icon ?? 'Globe',
  }));

  return (
    <div className="flex flex-1">
      <div className="flex-1 px-4 py-6 md:px-8 lg:px-10">
        <HeroSection />
        <div className="mt-8">
          <DirectoryBrowser items={directoryItems} sections={sectionsFormatted} />
        </div>
        <div className="mt-8 space-y-4 xl:hidden">
          <WorkshopStats stats={stats} />
          <RecentActivity items={recentFormatted} />
        </div>
      </div>
      <aside className="border-border hidden w-72 shrink-0 space-y-4 border-l p-6 xl:block">
        <WorkshopStats stats={stats} />
        <RecentActivity items={recentFormatted} />
      </aside>
    </div>
  );
}
