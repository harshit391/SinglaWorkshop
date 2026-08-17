'use client';

import { useActionState } from 'react';
import { createSectionAction, updateSectionAction } from '@/app/admin/sections/actions';
import { ICON_NAMES } from '@/shared/lib/icons';

interface SectionFormProps {
  section?: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    order: number;
    isVisible: boolean;
  };
  onDone?: () => void;
}

export function SectionForm({ section, onDone }: SectionFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: any, formData: FormData) => {
      const result = section
        ? await updateSectionAction(section._id, formData)
        : await createSectionAction(formData);
      if (result.success && onDone) onDone();
      return result;
    },
    null,
  );

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="text-destructive text-sm">{state.error}</p>
      )}

      <div>
        <label className="text-sm font-medium" htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={section?.name ?? ''}
          onChange={(e) => {
            if (!section) {
              const slugInput = e.target.form?.querySelector('[name=slug]') as HTMLInputElement;
              if (slugInput) slugInput.value = generateSlug(e.target.value);
            }
          }}
          className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          defaultValue={section?.slug ?? ''}
          className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm font-mono focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          defaultValue={section?.description ?? ''}
          className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium" htmlFor="icon">Icon</label>
          <select
            id="icon"
            name="icon"
            defaultValue={section?.icon ?? 'Folder'}
            className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="order">Order</label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={section?.order ?? 0}
            className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="color">Color (CSS)</label>
        <input
          id="color"
          name="color"
          type="text"
          defaultValue={section?.color ?? 'hsl(36 100% 50%)'}
          className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm font-mono focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isVisible"
          name="isVisible"
          type="checkbox"
          value="true"
          defaultChecked={section?.isVisible ?? true}
          className="h-4 w-4 rounded border-border"
        />
        <label className="text-sm font-medium" htmlFor="isVisible">Visible in navigation</label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {pending ? 'Saving...' : section ? 'Update Section' : 'Create Section'}
      </button>
    </form>
  );
}
