import Link from 'next/link';
import { ExternalLink, Pin, AlertTriangle } from 'lucide-react';

interface ItemData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  tags: string[];
  url?: string;
  pinned: boolean;
  urlUnstable?: boolean;
  updatedAt: string;
}

interface ItemCardProps {
  item: ItemData;
  sectionSlug: string;
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export function ItemCard({ item, sectionSlug }: ItemCardProps) {
  const CardWrapper = item.url
    ? ({ children }: { children: React.ReactNode }) => (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <Link href={`/${sectionSlug}/${item.slug}`} className="group block">
          {children}
        </Link>
      );

  return (
    <CardWrapper>
      <article className="border-border bg-card hover:border-primary/30 hover:shadow-primary/5 relative h-full rounded-lg border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {item.pinned && <Pin className="text-primary h-3 w-3" />}
            {item.url && (
              <span className="text-muted-foreground font-mono text-[10px]">
                {getDomain(item.url)}
              </span>
            )}
          </div>
          <ExternalLink className="text-muted-foreground h-4 w-4 opacity-0 transition-all duration-200 group-hover:opacity-100" />
        </div>
        <h3 className="mt-3 text-lg leading-tight font-semibold">{item.title}</h3>
        {item.urlUnstable && (
          <p className="mt-1.5 flex items-center gap-1 text-[10px] text-amber-400">
            <AlertTriangle className="h-3 w-3" />
            URL may change anytime
          </p>
        )}
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
    </CardWrapper>
  );
}
