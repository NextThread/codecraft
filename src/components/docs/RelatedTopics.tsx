import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getRelated } from '@/content';

export function RelatedTopics({ slug }: { slug: string }) {
  const related = getRelated(slug, 4);
  if (related.length === 0) return null;
  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">Related topics</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {related.map((t) => (
          <Link
            key={t.slug}
            to={`/docs/${t.slug}`}
            className="group flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-card/50 hover:border-primary/40 hover:bg-card transition-colors"
          >
            <div className="min-w-0">
              <div className="font-medium text-foreground group-hover:text-primary transition-colors">{t.title}</div>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{t.description}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
