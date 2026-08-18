'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function AdminShortcut() {
  const router = useRouter();
  const ctrlDotPressed = useRef(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === '.') {
        e.preventDefault();
        ctrlDotPressed.current = true;
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => { ctrlDotPressed.current = false; }, 1500);
        return;
      }

      if (ctrlDotPressed.current && e.key === 'h') {
        e.preventDefault();
        ctrlDotPressed.current = false;
        router.push('/admin');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return null;
}
