import { ExternalLink, AlertTriangle } from 'lucide-react';

interface FeaturedItem {
  title: string;
  description: string;
  url: string;
  urlUnstable?: boolean;
  sectionName: string;
  sectionSlug: string;
  sectionColor: string;
}

interface ProjectGridProps {
  items: FeaturedItem[];
}

export function ProjectGrid({ items }: ProjectGridProps) {
  if (items.length === 0) {
    return (
      <section>
        <h2 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
          Featured
        </h2>
        <p className="text-muted-foreground mt-4 text-sm">
          No featured items yet. Add some from the admin panel.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
        Featured
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <article className="border-border bg-card hover:border-primary/30 hover:shadow-primary/5 relative h-full rounded-lg border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <span
                  className="font-mono text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: item.sectionColor }}
                >
                  {item.sectionName}
                </span>
                <ExternalLink className="text-muted-foreground h-4 w-4 opacity-0 transition-all duration-200 group-hover:opacity-100" />
              </div>
              <h3 className="mt-3 text-lg leading-tight font-semibold">{item.title}</h3>
              {item.urlUnstable && (
                <p className="mt-1.5 flex items-center gap-1 text-[10px] text-amber-400">
                  <AlertTriangle className="h-3 w-3" />
                  URL may change anytime
                </p>
              )}
              <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="text-muted-foreground mt-4 text-xs font-mono">
                {item.url ? new URL(item.url).hostname : ''}
              </div>
            </article>
          </a>
        ))}
      </div>
    </section>
  );
}
