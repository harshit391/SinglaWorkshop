'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'singla-saved-items';

function getSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) || '[]';
}

function getServerSnapshot(): string {
  return '[]';
}

function subscribe(callback: () => void): () => void {
  function handleStorage(e: Event) {
    if (e instanceof StorageEvent && e.key !== STORAGE_KEY) return;
    callback();
  }
  window.addEventListener('storage', handleStorage);
  window.addEventListener('saved-items-change', handleStorage);
  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('saved-items-change', handleStorage);
  };
}

export function useSavedItems() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const savedIds: string[] = JSON.parse(raw);

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
    window.dispatchEvent(new CustomEvent('saved-items-change'));
  }, []);

  return { savedIds, isSaved, toggleSave };
}
