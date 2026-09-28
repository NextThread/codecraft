import { useState } from 'react';
import { Check, X, RotateCcw, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from '@/content/types';

export function SectionQuiz({ title, questions }: { title: string; questions: QuizQuestion[] }) {
  const [picks, setPicks] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const score = picks.filter((p, i) => p === questions[i].answer).length;
  const allAnswered = picks.every((p) => p !== null);

  const reset = () => { setPicks(questions.map(() => null)); setSubmitted(false); };

  return (
    <section className="mt-12 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <Brain className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Knowledge Check: {title}</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Test your understanding of this section before moving on.</p>

      <ol className="space-y-6">
        {questions.map((q, qi) => (
          <li key={qi}>
            <p className="font-medium mb-3">{qi + 1}. {q.question}</p>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const picked = picks[qi] === oi;
                const correct = oi === q.answer;
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setPicks((p) => p.map((v, i) => (i === qi ? oi : v)))}
                    className={cn(
                      'text-left rounded-lg border px-4 py-2 text-sm transition-colors flex items-center justify-between',
                      !submitted && (picked ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'),
                      submitted && correct && 'border-success bg-success/10',
                      submitted && picked && !correct && 'border-destructive bg-destructive/10',
                      submitted && !picked && !correct && 'border-border opacity-60',
                    )}
                  >
                    <span>{opt}</span>
                    {submitted && correct && <Check className="h-4 w-4 text-success" />}
                    {submitted && picked && !correct && <X className="h-4 w-4 text-destructive" />}
                  </button>
                );
              })}
            </div>
            {submitted && q.explanation && (
              <p className="text-sm text-muted-foreground mt-2">{q.explanation}</p>
            )}
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-4 mt-6">
        {submitted ? (
          <>
            <span className="font-semibold">You scored {score} / {questions.length}{score === questions.length ? ' 🎉' : ''}</span>
            <Button variant="outline" size="sm" onClick={reset}><RotateCcw className="h-4 w-4 mr-1" /> Try again</Button>
          </>
        ) : (
          <Button onClick={() => setSubmitted(true)} disabled={!allAnswered}>Check answers</Button>
        )}
      </div>
    </section>
  );
}
