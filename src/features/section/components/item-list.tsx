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
  updatedAt: string;
}

interface ItemListProps {
  items: ItemData[];
  sectionSlug: string;
}

export function ItemList({ items, sectionSlug }: ItemListProps) {
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
        <ItemCard key={item._id} item={item} sectionSlug={sectionSlug} />
      ))}
    </div>
  );
}
