import { useCallback, useEffect, useState } from 'react';
import { allTopics, getCategoryOfTopic, getCourseOfTopic } from '@/content';

export type ProgressStatus = 'not-started' | 'in-progress' | 'completed';

interface ProgressState {
  statuses: Record<string, ProgressStatus>;
  lastVisited?: string;
}

const KEY = 'codecraft:progress:v1';

function read(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { statuses: {} };
}

function write(state: ProgressState) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

type Listener = () => void;
const listeners = new Set<Listener>();
let cache: ProgressState = read();

function emit() { listeners.forEach((l) => l()); }

function set(next: ProgressState) {
  cache = next;
  write(cache);
  emit();
}

export function useProgress() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);

  const getStatus = useCallback((slug: string): ProgressStatus => {
    return cache.statuses[slug] ?? 'not-started';
  }, []);

  const setStatus = useCallback((slug: string, status: ProgressStatus) => {
    const statuses = { ...cache.statuses };
    if (status === 'not-started') delete statuses[slug]; else statuses[slug] = status;
    set({ ...cache, statuses });
  }, []);

  const markVisited = useCallback((slug: string) => {
    const statuses = { ...cache.statuses };
    if (!statuses[slug]) statuses[slug] = 'in-progress';
    set({ ...cache, statuses, lastVisited: slug });
  }, []);

  const reset = useCallback(() => set({ statuses: {} }), []);

  const lastVisited = cache.lastVisited;

  const totals = (() => {
    const total = allTopics.length;
    const done = Object.values(cache.statuses).filter((s) => s === 'completed').length;
    const inProg = Object.values(cache.statuses).filter((s) => s === 'in-progress').length;
    return { total, completed: done, inProgress: inProg, percent: total ? Math.round((done / total) * 100) : 0 };
  })();

  const courseProgress = useCallback((courseSlug: string) => {
    const topics = allTopics.filter((t) => getCourseOfTopic(t.slug)?.slug === courseSlug);
    const done = topics.filter((t) => cache.statuses[t.slug] === 'completed').length;
    return { total: topics.length, completed: done, percent: topics.length ? Math.round((done / topics.length) * 100) : 0 };
  }, []);

  const categoryProgress = useCallback((categorySlug: string) => {
    const topics = allTopics.filter((t) => getCategoryOfTopic(t.slug)?.slug === categorySlug);
    const done = topics.filter((t) => cache.statuses[t.slug] === 'completed').length;
    return { total: topics.length, completed: done, percent: topics.length ? Math.round((done / topics.length) * 100) : 0 };
  }, []);

  return { getStatus, setStatus, markVisited, reset, lastVisited, totals, courseProgress, categoryProgress };
}
