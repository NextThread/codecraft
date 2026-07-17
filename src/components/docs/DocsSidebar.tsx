import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Check, CircleDot } from 'lucide-react';
import { navigation } from '@/data/documentation';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function DocsSidebar() {
  const location = useLocation();
  const currentSlug = location.pathname.split('/').pop();

  return (
    <nav className="space-y-4">
      {navigation.map((category) => {
        const isActive = category.articles.some(a => a.slug === currentSlug);
        return (
          <SidebarCategory key={category.slug} category={category} defaultOpen={isActive} currentSlug={currentSlug} />
        );
      })}
    </nav>
  );
}

function SidebarCategory({ category, defaultOpen, currentSlug }: { category: typeof navigation[0]; defaultOpen: boolean; currentSlug?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  const { getStatus, categoryProgress } = useProgress();
  const progress = categoryProgress(category.slug);

  useEffect(() => { if (defaultOpen) setOpen(true); }, [defaultOpen]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
        <span className="flex items-center gap-2 min-w-0">
          {category.emoji && <span>{category.emoji}</span>}
          <span className="truncate">{category.title}</span>
        </span>
        <span className="flex items-center gap-2 shrink-0">
          {progress.total > 0 && (
            <span className="text-[10px] font-medium text-muted-foreground tabular-nums">
              {progress.completed}/{progress.total}
            </span>
          )}
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="ml-2 border-l border-border pl-3 space-y-0.5 mt-1">
          {category.articles.map((article) => {
            const status = getStatus(article.slug);
            const isCurrent = article.slug === currentSlug;
            return (
              <li key={article.slug}>
                <SidebarItem slug={article.slug} title={article.title} status={status} isCurrent={isCurrent} />
              </li>
            );
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function SidebarItem({ slug, title, status, isCurrent }: { slug: string; title: string; status: 'not-started' | 'in-progress' | 'completed'; isCurrent: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isCurrent && ref.current) {
      ref.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [isCurrent]);

  return (
    <NavLink
      ref={ref}
      to={`/docs/${slug}`}
      className={({ isActive }) => cn(
        "group flex items-center gap-2 py-1.5 px-2 -mx-2 rounded-md text-sm transition-colors",
        isActive
          ? "text-primary font-medium bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
      )}
    >
      <span className="w-4 h-4 shrink-0 inline-flex items-center justify-center">
        {status === 'completed' ? (
          <Check className="h-3.5 w-3.5 text-success" />
        ) : status === 'in-progress' ? (
          <CircleDot className="h-3 w-3 text-warning" />
        ) : (
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
        )}
      </span>
      <span className="truncate">{title}</span>
    </NavLink>
  );
}
