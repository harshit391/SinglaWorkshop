'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/shared/components/common/brand-logo';
import { getIcon } from '@/shared/lib/icons';
import { cn } from '@/shared/lib/utils';
import type { NavLink } from '@/shared/lib/constants';

interface SidebarProps {
  links: NavLink[];
}

export function Sidebar({ links }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="border-border bg-card hidden w-56 shrink-0 border-r lg:flex lg:flex-col">
      <div className="px-5 py-6">
        <BrandLogo />
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {links.map((link) => {
          const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
          const Icon = getIcon(link.icon);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-border border-t px-5 py-4">
        <p className="text-muted-foreground text-xs">Built by Harshit Singla</p>
      </div>
    </aside>
  );
}
