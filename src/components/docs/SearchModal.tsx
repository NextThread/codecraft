import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getSearchableContent, SearchResult } from '@/data/documentation';
import Fuse from 'fuse.js';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const searchableContent = useMemo(() => getSearchableContent(), []);
  
  const fuse = useMemo(() => new Fuse(searchableContent, {
    keys: ['title', 'excerpt', 'category'],
    threshold: 0.4,
    includeMatches: true,
  }), [searchableContent]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8).map(r => r.item);
  }, [query, fuse]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  const handleSelect = (result: SearchResult) => {
    navigate(`/docs/${result.slug}`);
    onOpenChange(false);
    window.scrollTo(0, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-xl">
        <div className="flex items-center px-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-4 text-base bg-transparent outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-xs text-muted-foreground">
            ESC
          </kbd>
        </div>

        {query && results.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <p>No results found for "{query}"</p>
            <p className="text-sm mt-1">Try searching for something else</p>
          </div>
        )}

        {results.length > 0 && (
          <ul className="max-h-[400px] overflow-y-auto p-2">
            {results.map((result, index) => (
              <li key={result.slug}>
                <button
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                    selectedIndex === index ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{result.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {result.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-0.5">
                      {result.excerpt}
                    </p>
                  </div>
                  <ArrowRight className={cn(
                    "h-4 w-4 text-muted-foreground shrink-0 transition-opacity",
                    selectedIndex === index ? "opacity-100" : "opacity-0"
                  )} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-4 px-4 py-3 border-t border-border bg-muted/30 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="h-5 px-1.5 rounded border border-border bg-background font-mono">↑</kbd>
            <kbd className="h-5 px-1.5 rounded border border-border bg-background font-mono">↓</kbd>
            to navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="h-5 px-1.5 rounded border border-border bg-background font-mono">↵</kbd>
            to select
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
