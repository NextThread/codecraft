import { Link } from 'react-router-dom';
import { MessageCircle, GraduationCap, Users, Code2, Trophy, Brain, GitBranch, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocsLayout } from '@/components/docs/DocsLayout';
import {
  mentor,
  primaryStats,
  badgeStats,
  cpAchievements,
  aiAchievements,
  otherCompetitions,
  openSourceSummary,
  contributions,
  mentoringGoals,
} from '@/data/mentor';
import {
  WHATSAPP_SESSION_URL,
  WHATSAPP_CONTACT_URL,
  WHATSAPP_DISPLAY,
} from '@/lib/contact';

export default function MentorPage() {
  return (
    <DocsLayout>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24 animate-fade-in">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:36px_36px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
          <GraduationCap className="h-4 w-4" /> Meet Your Mentor
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-3 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{mentor.name}</span>
        </h1>
        <p className="text-lg font-medium text-foreground/90 mb-4">{mentor.role}</p>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">{mentor.intro}</p>

        {/* Featured stats */}
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {primaryStats.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/40 transition-all"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-3xl font-bold tracking-tight tabular-nums bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {s.value}
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {badgeStats.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" /> {b}
            </span>
          ))}
        </div>
      </section>

      {/* Competitive Programming */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" /> Competitive Programming Achievements
        </h2>
        <p className="text-muted-foreground mb-8">Results across the major competitive programming platforms and contests.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {cpAchievements.map((a) => (
            <div
              key={a.platform}
              className="relative p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <a.icon className="h-5 w-5 text-primary" />
                </div>
                {a.highlight && (
                  <span className="px-2.5 py-1 rounded-md bg-accent/15 text-accent-foreground/90 text-xs font-bold uppercase tracking-wider border border-accent/30">
                    {a.highlight}
                  </span>
                )}
              </div>
              <h3 className="font-semibold mb-3">{a.platform}</h3>
              <ul className="space-y-1.5">
                {a.points.map((p) => (
                  <li key={p} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary">→</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* AI / ML */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" /> AI / Machine Learning
        </h2>
        <p className="text-muted-foreground mb-8">Competitive machine learning on Kaggle.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {aiAchievements.map((a) => (
            <div
              key={a.platform}
              className="p-6 rounded-xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/5 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <a.icon className="h-5 w-5 text-primary" />
                </div>
                {a.highlight && (
                  <span className="px-2.5 py-1 rounded-md bg-accent/15 text-accent-foreground/90 text-xs font-bold uppercase tracking-wider border border-accent/30">
                    {a.highlight}
                  </span>
                )}
              </div>
              <h3 className="font-semibold mb-3">{a.platform}</h3>
              <ul className="space-y-1.5">
                {a.points.map((p) => (
                  <li key={p} className="text-sm text-muted-foreground leading-relaxed">{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Other competitions */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-8">Other Competitions & Achievements</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {otherCompetitions.map((c) => (
            <div
              key={c.title}
              className="p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/40 transition-all"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {c.rank}
              </div>
              <h3 className="font-semibold mt-2">{c.title}</h3>
              {c.subtitle && <p className="text-sm text-muted-foreground mt-1">{c.subtitle}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Open source */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-primary" /> Open Source Contributions
        </h2>
        <p className="text-muted-foreground mb-8">Contributions to major open-source organizations and ecosystems.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {openSourceSummary.map((o) => (
            <div key={o} className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <GitBranch className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{o}</p>
            </div>
          ))}
        </div>

        {contributions.length > 0 && (
          <div className="mt-6 rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left font-semibold p-3">Repository</th>
                  <th className="text-left font-semibold p-3">Organization</th>
                  <th className="text-left font-semibold p-3">Contribution</th>
                  <th className="text-left font-semibold p-3">Links</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((c) => (
                  <tr key={`${c.organization}/${c.repository}`} className="border-t border-border">
                    <td className="p-3 font-medium">{c.repository}</td>
                    <td className="p-3 text-muted-foreground">{c.organization}</td>
                    <td className="p-3 text-muted-foreground">{c.contributionType}</td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        {c.githubUrl && (
                          <a href={c.githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Repo
                          </a>
                        )}
                        {c.pullRequestUrl && (
                          <a href={c.pullRequestUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            PR
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Teaching */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" /> Teaching & Mentoring
        </h2>
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-8">
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums">5+</div>
                <p className="text-sm text-muted-foreground">Years of teaching & mentoring experience</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums">3100+</div>
                <p className="text-sm text-muted-foreground">Students & professionals mentored</p>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Mentoring covers coding, competitive programming, DSA, software development, AI/ML, open source,
            and practical project development — from absolute fundamentals to advanced contest and
            industry-level work.
          </p>
        </div>
      </section>

      {/* Mentoring goals */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl font-bold mb-2">What Can I Help You With?</h2>
        <p className="text-muted-foreground mb-8">Find the goal that matches where you are right now.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentoringGoals.map((g, i) => (
            <div
              key={g.title}
              className="p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <g.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-mono text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-semibold mb-2">{g.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-8 lg:p-10 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
            <Code2 className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Not sure which path is right for you?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Tell me about your current level and your goal, and let's figure out the right learning path for you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={WHATSAPP_SESSION_URL} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2 shadow-md">
                <MessageCircle className="h-4 w-4" /> Book a 1:1 Session
              </Button>
            </a>
            <a href={WHATSAPP_CONTACT_URL} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" /> Contact Me
              </Button>
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-3">{WHATSAPP_DISPLAY}</p>
          <p className="text-sm text-muted-foreground mt-6">
            Or{' '}
            <Link to="/docs/cp-introduction" className="text-primary hover:underline">
              start with the free competitive programming roadmap
            </Link>
            .
          </p>
        </div>
      </section>
    </DocsLayout>
  );
}
