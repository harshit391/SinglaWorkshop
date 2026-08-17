import Link from 'next/link';
import { ArrowUpRight, Pin } from 'lucide-react';

interface ItemData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  tags: string[];
  pinned: boolean;
  updatedAt: string;
}

interface ItemCardProps {
  item: ItemData;
  sectionSlug: string;
}

const STATUS_LABELS: Record<string, string> = {
  IDEA: 'Idea',
  IN_PROGRESS: 'In Progress',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
};

export function ItemCard({ item, sectionSlug }: ItemCardProps) {
  return (
    <Link href={`/${sectionSlug}/${item.slug}`} className="group block">
      <article className="border-border bg-card hover:border-primary/30 hover:shadow-primary/5 relative h-full rounded-lg border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {item.pinned && <Pin className="text-primary h-3 w-3" />}
            <span className="bg-secondary text-secondary-foreground rounded px-1.5 py-0.5 font-mono text-[10px] font-medium">
              {STATUS_LABELS[item.status] ?? item.status}
            </span>
          </div>
          <ArrowUpRight className="text-muted-foreground h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </div>
        <h3 className="mt-3 text-lg leading-tight font-semibold">{item.title}</h3>
        {item.description && (
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
            {item.description}
          </p>
        )}
        {item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-[10px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
