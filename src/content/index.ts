import type { Course, Category, Topic } from './types';
import competitive_programming from './courses/competitive-programming';
import c_programming from './courses/c-programming';

export const courses: Course[] = [competitive_programming, c_programming];

export type { Course, Category, Topic } from './types';

// Flatten helpers
export const allCategories: Category[] = courses.flatMap(c => c.categories);
export const allTopics: Topic[] = allCategories.flatMap(c => c.topics);

export const topicsBySlug: Record<string, Topic> = Object.fromEntries(
  allTopics.map(t => [t.slug, t])
);

export const categoryOfTopic: Record<string, Category> = Object.fromEntries(
  allCategories.flatMap(c => c.topics.map(t => [t.slug, c]))
);

export const courseOfTopic: Record<string, Course> = Object.fromEntries(
  courses.flatMap(course => course.categories.flatMap(cat => cat.topics.map(t => [t.slug, course])))
);

export function getTopic(slug: string): Topic | undefined {
  return topicsBySlug[slug];
}

export function getCategoryOfTopic(slug: string): Category | undefined {
  return categoryOfTopic[slug];
}

export function getCourseOfTopic(slug: string): Course | undefined {
  return courseOfTopic[slug];
}

// Ordered flat list respecting navigation order
export const orderedTopics: Topic[] = allTopics;

export function getPrevNext(slug: string): { prev: Topic | null; next: Topic | null } {
  const idx = orderedTopics.findIndex(t => t.slug === slug);
  return {
    prev: idx > 0 ? orderedTopics[idx - 1] : null,
    next: idx >= 0 && idx < orderedTopics.length - 1 ? orderedTopics[idx + 1] : null,
  };
}

/** Auto-derive related topics: siblings in same category, plus explicit `related`. */
export function getRelated(slug: string, limit = 4): Topic[] {
  const t = getTopic(slug);
  if (!t) return [];
  const cat = getCategoryOfTopic(slug);
  const out: Topic[] = [];
  const seen = new Set<string>([slug]);
  (t.related || []).forEach(s => {
    const r = getTopic(s);
    if (r && !seen.has(r.slug)) { out.push(r); seen.add(r.slug); }
  });
  if (cat) {
    const idx = cat.topics.findIndex(x => x.slug === slug);
    const neighbors: Topic[] = [];
    if (idx > 0) neighbors.push(cat.topics[idx - 1]);
    if (idx >= 0 && idx < cat.topics.length - 1) neighbors.push(cat.topics[idx + 1]);
    for (const n of neighbors) {
      if (!seen.has(n.slug)) { out.push(n); seen.add(n.slug); }
    }
    for (const n of cat.topics) {
      if (out.length >= limit) break;
      if (!seen.has(n.slug)) { out.push(n); seen.add(n.slug); }
    }
  }
  return out.slice(0, limit);
}
