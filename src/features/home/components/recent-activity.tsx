'use client';

import Link from 'next/link';

interface RecentItem {
  title: string;
  sectionName: string;
  sectionSlug: string;
  sectionColor: string;
  updatedAt: string;
}

interface RecentActivityProps {
  items: RecentItem[];
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
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

export function RecentActivity({ items }: RecentActivityProps) {
  if (items.length === 0) return null;

  return (
    <section className="border-border bg-card rounded-lg border p-5">
      <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        Recently Updated
      </h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item.title + item.sectionSlug}>
            <Link
              href={`/${item.sectionSlug}`}
              className="hover:text-primary flex items-center justify-between text-sm transition-colors"
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: item.sectionColor }}
                />
                <span className="text-foreground">{item.title}</span>
              </span>
              <span className="text-muted-foreground font-mono text-xs">{timeAgo(item.updatedAt)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
