'use client';

import { useActionState } from 'react';
import { updateSettingsAction } from '@/app/admin/(protected)/settings/actions';

interface SettingsFormProps {
  settings: {
    todaysNote?: { text: string; author: string };
    currentWork?: { title: string; version: string; href: string };
  };
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: any, formData: FormData) => {
      return updateSettingsAction(formData);
    },
    null,
  );

  return (
    <form action={formAction} className="space-y-6">
      {state?.success && (
        <p className="text-sm text-green-500">Settings saved successfully.</p>
      )}

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Today&apos;s Note
        </legend>
        <div>
          <label className="text-sm font-medium" htmlFor="noteText">Quote</label>
          <textarea
            id="noteText"
            name="noteText"
            rows={3}
            defaultValue={settings.todaysNote?.text ?? ''}
            className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="noteAuthor">Author</label>
          <input
            id="noteAuthor"
            name="noteAuthor"
            type="text"
            defaultValue={settings.todaysNote?.author ?? ''}
            className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Currently Working On
        </legend>
        <div>
          <label className="text-sm font-medium" htmlFor="workTitle">Title</label>
          <input
            id="workTitle"
            name="workTitle"
            type="text"
            defaultValue={settings.currentWork?.title ?? ''}
            className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium" htmlFor="workVersion">Version</label>
            <input
              id="workVersion"
              name="workVersion"
              type="text"
              defaultValue={settings.currentWork?.version ?? ''}
              className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="workHref">Link</label>
            <input
              id="workHref"
              name="workHref"
              type="text"
              defaultValue={settings.currentWork?.href ?? '/'}
              className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {pending ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
}
