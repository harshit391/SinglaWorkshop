import type { Metadata } from 'next';
import { getSiteSettings } from '@/server/data/settings';
import { SettingsForm } from '@/features/admin/components/settings-form';

export const metadata: Metadata = { title: 'Site Settings' };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="text-muted-foreground mt-1 text-sm">Configure site-wide content.</p>
      <div className="mt-6 max-w-lg">
        <SettingsForm settings={JSON.parse(JSON.stringify(settings))} />
      </div>
    </div>
  );
}
