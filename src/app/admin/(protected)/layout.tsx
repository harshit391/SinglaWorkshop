import { requireAuth } from '@/server/auth/helpers';
import { AdminNav } from '@/features/admin/components/admin-nav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    <div className="flex min-h-full flex-col">
      <div className="border-border bg-card border-b px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight">Workshop Admin</h2>
      </div>
      <AdminNav />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
