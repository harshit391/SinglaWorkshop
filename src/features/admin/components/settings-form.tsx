'use client';

import { useActionState } from 'react';
import { updateSettingsAction } from '@/app/admin/(protected)/settings/actions';

interface SettingsFormProps {
  settings: {
    aboutContent?: string;
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
          Site Settings
        </legend>
        <div>
          <label className="text-sm font-medium" htmlFor="aboutContent">About Content</label>
          <textarea
            id="aboutContent"
            name="aboutContent"
            rows={5}
            placeholder="Description shown on the about page..."
            defaultValue={settings.aboutContent ?? ''}
            className="border-border bg-background mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
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
