'use client';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils';

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  const router = useRouter();
  const tapsRef = useRef<number[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = Date.now();
      tapsRef.current = tapsRef.current.filter((t) => now - t < 3000);
      tapsRef.current.push(now);

      if (tapsRef.current.length >= 7) {
        e.preventDefault();
        tapsRef.current = [];
        router.push('/admin');
      }
    },
    [router],
  );

  return (
    <Link href="/" onClick={handleClick} className={cn('group flex items-baseline gap-1.5', className)}>
      <span className="text-foreground group-hover:text-primary font-mono text-lg font-bold tracking-tight transition-colors">
        SINGLA
      </span>
      <span className="text-muted-foreground group-hover:text-foreground font-mono text-lg font-light tracking-wide transition-colors">
        WORKSHOP
      </span>
    </Link>
  );
}
