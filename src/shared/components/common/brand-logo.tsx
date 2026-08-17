import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link href="/" className={cn('group flex items-baseline gap-1.5', className)}>
      <span className="text-foreground group-hover:text-primary font-mono text-lg font-bold tracking-tight transition-colors">
        SINGLA
      </span>
      <span className="text-muted-foreground group-hover:text-foreground font-mono text-lg font-light tracking-wide transition-colors">
        WORKSHOP
      </span>
    </Link>
  );
}
