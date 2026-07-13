import { ReactNode } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutVariant = 'info' | 'warning' | 'success' | 'error';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const variants: Record<CalloutVariant, { icon: typeof Info; className: string; iconClassName: string }> = {
  info: {
    icon: Info,
    className: 'bg-info/10 border-info/30',
    iconClassName: 'text-info',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-warning/10 border-warning/30',
    iconClassName: 'text-warning',
  },
  success: {
    icon: CheckCircle,
    className: 'bg-success/10 border-success/30',
    iconClassName: 'text-success',
  },
  error: {
    icon: AlertCircle,
    className: 'bg-destructive/10 border-destructive/30',
    iconClassName: 'text-destructive',
  },
};

export function Callout({ variant = 'info', title, children, className }: CalloutProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className={cn("flex gap-3 p-4 rounded-lg border my-4", config.className, className)}>
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconClassName)} />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="text-sm text-foreground/90">{children}</div>
      </div>
    </div>
  );
}
