import { HeroSection } from '@/features/home/components/hero-section';
import { ProjectGrid } from '@/features/home/components/category-grid';
import { TodaysNote } from '@/features/home/components/todays-note';
import { WorkshopStats } from '@/features/home/components/workshop-stats';
import { RecentActivity } from '@/features/home/components/recent-activity';
import { getSiteSettings, getItemCounts, getRecentItems, getFeaturedItems } from '@/server/data';

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

export default async function WorkbenchPage() {
  const [settings, stats, recentItems, featuredItems] = await Promise.all([
    getSiteSettings(),
    getItemCounts(),
    getRecentItems(5),
    getFeaturedItems(4),
  ]);

  const currentWork = settings?.currentWork ?? { title: 'Singla Workshop', version: 'v1.0', href: '/' };
  const todaysNote = settings?.todaysNote ?? { text: '', author: '' };

  const recentFormatted = recentItems.map((item: any) => ({
    title: item.title,
    sectionName: item.section?.name ?? 'Uncategorized',
    sectionSlug: item.section?.slug ?? '',
    sectionColor: item.section?.color ?? 'hsl(36 100% 50%)',
    updatedAt: timeAgo(new Date(item.updatedAt)),
  }));

  const featuredFormatted = featuredItems.map((item: any) => ({
    title: item.title,
    description: item.description,
    sectionName: item.section?.name ?? 'Uncategorized',
    sectionSlug: item.section?.slug ?? '',
    sectionColor: item.section?.color ?? 'hsl(36 100% 50%)',
    status: item.status.replace('_', ' '),
    updatedAt: timeAgo(new Date(item.updatedAt)),
  }));

  return (
    <div className="flex flex-1">
      <div className="flex-1 px-4 py-6 md:px-8 lg:px-10">
        <HeroSection currentWork={currentWork} />
        <div className="mt-8">
          <ProjectGrid items={featuredFormatted} />
        </div>
        <div className="mt-8 space-y-4 xl:hidden">
          <TodaysNote note={todaysNote} />
          <WorkshopStats stats={stats} />
          <RecentActivity items={recentFormatted} />
        </div>
      </div>
      <aside className="border-border hidden w-72 shrink-0 space-y-4 border-l p-6 xl:block">
        <TodaysNote note={todaysNote} />
        <WorkshopStats stats={stats} />
        <RecentActivity items={recentFormatted} />
      </aside>
    </div>
  );
}
