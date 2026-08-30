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
import { mockStats, mockSolutions, mockFeatures, mockTestimonials } from "@/lib/mock-data";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"students" | "institutes" | "companies">("students");

  const stats = mockStats.map((st, idx) => ({
    ...st,
    icon: [Users, GraduationCap, Building2, Target][idx] || Users,
  }));

  const solutions = mockSolutions;

  const features = mockFeatures.map((feat, idx) => ({
    ...feat,
    icon: [Code2, Sparkles, BarChart3, ShieldCheck, Zap, Globe][idx] || Code2,
  }));

  const testimonials = mockTestimonials;

  return (
    <div className="w-full bg-[#FFFDF5] text-black">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 border-b-4 border-black">
        {/* Decorative background grid pattern */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center">
            {/* Top Announcement Badge */}
            <div className="inline-flex items-center gap-2 border-4 border-black bg-[#FFD93D] px-5 py-2 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] rotate-[-1deg] mb-8">
              <Sparkles className="size-4 animate-bounce" />
              <span>SkillBridge Platform 2.0 is Live!</span>
            </div>

            {/* Main Headline */}
            <h1 className="max-w-5xl text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.95]">
              Bridge the Gap Between <br />
              <span className="bg-[#FF6B6B] px-3 py-1 border-4 border-black shadow-[6px_6px_0px_0px_#000] inline-block rotate-1 my-2">
                Talent & Institutes
              </span>{" "}
              & Industry
            </h1>



            {/* Call to Actions */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:bg-[#ff5252] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
                render={<Link href="/dashboard/student" />}
              >
                Launch Student Portal
                <ArrowRight className="ml-2 size-5" />
              </Button>
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base font-black uppercase tracking-wider bg-[#FFD93D] text-black border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:bg-[#fcc816] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
                render={<Link href="/dashboard/institute" />}
              >
                Institute Demo
              </Button>
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base font-black uppercase tracking-wider bg-[#C4B5FD] text-black border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:bg-[#b19eff] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
                render={<Link href="/dashboard/industry" />}
              >
                Industry Hiring
              </Button>
            </div>

            {/* Trust Indicator */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 shadow-[3px_3px_0px_0px_#000]">
                <CheckCircle2 className="size-4 text-[#FF6B6B]" />
                <span>100% Free for Learners</span>
              </div>
              <div className="flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 shadow-[3px_3px_0px_0px_#000]">
                <CheckCircle2 className="size-4 text-[#FF6B6B]" />
                <span>Verified Cryptographic Badges</span>
              </div>
              <div className="flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 shadow-[3px_3px_0px_0px_#000]">
                <CheckCircle2 className="size-4 text-[#FF6B6B]" />
                <span>Direct Interview Fast-Tracks</span>
              </div>
            </div>

            {/* Interactive Platform Mockup Preview */}
            <div className="mt-16 w-full rounded-none border-4 border-black bg-white p-4 sm:p-6 shadow-[12px_12px_0px_0px_#000] text-left">
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-6 bg-[#FFD93D] -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 p-4">
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-none bg-[#FF6B6B] border-2 border-black" />
                  <div className="size-4 rounded-none bg-[#FFD93D] border-2 border-black" />
                  <div className="size-4 rounded-none bg-emerald-400 border-2 border-black" />
                  <span className="ml-2 text-xs font-black uppercase tracking-wider font-mono">
                    skillbridge.app/live-talent-registry
                  </span>
                </div>
                <Badge variant="default" className="border-2 border-black bg-black text-white text-xs font-black uppercase tracking-widest rounded-none">
                  Live Cohort Active
                </Badge>
              </div>

              {/* Dashboard Grid Simulation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Active Projects */}
                <div className="rounded-none border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden">
                  <div className="flex items-center justify-between border-b-4 border-black bg-[#FFD93D] px-4 py-3">
                    <span className="text-xs font-black uppercase tracking-widest">
                      Live Industry Tasks
                    </span>
                    <Badge variant="secondary" className="border-2 border-black bg-[#FF6B6B] text-black font-black text-[10px] rounded-none">3 NEW</Badge>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="p-3 rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
                      <div className="flex items-center justify-between font-black text-sm">
                        <span>Distributed Cache Sync</span>
                        <span className="text-emerald-700 font-mono">98/100</span>
                      </div>
                      <p className="text-xs font-bold text-slate-600 mt-1">Sponsor: CloudScale Systems</p>
                    </div>
                    <div className="p-3 rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
                      <div className="flex items-center justify-between font-black text-sm">
                        <span>AI Financial Anomaly Detector</span>
                        <span className="text-[#FF6B6B] font-mono">IN REVIEW</span>
                      </div>
                      <p className="text-xs font-bold text-slate-600 mt-1">Sponsor: FinTech Corp</p>
                    </div>
                  </div>
                </div>

                {/* Middle Column: Competency Score */}
                <div className="rounded-none border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="border-b-4 border-black bg-[#C4B5FD] px-4 py-3">
                      <span className="text-xs font-black uppercase tracking-widest block">
                        Skill Matrix Assessment
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black">96.8%</span>
                        <span className="text-xs font-black text-emerald-700">+14% VS BATCH AVG</span>
                      </div>
                      <p className="text-xs font-bold text-slate-600 mt-1">Verified across 12 practical testcases</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 space-y-2">
                    <div className="flex justify-between text-xs font-black uppercase">
                      <span>System Architecture</span>
                      <span>95%</span>
                    </div>
                    <div className="h-3 w-full rounded-none border-2 border-black bg-white p-0.5">
                      <div className="h-full bg-[#FF6B6B] w-[95%]" />
                    </div>
                    <div className="flex justify-between text-xs font-black uppercase pt-1">
                      <span>API Design & Security</span>
                      <span>98%</span>
                    </div>
                    <div className="h-3 w-full rounded-none border-2 border-black bg-white p-0.5">
                      <div className="h-full bg-[#FFD93D] w-[98%]" />
                    </div>
                  </div>
                </div>

                {/* Right Column: Instant Hiring Matches */}
                <div className="rounded-none border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden">
                  <div className="flex items-center justify-between border-b-4 border-black bg-[#FF6B6B] px-4 py-3">
                    <span className="text-xs font-black uppercase tracking-widest">
                      Direct Interview Invites
                    </span>
                    <span className="text-xs font-black bg-[#FFD93D] border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">4 ACTIVE</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="p-3 rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] flex items-center justify-between">
                      <div>
                        <p className="font-black text-sm">Backend Engineer</p>
                        <p className="text-[11px] font-bold text-muted-foreground">Apex Financial • Remote</p>
                      </div>
                      <Badge className="bg-[#FF6B6B] text-black border-2 border-black text-[10px] font-black rounded-none">SHORTLISTED</Badge>
                    </div>
                    <div className="p-3 rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] flex items-center justify-between">
                      <div>
                        <p className="font-black text-sm">Cloud Platform Intern</p>
                        <p className="text-[11px] font-bold text-muted-foreground">NextGen Cloud • Bangalore</p>
                      </div>
                      <span className="text-[10px] font-black uppercase bg-[#FFD93D] border border-black px-1.5 py-0.5">DIRECT OFFER</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & METRICS BAR */}
      <section className="border-b-4 border-black bg-[#FFD93D] py-12">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all"
              >
                <div className="size-12 rounded-none bg-[#FF6B6B] border-2 border-black text-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
                  <item.icon className="size-6 stroke-[3]" />
                </div>
                <div className="text-4xl font-black tracking-tighter">
                  {item.value}
                </div>
                <div className="mt-2 text-sm font-black uppercase tracking-wider">{item.label}</div>
                <div className="text-xs font-bold text-muted-foreground mt-1">{item.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MULTI-STAKEHOLDER SOLUTIONS */}
      <section className="py-20 md:py-28 border-b-4 border-black bg-[#FFFDF5]">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-[#C4B5FD] border-4 border-black px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] rotate-1 mb-4">
              Tailored Solutions
            </div>
            <h2 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
              Built for Every Pillar of the Education & Hiring Lifecycle
            </h2>
            <p className="mt-4 text-base font-bold text-muted-foreground">
              Whether you are an ambitious student, a placement officer, or a corporate recruiter, SkillBridge delivers targeted value.
            </p>

            <div className="mt-8 inline-flex max-w-full overflow-hidden rounded-none border-4 border-black bg-white p-1.5 shadow-[6px_6px_0px_0px_#000]">
              <button
                type="button"
                onClick={() => setActiveTab("students")}
                className={`flex shrink-0 items-center gap-2 px-4 py-2.5 rounded-none text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === "students"
                    ? "bg-[#FF6B6B] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000]"
                    : "text-black hover:bg-muted"
                }`}
              >
                <Users className="size-4" />
                <span>Learners & Students</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("institutes")}
                className={`flex shrink-0 items-center gap-2 px-4 py-2.5 rounded-none text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === "institutes"
                    ? "bg-[#FFD93D] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000]"
                    : "text-black hover:bg-muted"
                }`}
              >
                <GraduationCap className="size-4" />
                <span>Universities & Colleges</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("companies")}
                className={`flex shrink-0 items-center gap-2 px-4 py-2.5 rounded-none text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === "companies"
                    ? "bg-[#C4B5FD] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000]"
                    : "text-black hover:bg-muted"
                }`}
              >
                <Briefcase className="size-4" />
                <span>Corporate Enterprises</span>
              </button>
            </div>
          </div>

          {/* Active Solution Content Card */}
          <div className="rounded-none border-4 border-black bg-white p-6 md:p-12 shadow-[12px_12px_0px_0px_#000]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Badge className="text-black border-2 border-black bg-[#FFD93D] text-xs font-black uppercase px-3 py-1.5 rounded-none shadow-[3px_3px_0px_0px_#000]">
                  {solutions[activeTab].badge}
                </Badge>
                <h3 className="text-3xl md:text-4xl font-black text-black leading-tight uppercase tracking-tight">
                  {solutions[activeTab].title}
                </h3>
                <p className="text-base font-bold text-muted-foreground leading-relaxed">
                  {solutions[activeTab].description}
                </p>
                <div className="space-y-3 pt-2">
                  {solutions[activeTab].points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 size-6 rounded-none bg-[#FF6B6B] border-2 border-black text-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
                        <Check className="size-3.5 stroke-[4]" />
                      </div>
                      <span className="text-sm font-bold text-foreground">{pt}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:bg-[#ff5252] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    render={<Link href={solutions[activeTab].ctaLink} />}
                  >
                    {solutions[activeTab].ctaText}
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </div>
              </div>

              {/* Solution Visual Preview Box */}
              <div className="lg:col-span-5 rounded-none border-4 border-black bg-[#FFFDF5] p-6 space-y-5 shadow-[8px_8px_0px_0px_#000]">
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-black">
                    {solutions[activeTab].previewHeader}
                  </span>
                  <Badge className="bg-[#FFD93D] text-black border-2 border-black text-[10px] font-black rounded-none">VERIFIED</Badge>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">Focus Tech Stacks & Modules:</span>
                  <div className="flex flex-wrap gap-2">
                    {solutions[activeTab].previewSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-none bg-white border-2 border-black text-xs font-black text-black shadow-[3px_3px_0px_0px_#000]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-none bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-black">Outcome Benchmark</p>
                    <p className="text-xs font-bold text-primary mt-0.5">{solutions[activeTab].previewScore}</p>
                  </div>
                  <CheckCircle2 className="size-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES BENTO GRID */}
      <section className="border-b-4 border-black bg-[#C4B5FD]/10 py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block bg-[#FFD93D] border-4 border-black px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] -rotate-1 mb-4">
              Core Platform Capabilities
            </div>
            <h3 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
              Everything Needed to Scale Verified Skill Building
            </h3>
            <p className="mt-4 text-base font-bold text-muted-foreground">
              Comprehensive tools designed for automated workflows, reliable skill verification, and frictionless recruitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <Card
                key={idx}
                className="group rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-200"
              >
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="size-14 rounded-none bg-[#FFD93D] border-4 border-black text-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                      <feat.icon className="size-7 stroke-[3]" />
                    </div>
                    <Badge className="bg-[#C4B5FD] text-black border-2 border-black text-xs font-black uppercase rounded-none px-2.5 py-1">
                      {feat.tag}
                    </Badge>
                  </div>
                  <h4 className="text-xl font-black text-black uppercase tracking-tight">
                    {feat.title}
                  </h4>
                  <p className="text-sm font-bold text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 3-STEP ROADMAP */}
      <section className="py-20 md:py-28 border-b-4 border-black bg-[#FFFDF5]">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block bg-[#FF6B6B] text-black border-4 border-black px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] rotate-2 mb-4">
              How It Works
            </div>
            <h3 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
              From Practical Learning to Verified Employment
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="rounded-none border-4 border-black bg-white p-8 space-y-4 shadow-[8px_8px_0px_0px_#000]">
              <div className="size-12 rounded-none bg-[#FF6B6B] text-black border-4 border-black font-black text-xl flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
                1
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight">Skill Up on Live Projects</h4>
              <p className="text-sm font-bold text-muted-foreground leading-relaxed">
                Take on real challenges curated by industry leads. Build production code, write tests, and submit for automated and peer reviews.
              </p>
            </div>

            <div className="rounded-none border-4 border-black bg-white p-8 space-y-4 shadow-[8px_8px_0px_0px_#000]">
              <div className="size-12 rounded-none bg-[#FFD93D] text-black border-4 border-black font-black text-xl flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
                2
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight">Earn Verified Badges</h4>
              <p className="text-sm font-bold text-muted-foreground leading-relaxed">
                Complete milestones to receive tamper-proof competency credentials that demonstrate verified proof-of-work to potential employers.
              </p>
            </div>

            <div className="rounded-none border-4 border-black bg-white p-8 space-y-4 shadow-[8px_8px_0px_0px_#000]">
              <div className="size-12 rounded-none bg-[#C4B5FD] text-black border-4 border-black font-black text-xl flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
                3
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight">Unlock Direct Hiring</h4>
              <p className="text-sm font-bold text-muted-foreground leading-relaxed">
                Skip standard resume filters. Get matched directly with hiring managers who value demonstrable engineering capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="border-b-4 border-black bg-[#FFD93D]/20 py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block bg-black text-white border-4 border-black px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] -rotate-1 mb-4">
              Success Stories
            </div>
            <h3 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
              Loved by Students, Deans & Talent Leaders
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="rounded-none border-4 border-black bg-white flex flex-col justify-between p-8 shadow-[8px_8px_0px_0px_#000]">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-5 fill-[#FFD93D] text-black stroke-[3]" />
                    ))}
                  </div>
                  <p className="text-sm font-bold italic leading-relaxed text-black">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-6 border-t-2 border-black mt-6">
                  <p className="text-base font-black uppercase tracking-tight">{t.author}</p>
                  <p className="text-xs font-black text-[#FF6B6B] uppercase tracking-wider">{t.role}</p>
                  <p className="text-xs font-bold text-muted-foreground">{t.organization}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HIGH-IMPACT BOTTOM CTA BANNER */}
      <section className="py-20 md:py-28 bg-[#FFFDF5]">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-none border-4 border-black bg-[#FF6B6B] px-6 py-14 sm:px-12 sm:py-20 text-center shadow-[16px_16px_0px_0px_#000]">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h3 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl uppercase text-black">
                Ready to Bridge the Skill Gap?
              </h3>
              <p className="text-base sm:text-lg font-bold text-black max-w-2xl mx-auto">
                Join over 50,000 learners and 500+ top universities already accelerating career growth and industry hiring on SkillBridge.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-base font-black uppercase tracking-wider bg-black text-white border-4 border-black shadow-[6px_6px_0px_0px_#FFF] hover:bg-neutral-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  render={<Link href="/dashboard/student" />}
                >
                  Create Free Account
                  <ArrowRight className="ml-2 size-5" />
                </Button>
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-base font-black uppercase tracking-wider bg-[#FFD93D] text-black border-4 border-black shadow-[6px_6px_0px_0px_#FFF] hover:bg-[#fcc816] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  render={<Link href="/dashboard/institute" />}
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
