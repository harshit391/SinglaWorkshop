'use client';

import { useState, useMemo } from 'react';
import { ExternalLink, AlertTriangle, Bookmark, Smartphone } from 'lucide-react';
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
  featured: boolean;
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

function ItemCard({ item, onToggle, saved }: { item: DirectoryItem; onToggle: () => void; saved: boolean }) {
  return (
    <a
      href={item.url || '#'}
      target={item.url ? '_blank' : undefined}
      rel={item.url ? 'noopener noreferrer' : undefined}
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
          <div className="flex items-center gap-1">
            <SaveButton saved={saved} onToggle={onToggle} />
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

function DeviceNote() {
  return (
    <p className="text-muted-foreground mt-4 flex items-center gap-1.5 text-xs">
      <Smartphone className="h-3 w-3" />
      Saved sites are stored on this device only.
    </p>
  );
}

function OnboardingView({ items, savedIds, onToggle, onDone }: {
  items: DirectoryItem[];
  savedIds: string[];
  onToggle: (id: string) => void;
  onDone: () => void;
}) {
  const savedCount = savedIds.length;

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Pick your favorites</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Tap the bookmark icon on sites you use often. They&apos;ll show up here on your next visit.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            saved={savedIds.includes(item._id)}
            onToggle={() => onToggle(item._id)}
          />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <DeviceNote />
        <button
          type="button"
          onClick={onDone}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          {savedCount > 0 ? `Done (${savedCount} saved)` : 'Skip'}
        </button>
      </div>
    </section>
  );
}

export function DirectoryBrowser({ items, sections }: DirectoryBrowserProps) {
  const { savedIds, isSaved, toggleSave, isFirstVisit, markVisited } = useSavedItems();
  const [activeSection, setActiveSection] = useState(sections[0]?.slug ?? '');

  const savedItems = useMemo(
    () => items.filter((item) => savedIds.includes(item._id)),
    [items, savedIds],
  );

  const recommendations = useMemo(
    () => items.filter((item) => item.featured && !savedIds.includes(item._id)),
    [items, savedIds],
  );

  const savedBySection = useMemo(
    () => savedItems.filter((item) => item.sectionSlug === activeSection),
    [savedItems, activeSection],
  );

  const sectionsWithSaved = useMemo(
    () => sections.filter((s) => savedItems.some((item) => item.sectionSlug === s.slug)),
    [sections, savedItems],
  );

  const featuredItems = useMemo(
    () => items.filter((item) => item.featured),
    [items],
  );

  if (isFirstVisit) {
    return (
      <OnboardingView
        items={featuredItems}
        savedIds={savedIds}
        onToggle={toggleSave}
        onDone={markVisited}
      />
    );
  }

  if (savedItems.length === 0) {
    return (
      <section>
        <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
          My Saved Sites
        </h2>
        <div className="border-border mb-6 flex flex-col items-center rounded-lg border border-dashed py-8 text-center">
          <Bookmark className="text-muted-foreground mb-3 h-8 w-8" />
          <p className="text-muted-foreground max-w-sm text-sm">
            No saved sites yet. Browse the categories in the sidebar and tap the bookmark icon to save.
          </p>
        </div>
        {recommendations.length > 0 && (
          <>
            <h3 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
              Recommended
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {recommendations.map((item) => (
                <ItemCard key={item._id} item={item} saved={false} onToggle={() => toggleSave(item._id)} />
              ))}
            </div>
          </>
        )}
        <DeviceNote />
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
        My Saved Sites
        <span className="text-muted-foreground ml-2 text-xs font-normal">({savedItems.length})</span>
      </h2>
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="by-section">By Section</TabsTrigger>
          {recommendations.length > 0 && (
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {savedItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                saved={true}
                onToggle={() => toggleSave(item._id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="by-section" className="mt-4">
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
            {sectionsWithSaved.map((section) => {
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
            {savedBySection.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                saved={true}
                onToggle={() => toggleSave(item._id)}
              />
            ))}
          </div>
          {savedBySection.length === 0 && (
            <p className="text-muted-foreground text-sm">No saved sites in this section.</p>
          )}
        </TabsContent>

        {recommendations.length > 0 && (
          <TabsContent value="recommended" className="mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {recommendations.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  saved={false}
                  onToggle={() => toggleSave(item._id)}
                />
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
      <DeviceNote />
    </section>
  );
}
