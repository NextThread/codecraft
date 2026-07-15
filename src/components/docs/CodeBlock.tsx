import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
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
}

export function CodeBlock({ code, language = 'javascript', showLineNumbers = false, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedCode = Prism.languages[language] 
    ? Prism.highlight(code.trim(), Prism.languages[language], language)
    : code.trim();

  const lines = highlightedCode.split('\n');

  return (
    <div className={cn("relative group rounded-lg overflow-hidden border border-border", className)}>
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-muted/50 hover:bg-muted transition-all opacity-0 group-hover:opacity-100"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
      
      <div className="absolute top-3 left-3 z-10">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
          {language}
        </span>
      </div>
      
      <pre className="bg-code text-code-foreground p-4 pt-10 overflow-x-auto text-sm font-mono">
        <code>
          {showLineNumbers ? (
            <table className="border-collapse">
              <tbody>
                {lines.map((line, index) => (
                  <tr key={index}>
                    <td className="pr-4 text-right text-muted-foreground select-none w-8">
                      {index + 1}
                    </td>
                    <td dangerouslySetInnerHTML={{ __html: line || ' ' }} />
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          )}
        </code>
      </pre>
    </div>
  );
}
