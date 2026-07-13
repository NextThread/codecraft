import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Code2, Smartphone, Moon, BookOpen, GitBranch, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { CodeBlock } from '@/components/docs/CodeBlock';

const features = [
  { icon: Search, title: 'Lightning Fast Search', description: 'Find what you need instantly with our powerful search' },
  { icon: Code2, title: 'Beautiful Code Examples', description: 'Syntax highlighting for 15+ programming languages' },
  { icon: Smartphone, title: 'Mobile Friendly', description: 'Perfect experience on any device' },
  { icon: Moon, title: 'Dark Mode Ready', description: 'Easy on the eyes with automatic theme switching' },
  { icon: BookOpen, title: 'API Reference', description: 'Complete, interactive API documentation' },
  { icon: GitBranch, title: 'Version Control', description: 'Keep track of documentation changes' },
];

const popularTopics = [
  { title: 'Authentication Guide', slug: 'authentication', description: 'Learn how to authenticate your API requests' },
  { title: 'API Reference', slug: 'users', description: 'Complete reference for all API endpoints' },
  { title: 'Error Handling', slug: 'error-handling', description: 'Handle errors gracefully in your app' },
  { title: 'Quick Start', slug: 'quick-start', description: 'Get up and running in under 5 minutes' },
];

const quickStartCode = `import { AcmeClient } from '@acme/api-sdk';

const client = new AcmeClient({
  apiKey: process.env.ACME_API_KEY,
});

// Create a new user
const user = await client.users.create({
  email: 'john@example.com',
  name: 'John Doe',
});

console.log('Created user:', user.id);`;

export default function HomePage() {
  return (
    <DocsLayout>
      {/* Hero */}
      <section className="text-center py-16 lg:py-24 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Zap className="h-4 w-4" /> v2.0 Now Available
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          Documentation That<br />Developers Love
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Beautiful, fast, and easy to navigate. Everything your users need to succeed with your product.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/docs/introduction">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/docs/users">View API Reference</Link>
          </Button>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-8">Get Started in Minutes</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-1">Install the SDK</h3>
                <p className="text-muted-foreground text-sm">npm install @acme/api-sdk</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-1">Initialize your client</h3>
                <p className="text-muted-foreground text-sm">Configure with your API key</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-1">Make your first API call</h3>
                <p className="text-muted-foreground text-sm">Create users, products, and more</p>
              </div>
            </div>
          </div>
          <CodeBlock code={quickStartCode} language="javascript" />
        </div>
      </section>

      {/* Features */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-8">Everything You Need</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-8">Popular Topics</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {popularTopics.map((topic) => (
            <Link
              key={topic.slug}
              to={`/docs/${topic.slug}`}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{topic.title}</h3>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </DocsLayout>
  );
}
