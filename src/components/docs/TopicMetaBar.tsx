import { Link } from 'react-router-dom';
import { Clock, Target, Gauge, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Difficulty, Topic, Category } from '@/content';
import { getTopic } from '@/content';

interface Props {
  topic: Topic;
  category: Category;
}

const difficultyStyles: Record<Difficulty, string> = {
  Beginner: 'bg-success/10 text-success border-success/30',
  Easy:     'bg-info/10 text-info border-info/30',
  Medium:   'bg-warning/10 text-warning border-warning/30',
  Hard:     'bg-destructive/10 text-destructive border-destructive/30',
  Expert:   'bg-primary/10 text-primary border-primary/30',
};

export function TopicMetaBar({ topic, category }: Props) {
  const difficulty: Difficulty = topic.difficulty ?? category.defaultDifficulty ?? 'Medium';
  const practice = topic.practiceMinutes ?? Math.max(10, topic.readingTime * 2);
  const prereqs = (topic.prerequisites ?? []).map((s) => getTopic(s)).filter(Boolean) as Topic[];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 my-6">
      <MetaCard icon={<Gauge className="h-4 w-4" />} label="Difficulty">
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border", difficultyStyles[difficulty])}>
          {difficulty}
        </span>
      </MetaCard>
      <MetaCard icon={<Clock className="h-4 w-4" />} label="Read">
        <span className="text-sm font-medium">{topic.readingTime} min</span>
      </MetaCard>
      <MetaCard icon={<Target className="h-4 w-4" />} label="Practice">
        <span className="text-sm font-medium">~{practice} min</span>
      </MetaCard>
      <MetaCard icon={<Link2 className="h-4 w-4" />} label="Prerequisites">
        {prereqs.length === 0 ? (
          <span className="text-xs text-muted-foreground">None</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {prereqs.map((p) => (
              <Link key={p.slug} to={`/docs/${p.slug}`} className="text-xs px-2 py-0.5 rounded-md bg-muted hover:bg-muted/70 border border-border">
                {p.title}
              </Link>
            ))}
          </div>
        )}
      </MetaCard>
    </div>
  );
}

function MetaCard({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card/50 p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1.5">
        {icon}
        <span className="uppercase tracking-wide">{label}</span>
      </div>
      <div className="min-h-[1.5rem] flex items-center">{children}</div>
    </div>
  );
}
