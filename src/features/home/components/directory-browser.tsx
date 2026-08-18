'use client';

import { useState } from 'react';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/ui/tabs';
import { useSavedItems } from '@/shared/hooks/use-saved-items';
import { getIcon } from '@/shared/lib/icons';
import { SaveButton } from './save-button';

export interface DirectoryItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  url: string;
  urlUnstable: boolean;
  pinned: boolean;
  sectionName: string;
  sectionSlug: string;
  sectionColor: string;
}

export interface SectionInfo {
  _id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
}

interface DirectoryBrowserProps {
  items: DirectoryItem[];
  sections: SectionInfo[];
}

function ItemCard({ item, saved, onToggleSave }: { item: DirectoryItem; saved: boolean; onToggleSave: () => void }) {
  return (
    <a
      href={item.url || '#'}
      target={item.url ? '_blank' : undefined}
      rel={item.url ? 'noopener noreferrer' : undefined}
      className="group block"
    >
      <article
        className={`border-border bg-card hover:border-primary/30 hover:shadow-primary/5 relative h-full rounded-lg border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${saved ? 'border-primary/20 bg-primary/[0.02]' : ''}`}
      >
        <div className="flex items-start justify-between">
          <span
            className="font-mono text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: item.sectionColor }}
          >
            {item.sectionName}
          </span>
          <div className="flex items-center gap-1">
            <SaveButton saved={saved} onToggle={onToggleSave} />
            {item.url && (
              <ExternalLink className="text-muted-foreground h-4 w-4 opacity-0 transition-all duration-200 group-hover:opacity-100" />
            )}
          </div>
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
        {item.url && (
          <div className="text-muted-foreground mt-4 font-mono text-xs">
            {(() => { try { return new URL(item.url).hostname; } catch { return ''; } })()}
          </div>
        )}
      </article>
    </a>
  );
}

export function DirectoryBrowser({ items, sections }: DirectoryBrowserProps) {
  const { isSaved, toggleSave } = useSavedItems();
  const [activeSection, setActiveSection] = useState(sections[0]?.slug ?? '');

  const filteredItems = items.filter((item) => item.sectionSlug === activeSection);

  return (
    <section>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Sites</TabsTrigger>
          <TabsTrigger value="by-section">By Section</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                saved={isSaved(item._id)}
                onToggleSave={() => toggleSave(item._id)}
              />
            ))}
          </div>
          {items.length === 0 && (
            <p className="text-muted-foreground text-sm">No sites found.</p>
          )}
        </TabsContent>

        <TabsContent value="by-section" className="mt-4">
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
            {sections.map((section) => {
              const Icon = getIcon(section.icon);
              const isActive = section.slug === activeSection;
              return (
                <button
                  key={section.slug}
                  type="button"
                  onClick={() => setActiveSection(section.slug)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-primary/50 bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                  }`}
                  style={isActive ? { borderColor: section.color, color: section.color, backgroundColor: `${section.color}15` } : undefined}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {section.name}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                saved={isSaved(item._id)}
                onToggleSave={() => toggleSave(item._id)}
              />
            ))}
          </div>
          {filteredItems.length === 0 && (
            <p className="text-muted-foreground text-sm">No sites in this section.</p>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
