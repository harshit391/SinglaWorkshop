'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { createItemAction, updateItemAction } from '@/app/admin/(protected)/items/actions';

interface Section {
  _id: string;
  name: string;
  slug: string;
}

interface ItemFormProps {
  item?: {
    _id: string;
    title: string;
    slug: string;
    section: { _id: string } | string;
    description: string;
    url?: string;
    featured: boolean;
    pinned: boolean;
    urlUnstable: boolean;
  };
  sections: Section[];
}

export function ItemForm({ item, sections }: ItemFormProps) {
  const router = useRouter();
  const sectionId = item
    ? typeof item.section === 'string'
      ? item.section
      : item.section._id
    : '';

  const [state, formAction, pending] = useActionState(
    async (_prev: any, formData: FormData) => {
      const result = item
        ? await updateItemAction(item._id, formData)
        : await createItemAction(formData);
      if (result.success) {
        router.push('/admin/items');
        router.refresh();
      }
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
        <p className="text-destructive rounded-md bg-destructive/10 px-3 py-2 text-sm">
          {state.error}
        </p>
      )}

      <div>
        <label className="text-sm font-medium" htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={item?.title ?? ''}
          onChange={(e) => {
            if (!item) {
              const slugInput = e.target.form?.querySelector('[name=slug]') as HTMLInputElement;
              if (slugInput) slugInput.value = generateSlug(e.target.value);
            }
          }}
          className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="url">URL</label>
        <input
          id="url"
          name="url"
          type="text"
          required
          placeholder="https://example.com"
          defaultValue={item?.url ?? ''}
          className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm font-mono focus:border-primary focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium" htmlFor="slug">Slug</label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            defaultValue={item?.slug ?? ''}
            className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm font-mono focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="section">Category</label>
          <select
            id="section"
            name="section"
            required
            defaultValue={sectionId}
            className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            <option value="">Select category...</option>
            {sections.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Your personal note about this site..."
          defaultValue={item?.description ?? ''}
          className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <input type="hidden" name="status" value="ACTIVE" />

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            value="true"
            defaultChecked={item?.featured ?? false}
            className="h-4 w-4 rounded border-border"
          />
          <label className="text-sm font-medium" htmlFor="featured">Featured on homepage</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="pinned"
            name="pinned"
            type="checkbox"
            value="true"
            defaultChecked={item?.pinned ?? false}
            className="h-4 w-4 rounded border-border"
          />
          <label className="text-sm font-medium" htmlFor="pinned">Pin to top</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="urlUnstable"
            name="urlUnstable"
            type="checkbox"
            value="true"
            defaultChecked={item?.urlUnstable ?? false}
            className="h-4 w-4 rounded border-border"
          />
          <label className="text-sm font-medium text-amber-400" htmlFor="urlUnstable">URL may change</label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          {pending ? 'Saving...' : item ? 'Update Site' : 'Add Site'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
