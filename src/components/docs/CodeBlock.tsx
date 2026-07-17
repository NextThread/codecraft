import { useState, useMemo } from 'react';
import { Check, Copy, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  /** Lines above this collapse behind an Expand button. */
  collapseAfter?: number;
}

const LANG_LABEL: Record<string, string> = {
  cpp: 'C++17', c: 'C', javascript: 'JavaScript', typescript: 'TypeScript',
  jsx: 'JSX', tsx: 'TSX', python: 'Python', ruby: 'Ruby',
  bash: 'Bash', json: 'JSON', yaml: 'YAML', text: 'Text',
};

export function CodeBlock({
  code,
  language = 'javascript',
  showLineNumbers = true,
  className,
  collapseAfter = 24,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const trimmed = useMemo(() => code.replace(/\n+$/,'').replace(/^\n+/, ''), [code]);
  const highlighted = useMemo(
    () => (Prism.languages[language]
      ? Prism.highlight(trimmed, Prism.languages[language], language)
      : trimmed),
    [trimmed, language],
  );
  const lines = highlighted.split('\n');
  const isLong = lines.length > collapseAfter;
  const shown = isLong && !expanded ? lines.slice(0, collapseAfter) : lines;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(trimmed);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const langLabel = LANG_LABEL[language] ?? language.toUpperCase();

  return (
    <div className={cn("relative group rounded-lg overflow-hidden border border-border my-4", className)}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/40">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-primary/60" />
          {langLabel}
        </span>
        <div className="flex items-center gap-1">
          {isLong && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label={expanded ? 'Collapse code' : 'Expand code'}
            >
              {expanded ? <ChevronsDownUp className="h-3.5 w-3.5" /> : <ChevronsUpDown className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{expanded ? 'Collapse' : `Expand (${lines.length})`}</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <pre className="bg-code text-code-foreground overflow-x-auto text-sm font-mono">
          <code className="block">
            {showLineNumbers ? (
              <table className="border-collapse w-full">
                <tbody>
                  {shown.map((line, index) => (
                    <tr key={index} className="align-top">
                      <td className="pl-4 pr-4 py-0.5 text-right text-muted-foreground/60 select-none w-10 tabular-nums text-xs">
                        {index + 1}
                      </td>
                      <td className="pr-4 py-0.5 whitespace-pre" dangerouslySetInnerHTML={{ __html: line || ' ' }} />
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span className="block px-4 py-3" dangerouslySetInnerHTML={{ __html: shown.join('\n') }} />
            )}
          </code>
        </pre>
        {isLong && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="absolute inset-x-0 bottom-0 h-16 flex items-end justify-center pb-2 text-xs font-medium text-primary bg-gradient-to-t from-code via-code/90 to-transparent hover:text-primary/80"
          >
            Show all {lines.length} lines
          </button>
        )}
      </div>
    </div>
  );
}
