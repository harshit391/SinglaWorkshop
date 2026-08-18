import Link from 'next/link';
import { connection } from 'next/server';
import { getAllSections } from '@/server/data/sections';
import { getAllItems } from '@/server/data/items';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default async function AdminDashboardPage() {
  await connection();
  const [sections, items] = await Promise.all([getAllSections(), getAllItems()]);

  const statusCounts = items.reduce(
    (acc, item: any) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground mt-1 text-sm">Manage your website directory.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border-border bg-card rounded-lg border p-5">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
            Categories
          </p>
          <p className="mt-1 text-3xl font-semibold">{sections.length}</p>
        </div>
        <div className="border-border bg-card rounded-lg border p-5">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
            Total Sites
          </p>
          <p className="mt-1 text-3xl font-semibold">{items.length}</p>
        </div>
        <div className="border-border bg-card rounded-lg border p-5">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
            Active Sites
          </p>
          <p className="mt-1 text-3xl font-semibold">{statusCounts['ACTIVE'] || 0}</p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/admin/sections"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Manage Categories
        </Link>
        <Link
          href="/admin/items/new"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Add New Site
        </Link>
      </div>

      {items.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Recent Items
          </h2>
          <div className="mt-3 space-y-2">
            {items.slice(0, 5).map((item: any) => (
              <div
                key={item._id.toString()}
                className="border-border flex items-center justify-between rounded-md border px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.section?.name ?? 'No section'} · {item.status}
                  </p>
                </div>
                <Link
                  href={`/admin/items/${item._id.toString()}/edit`}
                  className="text-primary text-xs font-medium hover:underline"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
