import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Layers, Code2, Zap, BookOpen, Terminal, MessageCircle, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { navigation } from '@/data/documentation';

const WHATSAPP_NUMBER = '918787839762';
const WHATSAPP_MSG = encodeURIComponent(
  "Hi! I'm interested in online C programming coaching from CodeCraft.",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const features = [
  { icon: BookOpen, title: 'Deep Theory', description: 'Every topic starts with clear, structured explanations — no hand-waving.' },
  { icon: Code2, title: 'Multiple Programs', description: 'Each chapter includes several runnable programs, not just one snippet.' },
  { icon: Cpu, title: 'From Bits to Structs', description: 'Data types, memory, pointers, structures and unions — covered in order.' },
  { icon: Terminal, title: 'Standard C, Always', description: 'Every example is standard C, ready to compile with gcc or clang.' },
  { icon: Layers, title: 'Structured Path', description: 'Chapters flow naturally: basics → control flow → data structures.' },
  { icon: Zap, title: 'Fast Search', description: 'Press ⌘K anywhere to jump straight to the topic you need.' },
];

const helloWorld = `#include <stdio.h>

int main(void) {
    printf("Hello, CodeCraft!\\n");
    return 0;
}`;

export default function HomePage() {
  return (
    <DocsLayout>
      {/* Hero */}
      <section className="text-center py-16 lg:py-24 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Cpu className="h-4 w-4" /> CodeCraft — C Programming Academy
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
          Master <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">C Programming</span>
          <br />from Scratch
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          A complete academy for the C language — deep theory, multiple runnable programs,
          and a clear path from data types all the way to structures and unions.
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
            <div key={feature.title} className="p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/40 transition-all">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-8">Full curriculum</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {navigation.map((cat) => (
            <div key={cat.slug} className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
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

      {/* Online coaching CTA */}
      <section className="py-12 lg:py-16">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-8 lg:p-10 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Want personal 1-on-1 coaching?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Book an online C programming session on WhatsApp and get guided practice, doubt clearing, and interview prep.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2 shadow-md">
              <MessageCircle className="h-4 w-4" />
              Book Online Coaching on WhatsApp
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-3">+91 87878 39762</p>
        </div>
      </section>
    </DocsLayout>
  );
}
