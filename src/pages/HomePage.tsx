import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Layers, Code2, Zap, BookOpen, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { navigation } from '@/data/documentation';

const features = [
  { icon: BookOpen, title: 'Theory + Program', description: 'Every topic pairs concise theory with a runnable C program.' },
  { icon: Cpu, title: 'From Bits to Structs', description: 'Data types, memory, pointers, structures and unions — covered in order.' },
  { icon: Code2, title: 'Real Compilable Code', description: 'All snippets are standard C, ready to compile with gcc or clang.' },
  { icon: Terminal, title: 'Beginner-Friendly', description: 'Clear language, no jargon dumps. Start from zero and build up.' },
  { icon: Layers, title: 'Structured Path', description: 'Chapters flow naturally: basics → control flow → data structures.' },
  { icon: Zap, title: 'Fast Search', description: 'Press ⌘K anywhere to jump straight to the topic you need.' },
];

const helloWorld = `#include <stdio.h>

int main(void) {
    printf("Hello, C!\\n");
    return 0;
}`;

export default function HomePage() {
  return (
    <DocsLayout>
      {/* Hero */}
      <section className="text-center py-16 lg:py-24 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Cpu className="h-4 w-4" /> Learn C — from data types to unions
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
          The C Programming<br />
          <span className="text-primary">Handbook</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          A complete, hands-on guide to the C language. Every topic is explained
          in plain English and paired with a small program you can run.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/docs/introduction">Start Learning <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/docs/data-types">Jump to Data Types</Link>
          </Button>
        </div>
      </section>

      {/* Hello world */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-2">Your first program</h2>
        <p className="text-muted-foreground mb-6">The classic Hello, World — the starting point of every C journey.</p>
        <CodeBlock code={helloWorld} language="c" />
      </section>

      {/* Features */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-8">What's inside</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-8">Full curriculum</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {navigation.map((cat) => (
            <div key={cat.slug} className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                {cat.emoji && <span>{cat.emoji}</span>} {cat.title}
              </h3>
              <ul className="space-y-1.5">
                {cat.articles.map((a) => (
                  <li key={a.slug}>
                    <Link to={`/docs/${a.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      → {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </DocsLayout>
  );
}
