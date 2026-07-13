import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { cn } from '@/lib/utils';

interface CodeExample {
  language: string;
  label: string;
  code: string;
}

interface TabbedCodeBlockProps {
  examples: CodeExample[];
  className?: string;
}

export function TabbedCodeBlock({ examples, className }: TabbedCodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={cn("rounded-lg overflow-hidden border border-border", className)}>
      <div className="flex bg-muted border-b border-border">
        {examples.map((example, index) => (
          <button
            key={example.language}
            onClick={() => setActiveTab(index)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeTab === index
                ? "bg-code text-code-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {example.label}
          </button>
        ))}
      </div>
      <CodeBlock
        code={examples[activeTab].code}
        language={examples[activeTab].language}
      />
    </div>
  );
}
