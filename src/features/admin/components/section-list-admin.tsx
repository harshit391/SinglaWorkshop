'use client';

import { useRouter } from 'next/navigation';
import { deleteSectionAction } from '@/app/admin/(protected)/sections/actions';
import { getIcon } from '@/shared/lib/icons';

interface Section {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isVisible: boolean;
}

interface SectionListAdminProps {
  sections: Section[];
}

export function SectionListAdmin({ sections }: SectionListAdminProps) {
  const router = useRouter();

  if (sections.length === 0) {
    return <p className="text-muted-foreground text-sm">No sections yet.</p>;
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete section "${name}"? This cannot be undone.`)) return;
    await deleteSectionAction(id);
    router.refresh();
  }

  return (
    <div className="space-y-2">
      {sections.map((section) => {
        const Icon = getIcon(section.icon);
        return (
          <div
            key={section._id}
            className="border-border flex items-center justify-between rounded-md border px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4" style={{ color: section.color }} />
              <div>
                <p className="text-sm font-medium">{section.name}</p>
                <p className="text-muted-foreground text-xs">
                  /{section.slug} · Order: {section.order}
                  {!section.isVisible && ' · Hidden'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(section._id, section.name)}
              className="text-destructive text-xs font-medium hover:underline"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
