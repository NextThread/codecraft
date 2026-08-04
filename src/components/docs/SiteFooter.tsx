import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { WHATSAPP_COACHING_URL } from '@/lib/contact';

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-[10px] font-bold font-mono">
            {'</>'}
          </div>
          <span>CodeCraft — C & Competitive Programming Academy</span>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <Link to="/mentor" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <GraduationCap className="h-4 w-4" /> Meet Your Mentor
          </Link>
          <Link to="/docs/introduction" className="text-muted-foreground hover:text-primary transition-colors">
            C Programming
          </Link>
          <Link to="/docs/cp-introduction" className="text-muted-foreground hover:text-primary transition-colors">
            Competitive Programming
          </Link>
          <a
            href={WHATSAPP_COACHING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Book Coaching
          </a>
        </nav>
      </div>
    </footer>
  );
}
