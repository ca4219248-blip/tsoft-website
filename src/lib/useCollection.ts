import { useCallback, useEffect, useState } from 'react';
import { readStore, writeStore } from './storage';

/**
 * A small localStorage-backed collection used by the demo admin screens.
 * All data is demonstration data stored in the browser only.
 */
export function useCollection<T extends { id: string }>(key: string, seed: T[]) {
  const [items, setItems] = useState<T[]>(() => readStore<T[]>(key, seed));

  useEffect(() => {
    writeStore(key, items);
  }, [key, items]);

  const add = useCallback((item: T) => setItems((prev) => [item, ...prev]), []);
  const update = useCallback(
    (id: string, patch: Partial<T>) =>
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i))),
    [],
  );
  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const reset = useCallback(() => setItems(seed), [seed]);

  return { items, setItems, add, update, remove, reset };
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * pageSize;
  return { slice: items.slice(start, start + pageSize), pageCount, page: safePage };
}
