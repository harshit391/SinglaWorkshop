import type { Metadata } from 'next';
import { getAllSections } from '@/server/data/sections';
import { SectionForm } from '@/features/admin/components/section-form';
import { SectionListAdmin } from '@/features/admin/components/section-list-admin';

export const metadata: Metadata = { title: 'Manage Sections' };

export default async function AdminSectionsPage() {
  const sections = await getAllSections();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Sections</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        Manage navigation sections. Each section appears in the sidebar.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Create Section
          </h2>
          <div className="mt-3">
            <SectionForm />
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Existing Sections ({sections.length})
          </h2>
          <div className="mt-3">
            <SectionListAdmin sections={JSON.parse(JSON.stringify(sections))} />
          </div>
        </div>
      </div>
    </div>
  );
}
