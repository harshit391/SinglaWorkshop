'use client';

import { useState } from 'react';
import { useSavedItems } from '@/shared/hooks/use-saved-items';
import { ItemCard } from './item-card';

interface ItemData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  tags: string[];
  url?: string;
  imageUrl?: string;
  pinned: boolean;
  urlUnstable?: boolean;
  updatedAt: string;
}

interface ItemListProps {
  items: ItemData[];
  sectionSlug: string;
}

export function ItemList({ items, sectionSlug }: ItemListProps) {
  const { savedIds, toggleSave } = useSavedItems();
  const [toggled, setToggled] = useState<string[]>([]);

  function handleToggle(id: string) {
    toggleSave(id);
    setToggled((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  function isItemSaved(id: string) {
    const wasSaved = savedIds.includes(id);
    const wasToggled = toggled.includes(id);
    return wasSaved ? !wasToggled : wasToggled;
  }

  if (items.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No items yet. Add some from the admin panel.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          sectionSlug={sectionSlug}
          saved={isItemSaved(item._id)}
          onToggleSave={() => handleToggle(item._id)}
        />
      ))}
    </div>
  );
}
