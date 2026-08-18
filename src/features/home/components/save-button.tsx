'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface SaveButtonProps {
  saved: boolean;
  onToggle: () => void;
  className?: string;
}

export function SaveButton({ saved, onToggle, className }: SaveButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        'rounded-md p-1.5 transition-colors',
        saved
          ? 'text-primary hover:text-primary/80'
          : 'text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100',
        saved && 'opacity-100',
        className,
      )}
      aria-label={saved ? 'Remove from saved' : 'Save item'}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4 fill-current" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </button>
  );
}
