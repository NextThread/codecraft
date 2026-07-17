import { useReadingProgress } from '@/hooks/useReadingProgress';

export function ReadingProgressBar() {
  const progress = useReadingProgress();
  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-0.5 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
