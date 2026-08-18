import { HeroSection } from '@/features/home/components/hero-section';
import { ProjectGrid } from '@/features/home/components/category-grid';
import { WorkshopStats } from '@/features/home/components/workshop-stats';
import { RecentActivity } from '@/features/home/components/recent-activity';
import { getItemCounts, getRecentItems, getFeaturedItems } from '@/server/data';

export default async function HomePage() {
  const [stats, recentItems, featuredItems] = await Promise.all([
    getItemCounts(),
    getRecentItems(5),
    getFeaturedItems(6),
  ]);

  const recentFormatted = recentItems.map((item: any) => ({
    title: item.title,
    sectionName: item.section?.name ?? 'Uncategorized',
    sectionSlug: item.section?.slug ?? '',
    sectionColor: item.section?.color ?? 'hsl(36 100% 50%)',
    updatedAt: item.updatedAt.toString(),
  }));

  const featuredFormatted = featuredItems.map((item: any) => ({
    title: item.title,
    description: item.description,
    url: item.url ?? '#',
    urlUnstable: item.urlUnstable ?? false,
    sectionName: item.section?.name ?? 'Uncategorized',
    sectionSlug: item.section?.slug ?? '',
    sectionColor: item.section?.color ?? 'hsl(36 100% 50%)',
  }));

  return (
    <div className="flex flex-1">
      <div className="flex-1 px-4 py-6 md:px-8 lg:px-10">
        <HeroSection />
        <div className="mt-8">
          <ProjectGrid items={featuredFormatted} />
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
