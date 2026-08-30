"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  GraduationCap,
  Briefcase,
  Code2,
  ShieldCheck,
  Zap,
  BarChart3,
  Users,
  Globe,
  Star,
  ChevronRight,
  Target,
  Check,
} from "lucide-react";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"students" | "institutes" | "companies">("students");

  const stats = [
    { label: "Active Learners", value: "50,000+", icon: Users, change: "+24% this month" },
    { label: "Partner Universities", value: "500+", icon: GraduationCap, change: "Across 18 states" },
    { label: "Hiring Enterprises", value: "1,200+", icon: Building2, change: "Tech, Finance & Core" },
    { label: "Placement Rate", value: "94.2%", icon: Target, change: "Verified outcomes" },
  ];

  const solutions = {
    students: {
      badge: "For Students & Job Seekers",
      title: "Fast-Track Your Tech & Core Career With Real Proof of Work",
      description:
        "Tired of sending resumes into black holes? Build verifiable project portfolios, solve real challenges from leading companies, and get discovered directly by tech recruiters.",
      points: [
        "Work on real-world industry problem statements with mentors",
        "Earn tamper-proof skill badges verified by corporate partners",
        "Direct interview fast-tracks bypassing traditional screening filters",
        "Collaborative hackathons with team matchmaking and live rankings",
      ],
      ctaText: "Start Learning For Free",
      ctaLink: "/login",
      previewHeader: "Student Portfolio • Rahul S. (B.Tech CS)",
      previewSkills: ["Next.js", "FastAPI", "PostgreSQL", "Docker", "AWS"],
      previewScore: "98.4% Competency Score",
    },
    institutes: {
      badge: "For Colleges & Universities",
      title: "Supercharge Placement Cells & Industry Collaboration",
      description:
        "Equip your students with industry-relevant skills. Streamline corporate outreach, track batch learning trajectories, and boost placement statistics through unified analytics.",
      points: [
        "Automated curriculum alignment with current industry tech stacks",
        "Centralized placement portal with multi-campus and batch management",
        "Real-time student progress tracking & skill gap heatmaps",
        "Seamless corporate partnership onboarding & MOU management",
      ],
      ctaText: "Request Campus Demo",
      ctaLink: "/login",
      previewHeader: "Institute Dashboard • National Tech University",
      previewSkills: ["Batch 2026", "840 Students", "92% Placement Rate", "45 Corporate Partners"],
      previewScore: "Ranked #1 for Industry Readiness",
    },
    companies: {
      badge: "For Enterprises & Startups",
      title: "Hire Pre-Assessed, Job-Ready Talent in Days, Not Months",
      description:
        "Cut your hiring cycle by 70%. Access a verified pipeline of top engineers and problem solvers who have proven their capabilities on production-grade challenges.",
      points: [
        "Evaluate candidates through customized live coding & engineering tasks",
        "Zero guesswork: Review actual code, Git history, and mentor ratings",
        "Direct access to top 5% talent across 500+ accredited colleges",
        "Host branded hackathons and hiring challenges effortlessly",
      ],
      ctaText: "Post a Challenge / Hire",
      ctaLink: "/login",
      previewHeader: "Recruiter Portal • Enterprise Talent Pipeline",
      previewSkills: ["Full-Stack", "Cloud & DevOps", "Data Science", "Embedded Systems"],
      previewScore: "Average Time-to-Hire: 6 Days",
    },
  };

  const features = [
    {
      icon: Code2,
      title: "Live Industry Projects",
      description: "Tackle verified project challenges designed directly by tech leads and product architects from top firms.",
      tag: "Hands-on",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Skill Mapping",
      description: "Intelligent career path algorithms match learner skills with real-time job market requirements.",
      tag: "AI Tech",
    },
    {
      icon: BarChart3,
      title: "Cohort & Placement Analytics",
      description: "Deep statistical dashboards for colleges to track skill acquisition, project submissions, and hiring rates.",
      tag: "Insights",
    },
    {
      icon: ShieldCheck,
      title: "Verified Competency Badges",
      description: "Cryptographically verified credentials that recruiters can validate with a single click.",
      tag: "Verifiable",
    },
    {
      icon: Zap,
      title: "Automated Evaluation Engine",
      description: "Instant feedback with automated test suites, code quality analysis, and benchmark scoring.",
      tag: "Speed",
    },
    {
      icon: Globe,
      title: "Multi-Campus Management",
      description: "Role-based access control to manage thousands of students, faculty advisors, and enterprise partners.",
      tag: "Scalable",
    },
  ];

  const testimonials = [
    {
      quote:
        "SkillBridge transformed how our university manages campus placements. We saw a 38% increase in tier-1 tech offers within our first semester using the platform.",
      author: "Dr. Ananya Sharma",
      role: "Dean of Academic Relations",
      organization: "Apex Institute of Technology",
      rating: 5,
    },
    {
      quote:
        "Working on real industry challenges gave me the exact skills tech companies were looking for. I received 3 job offers before even graduating!",
      author: "Vikram Mehta",
      role: "Software Engineer at CloudScale",
      organization: "Class of 2025",
      rating: 5,
    },
    {
      quote:
        "Instead of reviewing 1,000 generic resumes, SkillBridge lets us filter by verified project code. Our hiring cycle dropped from 4 weeks to under a week.",
      author: "Priya Nair",
      role: "VP of Engineering & Talent",
      organization: "DataPulse Systems",
      rating: 5,
    },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-2xl" />

        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center">
            {/* Top Announcement Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary shadow-xs transition-all hover:bg-primary/10 mb-6">
              <Sparkles className="size-3.5" />
              <span>SkillBridge Platform 2.0 is Live</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-semibold text-foreground flex items-center gap-1">
                Explore Ecosystem <ChevronRight className="size-3" />
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl text-foreground">
              Bridge the Gap Between{" "}
              <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-primary dark:to-indigo-300">
                Talent, Institutes
              </span>{" "}
              & Industry
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
              The unified platform empowering students with verified project-based skills, universities with real-time placement intelligence, and enterprises with pre-assessed talent.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-7 text-base font-semibold shadow-md shadow-primary/20"
                render={<Link href="/login" />}
              >
                Get Started Free
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-7 text-base font-medium"
                render={<Link href="/login" />}
              >
                Schedule Campus Demo
              </Button>
            </div>

            {/* Trust Indicator */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                <span>Free for individual learners</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                <span>Zero-setup integration for colleges</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                <span>Verified skill certifications</span>
              </div>
            </div>

            {/* Interactive Platform Mockup Preview */}
            <div className="mt-14 w-full rounded-2xl border border-border/80 bg-card/60 p-2 shadow-2xl backdrop-blur-sm sm:p-4">
              <div className="rounded-xl border border-border bg-background p-4 sm:p-6 text-left">
                {/* Browser Header Bar */}
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500/80" />
                    <div className="size-3 rounded-full bg-yellow-500/80" />
                    <div className="size-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-xs font-mono text-muted-foreground hidden sm:inline">
                      skillbridge.app/dashboard/talent-hub
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Live Cohort Active
                    </Badge>
                  </div>
                </div>

                {/* Dashboard Grid Simulation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Left Column: Active Projects */}
                  <div className="rounded-lg border p-4 bg-card/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Live Industry Tasks
                      </span>
                      <Badge variant="secondary" className="text-[10px]">3 New</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-md border bg-background text-xs">
                        <div className="flex items-center justify-between font-semibold">
                          <span>Distributed Cache Sync</span>
                          <span className="text-emerald-500 font-mono">98/100</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Sponsor: CloudScale Systems</p>
                      </div>
                      <div className="p-2.5 rounded-md border bg-background text-xs">
                        <div className="flex items-center justify-between font-semibold">
                          <span>AI Financial Anomaly Detector</span>
                          <span className="text-primary font-mono">In Review</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Sponsor: FinTech Corp</p>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Competency Score */}
                  <div className="rounded-lg border p-4 bg-card/50 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Skill Matrix Assessment
                      </span>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-foreground">96.8%</span>
                        <span className="text-xs text-emerald-500 font-medium">+14% vs batch avg</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Verified across 12 practical testcases</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span>System Architecture</span>
                        <span className="font-semibold">95%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full w-[95%]" />
                      </div>
                      <div className="flex justify-between text-[11px] pt-1">
                        <span>API Design & Security</span>
                        <span className="font-semibold">98%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full w-[98%]" />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Instant Hiring Matches */}
                  <div className="rounded-lg border p-4 bg-card/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Direct Interview Invites
                      </span>
                      <span className="text-xs text-primary font-semibold">4 Active</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-md border border-primary/30 bg-primary/5 text-xs flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">Backend Engineer</p>
                          <p className="text-[10px] text-muted-foreground">Apex Financial • Remote</p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-[10px]">Shortlisted</Badge>
                      </div>
                      <div className="p-2.5 rounded-md border bg-background text-xs flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">Cloud Platform Intern</p>
                          <p className="text-[10px] text-muted-foreground">NextGen Cloud • Bangalore</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground">Direct Offer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & METRICS BAR */}
      <section className="border-y border-border/80 bg-muted/30 py-12">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-xl transition-colors hover:bg-card/50 border border-transparent hover:border-border"
              >
                <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <item.icon className="size-5" />
                </div>
                <div className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
                  {item.value}
                </div>
                <div className="mt-1 text-sm font-medium text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{item.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MULTI-STAKEHOLDER SOLUTIONS */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Tailored Solutions</h2>
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Built for Every Pillar of the Education & Hiring Lifecycle
            </h3>
            <p className="mt-4 text-base text-muted-foreground">
              Whether you are an ambitious student, a placement officer, or a corporate recruiter, SkillBridge delivers targeted value.
            </p>
<div className="mt-8 inline-flex max-w-full overflow-hidden rounded-xl border bg-muted/60 p-1">
  <button
    type="button"
    onClick={() => setActiveTab("students")}
    className={`flex shrink-0 items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
      activeTab === "students"
        ? "bg-background text-foreground shadow-xs"
        : "text-muted-foreground hover:text-foreground"
    }`}
  >
    <Users className="size-3 sm:size-4" />
    <span>Learners & Students</span>
  </button>

  <button
    type="button"
    onClick={() => setActiveTab("institutes")}
    className={`flex shrink-0 items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
      activeTab === "institutes"
        ? "bg-background text-foreground shadow-xs"
        : "text-muted-foreground hover:text-foreground"
    }`}
  >
    <GraduationCap className="size-3 sm:size-4" />
    <span>Universities & Colleges</span>
  </button>

  <button
    type="button"
    onClick={() => setActiveTab("companies")}
    className={`flex shrink-0 items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
      activeTab === "companies"
        ? "bg-background text-foreground shadow-xs"
        : "text-muted-foreground hover:text-foreground"
    }`}
  >
    <Briefcase className="size-3 sm:size-4" />
    <span>Corporate Enterprises</span>
  </button>
</div>

          


 

                  
                

          {/* Active Solution Content Card */}
          <div className="rounded-2xl border bg-card p-6 md:p-10 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 text-xs py-1 px-3">
                  {solutions[activeTab].badge}
                </Badge>
                <h4 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {solutions[activeTab].title}
                </h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {solutions[activeTab].description}
                </p>
                <div className="space-y-3 pt-2">
                  {solutions[activeTab].points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Check className="size-3 stroke-[3]" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{pt}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="font-semibold shadow-sm"
                    render={<Link href={solutions[activeTab].ctaLink} />}
                  >
                    {solutions[activeTab].ctaText}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>

              {/* Solution Visual Preview Box */}
              <div className="lg:col-span-5 rounded-xl border border-border bg-muted/40 p-6 space-y-5">
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-xs font-semibold text-foreground">
                    {solutions[activeTab].previewHeader}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">Verified</Badge>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-medium text-muted-foreground">Focus Tech Stacks & Modules:</span>
                  <div className="flex flex-wrap gap-2">
                    {solutions[activeTab].previewSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-background border text-xs font-medium text-foreground"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-background p-4 border border-primary/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-primary">Outcome Benchmark</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{solutions[activeTab].previewScore}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES BENTO GRID */}
      <section className="border-t border-border/80 bg-muted/20 py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Core Platform Capabilities</h2>
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Everything Needed to Scale Verified Skill Building
            </h3>
            <p className="mt-4 text-base text-muted-foreground">
              Comprehensive tools designed for automated workflows, reliable skill verification, and frictionless recruitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <Card
                key={idx}
                className="group border border-border/80 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="size-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                      <feat.icon className="size-5" />
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-medium">
                      {feat.tag}
                    </Badge>
                  </div>
                  <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 3-STEP ROADMAP */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">How It Works</h2>
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              From Practical Learning to Verified Employment
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-4 relative">
              <div className="size-10 rounded-full bg-primary text-primary-foreground font-bold text-base flex items-center justify-center">
                1
              </div>
              <h4 className="text-xl font-bold text-foreground">Skill Up on Live Projects</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Take on real challenges curated by industry leads. Build production code, write tests, and submit for automated and peer reviews.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-4 relative">
              <div className="size-10 rounded-full bg-primary text-primary-foreground font-bold text-base flex items-center justify-center">
                2
              </div>
              <h4 className="text-xl font-bold text-foreground">Earn Verified Badges</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Complete milestones to receive tamper-proof competency credentials that demonstrate verified proof-of-work to potential employers.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-4 relative">
              <div className="size-10 rounded-full bg-primary text-primary-foreground font-bold text-base flex items-center justify-center">
                3
              </div>
              <h4 className="text-xl font-bold text-foreground">Unlock Direct Hiring</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Skip standard resume filters. Get matched directly with hiring managers who value demonstrable engineering capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="border-t border-border/80 bg-muted/20 py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Success Stories</h2>
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Loved by Students, Deans & Talent Leaders
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="border bg-card flex flex-col justify-between p-6 shadow-xs">
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-6 border-t mt-6">
                  <p className="text-sm font-bold text-foreground">{t.author}</p>
                  <p className="text-xs text-primary font-medium">{t.role}</p>
                  <p className="text-xs text-muted-foreground">{t.organization}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HIGH-IMPACT BOTTOM CTA BANNER */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-blue-700 to-indigo-800 px-6 py-14 sm:px-12 sm:py-20 text-center text-primary-foreground shadow-2xl">
            {/* Ambient light inside CTA banner */}
            <div className="absolute top-0 right-0 -z-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -z-0 h-64 w-64 rounded-full bg-black/20 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                Ready to Bridge the Skill Gap?
              </h3>
              <p className="text-base sm:text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Join over 50,000 learners and 500+ top universities already accelerating career growth and industry hiring on SkillBridge.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 text-base font-bold bg-white text-primary hover:bg-white/90 shadow-lg"
                  render={<Link href="/login" />}
                >
                  Create Free Account
                  <ArrowRight className="ml-2 size-4 text-primary" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 text-base font-semibold border-white/40 text-white hover:bg-white/10 hover:text-white"
                  render={<Link href="/login" />}
                >
                  Talk to Our Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
