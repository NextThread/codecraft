import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ArrowRight, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { TableOfContents } from '@/components/docs/TableOfContents';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Callout } from '@/components/docs/Callout';
import { Button } from '@/components/ui/button';
import { getArticle, getNextPrevArticles } from '@/data/documentation';
import { useMemo, useState, useEffect } from 'react';

export default function DocsPage() {
  const { slug = 'introduction' } = useParams();
  const navigate = useNavigate();
  const article = getArticle(slug);
  const { prev, next } = getNextPrevArticles(slug);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const renderedContent = useMemo(() => {
    if (!article) return null;
    return renderMarkdown(article.content);
  }, [article]);

  const handleFeedback = (value: 'yes' | 'no') => {
    setFeedback(value);
    console.log(`Feedback for ${slug}: ${value}`);
  };

  const handleNavigation = (targetSlug: string) => {
    navigate(`/docs/${targetSlug}`);
  };

  if (!article) {
    return (
      <DocsLayout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested documentation page doesn't exist.</p>
          <Button asChild><Link to="/docs/introduction">Go to Introduction</Link></Button>
        </div>
      </DocsLayout>
    );
  }

  return (
    <DocsLayout showToc toc={<TableOfContents content={article.content} />}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Docs</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="hover:text-foreground">{article.category}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{article.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-3">{article.title}</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date(article.lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          {' · '}{article.readingTime} min read
        </p>
      </header>

      {/* Content */}
      <article className="docs-prose">{renderedContent}</article>

      {/* Feedback */}
      <div className="flex items-center gap-4 py-8 border-t border-border mt-12">
        <span className="text-sm text-muted-foreground">Was this helpful?</span>
        {feedback ? (
          <div className="flex items-center gap-2 text-sm text-success">
            <Check className="h-4 w-4" />
            <span>Thanks for your feedback!</span>
          </div>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={() => handleFeedback('yes')}>
              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleFeedback('no')}>
              <ThumbsDown className="h-4 w-4 mr-1" /> No
            </Button>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between py-8 border-t border-border">
        {prev ? (
          <button 
            onClick={() => handleNavigation(prev.slug)} 
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <div><div className="text-xs">Previous</div><div className="font-medium text-foreground">{prev.title}</div></div>
          </button>
        ) : <div />}
        {next && (
          <button 
            onClick={() => handleNavigation(next.slug)} 
            className="group flex items-center gap-2 text-right text-muted-foreground hover:text-foreground"
          >
            <div><div className="text-xs">Next</div><div className="font-medium text-foreground">{next.title}</div></div>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </DocsLayout>
  );
}

function renderMarkdown(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'text';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(<CodeBlock key={key++} code={codeLines.join('\n')} language={lang} />);
      i++;
      continue;
    }

    // Callouts
    if (line.startsWith(':::')) {
      const variant = line.slice(3).trim() as 'info' | 'warning' | 'success' | 'error';
      const calloutLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith(':::')) {
        calloutLines.push(lines[i]);
        i++;
      }
      elements.push(<Callout key={key++} variant={variant}>{calloutLines.join(' ')}</Callout>);
      i++;
      continue;
    }

    // Headers - Skip h1 since it's already rendered in the page header
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      i++; continue;
    }
    if (line.startsWith('## ')) {
      const text = line.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      elements.push(<h2 key={key++} id={id} className="text-2xl font-semibold mt-10 mb-4 scroll-mt-24">{text}</h2>);
      i++; continue;
    }
    if (line.startsWith('### ')) {
      const text = line.slice(4);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      elements.push(<h3 key={key++} id={id} className="text-xl font-semibold mt-8 mb-3 scroll-mt-24">{text}</h3>);
      i++; continue;
    }

    // Lists
    if (line.match(/^[-*]\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(<ul key={key++} className="list-disc pl-6 mb-4 space-y-2">{items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />)}</ul>);
      continue;
    }
    if (line.match(/^\d+\.\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(<ol key={key++} className="list-decimal pl-6 mb-4 space-y-2">{items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />)}</ol>);
      continue;
    }

    // Tables
    if (line.includes('|') && lines[i + 1]?.match(/^\|[-:\s|]+\|$/)) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes('|')) {
        const cells = lines[i].split('|').slice(1, -1).map(c => c.trim());
        if (!lines[i].match(/^[-:\s|]+$/)) rows.push(cells);
        i++;
      }
      const [header, ...body] = rows;
      elements.push(
        <div key={key++} className="overflow-x-auto mb-4">
          <table className="w-full border-collapse">
            <thead><tr>{header.map((cell, j) => <th key={j} className="text-left font-semibold p-3 bg-muted border-b border-border">{cell}</th>)}</tr></thead>
            <tbody>{body.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k} className="p-3 border-b border-border" dangerouslySetInnerHTML={{ __html: inlineFormat(cell) }} />)}</tr>)}</tbody>
          </table>
        </div>
      );
      continue;
    }

    // Paragraphs
    if (line.trim()) {
      elements.push(<p key={key++} className="mb-4" dangerouslySetInnerHTML={{ __html: inlineFormat(line) }} />);
    }
    i++;
  }

  return elements;
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-medium">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
}
