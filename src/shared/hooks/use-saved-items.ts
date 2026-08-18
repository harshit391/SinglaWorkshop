'use client';

import { useCallback, useState, useEffect } from 'react';

const STORAGE_KEY = 'singla-saved-items';

export function useSavedItems() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [firstVisit, setFirstVisit] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      setFirstVisit(true);
    } else {
      setSavedIds(JSON.parse(raw));
    }
    setReady(true);
  }, []);

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

  return { savedIds, isSaved, toggleSave, isFirstVisit: firstVisit, markVisited, ready };
}
