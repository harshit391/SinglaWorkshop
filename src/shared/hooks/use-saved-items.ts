'use client';

import { useCallback, useRef } from 'react';

const STORAGE_KEY = 'singla-saved-items';

function readIds(): string[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function useSavedItems() {
  const initialIds = useRef<string[]>(readIds());
  const savedIds = initialIds.current;

  const isFirstVisit = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === null;

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds],
  );

  const toggleSave = useCallback((id: string) => {
    const current: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const next = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const markVisited = useCallback(() => {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      localStorage.setItem(STORAGE_KEY, '[]');
    }
  }, []);

  return { savedIds, isSaved, toggleSave, isFirstVisit, markVisited };
}
