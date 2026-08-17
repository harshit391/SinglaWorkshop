'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Layers, FileText, Settings, LogOut } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const ADMIN_LINKS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Sections', href: '/admin/sections', icon: Layers },
  { label: 'Items', href: '/admin/items', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1 border-b border-border px-4 py-2">
      {ADMIN_LINKS.map((link) => {
        const isActive =
          link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
      <form action="/api/auth/signout" method="POST" className="ml-auto">
        <button
          type="submit"
          className="text-muted-foreground hover:text-destructive flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </form>
    </nav>
  );
}
