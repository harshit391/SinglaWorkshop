import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface ItemDetailProps {
  item: {
    title: string;
    slug: string;
    description: string;
    content: string;
    status: string;
    tags: string[];
    url?: string;
    imageUrl?: string;
    pinned: boolean;
    section: { name: string; slug: string };
    createdAt: string;
    updatedAt: string;
  };
  sectionSlug: string;
}

const STATUS_LABELS: Record<string, string> = {
  IDEA: 'Idea',
  IN_PROGRESS: 'In Progress',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
};

export function ItemDetail({ item, sectionSlug }: ItemDetailProps) {
  return (
    <article className="mx-auto max-w-2xl">
      <Link
        href={`/${sectionSlug}`}
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to {item.section.name}
      </Link>

      <header className="mt-4">
        <div className="flex items-center gap-2">
          <span className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 text-xs font-medium">
            {STATUS_LABELS[item.status] ?? item.status}
          </span>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">{item.title}</h1>
        {item.description && (
          <p className="text-muted-foreground mt-2 text-base leading-relaxed">
            {item.description}
          </p>
        )}
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            Visit link <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </header>

      {item.content && (
        <div className="border-border mt-8 border-t pt-8">
          <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed">
            {item.content}
          </div>
        </div>
      )}

      <footer className="border-border text-muted-foreground mt-8 border-t pt-4 text-xs">
        <p>
          Created {new Date(item.createdAt).toLocaleDateString()} · Updated{' '}
          {new Date(item.updatedAt).toLocaleDateString()}
        </p>
      </footer>
    </article>
  );
}
