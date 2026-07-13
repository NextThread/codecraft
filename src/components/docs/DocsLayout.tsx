import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { SearchModal } from './SearchModal';
import { DocsSidebar } from './DocsSidebar';
import { cn } from '@/lib/utils';

interface DocsLayoutProps {
  children: React.ReactNode;
  showToc?: boolean;
  toc?: React.ReactNode;
}

export function DocsLayout({ children, showToc = false, toc }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-[1400px] mx-auto flex h-16 items-center px-4 lg:px-6">
          {/* Left section - matches sidebar width */}
          <div className="lg:w-64 shrink-0 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold font-mono">C</div>
              <span>C Handbook</span>
            </Link>
          </div>

          {/* Middle section - matches main content area */}
          <div className="flex-1 flex justify-center px-4 lg:px-8">
            <Button variant="outline" className="w-full max-w-md justify-start text-muted-foreground" onClick={() => setSearchOpen(true)}>
              <Search className="h-4 w-4 mr-2" />
              <span>Search topics, functions, keywords...</span>
              <kbd className="hidden sm:inline-flex ml-auto h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd>
            </Button>
          </div>

          {/* Right section - matches TOC width */}
          <div className="lg:w-60 shrink-0 flex items-center justify-end gap-2">
            <ThemeToggle />
            <Button variant="default" size="sm" asChild>
              <Link to="/docs/introduction">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto flex w-full px-4 lg:px-6">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform transition-transform lg:translate-x-0 lg:static lg:z-0 pt-16 lg:pt-0 lg:shrink-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
            <span className="font-semibold">Navigation</span>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-4">
            <DocsSidebar />
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="px-4 lg:px-8 py-8">
            <div className={cn("flex gap-8", showToc && "lg:pr-4")}>
              <div className="flex-1 min-w-0 max-w-3xl">{children}</div>
              {showToc && toc && (
                <aside className="hidden lg:block w-60 shrink-0">
                  <div className="sticky top-24">{toc}</div>
                </aside>
              )}
            </div>
          </div>
        </main>
      </div>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
