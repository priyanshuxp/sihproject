"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  GraduationCap,
  Briefcase,
  Code2,
  ShieldCheck,
  BarChart3,
  Globe,
  Quote,
  Check,
  Zap,
} from "lucide-react";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"students" | "institutes" | "companies">("students");

  const stats = [
    { label: "Active learners", value: "50,000+" },
    { label: "Partner institutes", value: "500+" },
    { label: "Hiring companies", value: "1,200+" },
    { label: "Placement rate", value: "94.2%" },
  ];

  const solutions = {
    students: {
      badge: "Students & job seekers",
      icon: Users,
      title: "Build proof of work employers actually trust",
      description:
        "Work on real problem statements from hiring companies, earn skill records they can verify, and get matched to roles that fit — instead of sending resumes into a queue.",
      points: [
        "Solve real industry problem statements with mentor review",
        "Earn skill records that companies can verify in one click",
        "Get matched directly to roles based on demonstrated work",
        "Track your skill gaps against what employers are hiring for",
      ],
      ctaText: "Start for free",
      previewLabel: "Rahul S. · B.Tech CS",
      previewRows: [
        { k: "System design", v: "95%" },
        { k: "API & security", v: "98%" },
      ],
      previewFoot: "3 companies reviewing your profile",
    },
    institutes: {
      badge: "Colleges & universities",
      icon: GraduationCap,
      title: "See exactly where every student's placement stands",
      description:
        "Track skill gaps and placement outcomes across every batch, connect students to real industry work, and give your placement cell one dashboard instead of a dozen spreadsheets.",
      points: [
        "Batch-wide skill gap tracking, updated as students learn",
        "One dashboard for every recruiter relationship and MOU",
        "Curriculum benchmarked against current hiring demand",
        "Placement outcomes reported per branch, batch, and cohort",
      ],
      ctaText: "Talk to our team",
      previewLabel: "National Tech University",
      previewRows: [
        { k: "Batch 2026", v: "840 students" },
        { k: "Placement rate", v: "92%" },
      ],
      previewFoot: "45 companies actively hiring this batch",
    },
    companies: {
      badge: "Hiring companies",
      icon: Briefcase,
      title: "Hire on evidence, not on resumes",
      description:
        "Review real code and mentor ratings before you ever schedule a call. Filter a pipeline of pre-assessed graduates by the skills your team actually needs.",
      points: [
        "Filter candidates by verified skill records, not keywords",
        "Review actual project code and mentor assessments upfront",
        "Reach students across 500+ partner institutes",
        "Run a hiring challenge and rank applicants automatically",
      ],
      ctaText: "Post a role",
      previewLabel: "Open roles · Talent pipeline",
      previewRows: [
        { k: "Backend engineer", v: "12 matched" },
        { k: "Time to shortlist", v: "6 days" },
      ],
      previewFoot: "4 candidates ready for interview",
    },
  };

  const active = solutions[activeTab];

  const features = [
    {
      icon: Code2,
      title: "Live industry projects",
      description: "Real problem statements written by engineers at hiring companies, not sample exercises.",
    },
    {
      icon: ShieldCheck,
      title: "Verified skill records",
      description: "Every credential links back to reviewed work, so a recruiter can check it in seconds.",
    },
    {
      icon: BarChart3,
      title: "Placement analytics",
      description: "Colleges see skill gaps and outcomes by batch, branch, and individual student.",
    },
    {
      icon: Zap,
      title: "Automated review",
      description: "Submissions get instant test and code-quality feedback before a mentor ever looks.",
    },
    {
      icon: Globe,
      title: "Multi-campus access",
      description: "Role-based access for placement officers, faculty advisors, and partner recruiters.",
    },
    {
      icon: Users,
      title: "Direct matching",
      description: "Students and open roles are matched on demonstrated skill, not on resume keywords.",
    },
  ];

  const testimonials = [
    {
      quote:
        "We saw a real increase in tier-1 offers within one semester of using this for our placement cell.",
      author: "Dr. Ananya Sharma",
      role: "Dean of Academic Relations, Apex Institute of Technology",
    },
    {
      quote:
        "The industry projects gave me exactly what interviewers asked about. I had three offers before graduating.",
      author: "Vikram Mehta",
      role: "Software Engineer, CloudScale · Class of 2025",
    },
    {
      quote:
        "We stopped reading resumes and started reading verified project code. Our hiring cycle is a third of what it was.",
      author: "Priya Nair",
      role: "VP Engineering & Talent, DataPulse Systems",
    },
  ];

  const steps = [
    { title: "Work on real projects", description: "Take on industry problem statements and submit for review." },
    { title: "Earn a verified record", description: "Reviewed work becomes a skill record employers can check." },
    { title: "Get matched", description: "Colleges and companies see your profile against real openings." },
  ];

  return (
    <div className="w-full bg-background text-foreground">
      {/* 1. HERO */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="size-3.5 text-primary" />
                Verified skill infrastructure for hiring
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-[3.4rem]">
                Where students, colleges, and companies work off the{" "}
                <span className="text-primary">same record</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Students prove skills on real projects. Colleges track placement outcomes without
                the spreadsheets. Companies hire against verified work instead of resumes.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 justify-center px-7 text-base font-medium" render={<Link href="/login" />}>
                  Get started free
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 justify-center px-7 text-base font-medium"
                  render={<Link href="/login" />}
                >
                  Request a demo
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary" /> Free for students
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary" /> No setup for colleges
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary" /> Verified records
                </span>
              </div>
            </div>

            {/* Preview panel */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="text-xs font-medium text-muted-foreground">Skill record · Live</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    <ShieldCheck className="size-3" /> Verified
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { k: "Distributed cache sync", v: "Reviewed", sub: "Sponsor · CloudScale Systems" },
                    { k: "Fraud anomaly detector", v: "In review", sub: "Sponsor · FinTech Corp" },
                  ].map((row) => (
                    <div key={row.k} className="rounded-lg border border-border p-3">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span>{row.k}</span>
                        <span className="text-primary">{row.v}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{row.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2.5">
                  {[
                    { label: "System architecture", pct: 95 },
                    { label: "API & security", pct: 98 },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{r.label}</span>
                        <span className="font-medium text-foreground">{r.pct}%</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-primary-foreground">
                  <span className="text-xs font-medium">2 interview invites</span>
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 py-10 sm:px-8 md:grid-cols-4 lg:px-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SOLUTIONS BY AUDIENCE */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Built for three sides</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">One platform, one shared record</h2>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex w-full max-w-full gap-1 overflow-x-auto rounded-full border border-border bg-muted p-1 sm:w-auto">
              {(Object.keys(solutions) as Array<keyof typeof solutions>).map((key) => {
                const s = solutions[key];
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                      isActive
                        ? "bg-background text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <s.icon className="size-3.5 sm:size-4" />
                    {s.badge}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-12 lg:gap-8 lg:p-10">
            <div className="lg:col-span-7">
              <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                {active.badge}
              </Badge>
              <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{active.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{active.description}</p>

              <ul className="mt-6 space-y-3">
                {active.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm font-medium text-foreground">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3 stroke-[3]" />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>

              <Button size="lg" className="mt-8 font-medium" render={<Link href="/login" />}>
                {active.ctaText}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full rounded-xl border border-border bg-muted/40 p-5">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-xs font-medium text-muted-foreground">{active.previewLabel}</span>
                  <ShieldCheck className="size-4 text-primary" />
                </div>
                <div className="mt-4 space-y-3">
                  {active.previewRows.map((r) => (
                    <div key={r.k} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{r.k}</span>
                      <span className="font-semibold text-foreground">{r.v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-lg bg-primary px-4 py-3 text-xs font-medium text-primary-foreground">
                  {active.previewFoot}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES */}
      <section className="border-y border-border bg-muted/20 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Platform</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">What makes a record verified</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="bg-card p-6 sm:p-8">
                <f.icon className="size-5 text-primary" />
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Process</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">From project to placement</h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold tracking-tight text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-border sm:hidden" />
                </div>
                <div className="mt-1 hidden h-px w-full bg-border sm:block" />
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="border-t border-border bg-muted/20 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Results</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">In their own words</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.author} className="border-border shadow-none">
                <CardContent className="flex h-full flex-col justify-between p-6">
                  <div>
                    <Quote className="size-5 text-primary" />
                    <p className="mt-4 text-sm leading-relaxed text-foreground">{t.quote}</p>
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-sm font-semibold">{t.author}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="rounded-2xl bg-foreground px-6 py-14 text-center text-background sm:px-12 sm:py-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to work off one record?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-background/70">
              Join 50,000+ students and 500+ institutes already hiring and learning on verified work.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 w-full bg-background px-8 text-base font-medium text-foreground hover:bg-background/90 sm:w-auto"
                render={<Link href="/login" />}
              >
                Create free account
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-full border-background/30 px-8 text-base font-medium text-background hover:bg-background/10 sm:w-auto"
                render={<Link href="/login" />}
              >
                Talk to our team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}