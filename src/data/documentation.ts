/**
 * Backwards-compatible shim.
 *
 * The documentation content now lives under `src/content/` organised as
 *   courses/<course>/<category>/<topic>.ts
 * See `src/content/index.ts` for the new API (courses, allTopics, getTopic, ...).
 *
 * This file only re-exports the shapes that existing UI code (`DocsPage`,
 * `DocsSidebar`, `SearchModal`) already relies on so nothing else has to change.
 */
import {
  courses,
  allTopics,
  getTopic,
  getPrevNext,
  type Topic,
  type Category,
} from '@/content';

export interface DocArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  content: string;
  lastUpdated: string;
  readingTime: number;
}

export interface DocCategory {
  title: string;
  slug: string;
  emoji?: string;
  articles: { title: string; slug: string }[];
}

function toDocArticle(topic: Topic, category: Category): DocArticle {
  return {
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    category: category.title,
    categorySlug: category.slug,
    content: topic.content,
    lastUpdated: topic.lastUpdated ?? '2026-07-14',
    readingTime: topic.readingTime,
  };
}

export const navigation: DocCategory[] = courses.flatMap((course) =>
  course.categories.map((cat) => ({
    title: cat.title,
    slug: cat.slug,
    emoji: cat.emoji,
    articles: cat.topics.map((t) => ({ title: t.title, slug: t.slug })),
  })),
);

export const articles: Record<string, DocArticle> = Object.fromEntries(
  courses.flatMap((course) =>
    course.categories.flatMap((cat) =>
      cat.topics.map((t) => [t.slug, toDocArticle(t, cat)] as const),
    ),
  ),
);

export function getArticle(slug: string): DocArticle | undefined {
  const t = getTopic(slug);
  if (!t) return undefined;
  const cat = courses
    .flatMap((c) => c.categories)
    .find((c) => c.topics.some((tt) => tt.slug === slug))!;
  return toDocArticle(t, cat);
}

export function getNextPrevArticles(slug: string) {
  const { prev, next } = getPrevNext(slug);
  return {
    prev: prev ? { slug: prev.slug, title: prev.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  };
}

export interface SearchResult {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
}

export function getSearchableContent(): SearchResult[] {
  return allTopics.map((t) => {
    const cat = courses
      .flatMap((c) => c.categories)
      .find((c) => c.topics.some((tt) => tt.slug === t.slug))!;
    return {
      slug: t.slug,
      title: t.title,
      category: cat.title,
      excerpt: t.description,
    };
  });
}
