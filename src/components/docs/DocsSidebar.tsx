import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { navigation } from '@/data/documentation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
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

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
        <span className="flex items-center gap-2">
          {category.emoji && <span>{category.emoji}</span>}
          {category.title}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="ml-2 border-l border-border pl-3 space-y-1 mt-1">
          {category.articles.map((article) => (
            <li key={article.slug}>
              <NavLink
                to={`/docs/${article.slug}`}
                className={({ isActive }) => cn(
                  "block py-1.5 text-sm transition-colors",
                  isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {article.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
