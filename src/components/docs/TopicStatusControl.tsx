import { Check, Circle, CircleDot, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

export function TopicStatusControl({ slug }: { slug: string }) {
  const { getStatus, setStatus } = useProgress();
  const status = getStatus(slug);
  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      <span className="text-sm text-muted-foreground mr-2">Track progress:</span>
      <Button
        variant={status === 'in-progress' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setStatus(slug, status === 'in-progress' ? 'not-started' : 'in-progress')}
      >
        <CircleDot className="h-4 w-4 mr-1.5" /> In progress
      </Button>
      <Button
        variant={status === 'completed' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setStatus(slug, status === 'completed' ? 'not-started' : 'completed')}
        className={cn(status === 'completed' && 'bg-success text-success-foreground hover:bg-success/90')}
      >
        <Check className="h-4 w-4 mr-1.5" /> Completed
      </Button>
      {status !== 'not-started' && (
        <Button variant="ghost" size="sm" onClick={() => setStatus(slug, 'not-started')}>
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset
        </Button>
      )}
      <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1.5">
        <Circle className="h-2 w-2 fill-current" />
        Status: <span className="font-medium text-foreground">{labelFor(status)}</span>
      </span>
    </div>
  );
}

function labelFor(s: string) {
  return s === 'completed' ? 'Completed' : s === 'in-progress' ? 'In progress' : 'Not started';
}
