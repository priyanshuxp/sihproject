"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VerificationBanner } from "@/components/platform/VerificationBanner";
import { PlatformStatus, AcademicianProfile } from "@/types/platform";
import { mockAcademicianProfile } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Briefcase,
  Users,
  Search,
  CheckCircle2,
  Building2,
  Sparkles,
  Award,
  FileText,
  Plus,
  ArrowLeft,
} from "lucide-react";

export default function AcademicianPortalDashboard() {
  const [platformStatus, setPlatformStatus] = useState<PlatformStatus>("VERIFIED");
  const [activeTab, setActiveTab] = useState<"fdps" | "consultancy" | "internships" | "mentorship">("fdps");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam && ["fdps", "consultancy", "internships", "mentorship"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, []);

  const [profile, setProfile] = useState<AcademicianProfile>(mockAcademicianProfile);

  // New Consultancy Proposal State
  const [newConsTitle, setNewConsTitle] = useState("");
  const [newConsCompany, setNewConsCompany] = useState("");
  const [newConsBudget, setNewConsBudget] = useState("");
  const [newConsExpertise, setNewConsExpertise] = useState("");

  const handleCreateConsultancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConsTitle.trim()) return;
    const created = {
      id: `cons-${Date.now()}`,
      title: newConsTitle,
      sponsoringCompany: newConsCompany || "Apex Financial",
      budget: newConsBudget || "$30,000",
      requiredExpertise: newConsExpertise ? newConsExpertise.split(",").map((s) => s.trim()) : ["AI", "Cloud"],
      deadline: "2026-09-30",
    };
    setProfile({
      ...profile,
      consultancyProjects: [created, ...profile.consultancyProjects],
    });
    setNewConsTitle("");
    setNewConsCompany("");
    setNewConsBudget("");
    setNewConsExpertise("");
    alert("Consultancy proposal submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black pb-24">
      {/* Top Header & Navigation Bar */}
      <div className="border-b-4 border-black bg-white sticky top-0 z-30 shadow-[0_4px_0px_0px_#000]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button className="font-black uppercase tracking-wider bg-white text-black border-4 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-slate-100 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-none text-xs gap-2">
                <ArrowLeft className="size-4 stroke-[3]" />
                Home
              </Button>
            </Link>
            <div className="size-12 rounded-none bg-[#FFD93D] border-4 border-black text-black flex items-center justify-center font-black shadow-[3px_3px_0px_0px_#000]">
              <BookOpen className="size-6 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black uppercase tracking-tight">Academician & Faculty Portal</h1>
                <Badge className="bg-[#C4B5FD] text-black border-2 border-black text-[10px] font-black rounded-none">
                  Faculty R&D
                </Badge>
              </div>
              <p className="text-xs font-bold text-slate-600">
                Faculty Development Programs, industrial training, consultancy opportunities, and mentorship.
              </p>
            </div>
          </div>

          {/* Test Status Switcher */}
          <div className="flex items-center gap-2 bg-[#FFFDF5] p-2 rounded-none border-4 border-black shadow-[4px_4px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase px-1">Status:</span>
            {(["VERIFIED", "PENDING", "REJECTED"] as PlatformStatus[]).map((st) => (
              <button
                key={st}
                onClick={() => setPlatformStatus(st)}
                className={`px-3 py-1 rounded-none text-[10px] font-black uppercase border-2 border-black transition-all ${
                  platformStatus === st
                    ? "bg-[#FFD93D] text-black shadow-[2px_2px_0px_0px_#000]"
                    : "bg-white text-black hover:bg-slate-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 space-y-8">
        {/* Verification Banner */}
        <VerificationBanner
          status={platformStatus}
          entityName={profile.fullName}
          onResubmit={() => {
            setPlatformStatus("PENDING");
            alert("Faculty credentials re-submitted for institutional review!");
          }}
        />

        {/* Tabbed Navigation Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b-4 border-black">
          {[
            { id: "fdps", label: `Faculty Dev Programs (${profile.fdpParticipations.length})`, icon: Award, color: "bg-[#FF6B6B]" },
            { id: "consultancy", label: `Consultancy & Research (${profile.consultancyProjects.length + profile.researchProjects.length})`, icon: Briefcase, color: "bg-[#FFD93D]" },
            { id: "internships", label: "Industrial Training", icon: Building2, color: "bg-[#C4B5FD]" },
            { id: "mentorship", label: "Mentorship Hub", icon: Users, color: "bg-emerald-300" },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-none border-4 border-black text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                  isActive
                    ? `${tab.color} text-black shadow-[4px_4px_0px_0px_#000]`
                    : "bg-white text-black hover:bg-slate-100"
                }`}
              >
                <Icon className="size-4 stroke-[3]" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: FDPS */}
        {activeTab === "fdps" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
              <CardHeader className="border-b-4 border-black bg-[#FFD93D]">
                <CardTitle className="text-xl font-black uppercase">Registered FDPs & Workshops</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {profile.fdpParticipations.map((fdp) => (
                  <div key={fdp.id} className="p-4 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-emerald-300 text-black border-2 border-black font-black text-[10px] rounded-none">
                        {fdp.mode} • {fdp.durationDays} Days
                      </Badge>
                      <Badge className="bg-black text-white border-2 border-black text-[10px] font-black rounded-none">
                        {fdp.status}
                      </Badge>
                    </div>
                    <h4 className="text-base font-black uppercase text-black">{fdp.title}</h4>
                    <p className="text-xs font-bold text-slate-600">Organizer: {fdp.organizer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
              <CardHeader className="border-b-4 border-black bg-[#FF6B6B]">
                <CardTitle className="text-xl font-black uppercase">Upcoming Industry FDPs</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  { title: "Advanced LLM Fine-Tuning for Academics", sponsor: "AI Labs Global", duration: "7 Days" },
                  { title: "Secure Cloud Architecture & Zero Trust", sponsor: "NextGen Cloud", duration: "5 Days" },
                ].map((upcoming, idx) => (
                  <div key={idx} className="p-4 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-primary">{upcoming.sponsor}</span>
                      <span className="text-xs font-bold">{upcoming.duration}</span>
                    </div>
                    <h4 className="text-base font-black uppercase">{upcoming.title}</h4>
                    <Button
                      size="sm"
                      className="font-black uppercase tracking-wider bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#FFF] hover:bg-neutral-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-none text-xs"
                      onClick={() => alert(`Registered successfully for ${upcoming.title}!`)}
                    >
                      Register for FDP
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 2: CONSULTANCY */}
        {activeTab === "consultancy" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
                <CardHeader className="border-b-4 border-black bg-[#FFD93D]">
                  <CardTitle className="text-lg font-black uppercase">Submit Consultancy Proposal</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleCreateConsultancy} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider">Project Title</label>
                      <input
                        type="text"
                        placeholder="e.g. AI Fraud Detection"
                        value={newConsTitle}
                        onChange={(e) => setNewConsTitle(e.target.value)}
                        className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider">Sponsoring Company</label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Financial"
                        value={newConsCompany}
                        onChange={(e) => setNewConsCompany(e.target.value)}
                        className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider">Budget</label>
                        <input
                          type="text"
                          placeholder="e.g. $40,000"
                          value={newConsBudget}
                          onChange={(e) => setNewConsBudget(e.target.value)}
                          className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider">Expertise Tags</label>
                        <input
                          type="text"
                          placeholder="Python, ML"
                          value={newConsExpertise}
                          onChange={(e) => setNewConsExpertise(e.target.value)}
                          className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#ff5252] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none gap-2"
                    >
                      <Plus className="size-4 stroke-[3]" />
                      Submit Proposal
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
                <CardHeader className="border-b-4 border-black bg-[#C4B5FD]">
                  <CardTitle className="text-lg font-black uppercase">Active Consultancy & Joint Research</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {profile.consultancyProjects.map((cons) => (
                    <div key={cons.id} className="p-4 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-[#FFD93D] text-black border-2 border-black font-black text-[10px] rounded-none">
                          Budget: {cons.budget}
                        </Badge>
                        <span className="text-xs font-mono font-bold">Deadline: {cons.deadline}</span>
                      </div>
                      <h4 className="text-base font-black uppercase text-black">{cons.title}</h4>
                      <p className="text-xs font-bold text-slate-600">Partner: {cons.sponsoringCompany}</p>
                    </div>
                  ))}

                  {profile.researchProjects.map((res) => (
                    <div key={res.id} className="p-4 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-emerald-300 text-black border-2 border-black font-black text-[10px] rounded-none">
                          {res.status}
                        </Badge>
                        <span className="text-xs font-bold text-primary">{res.researchDomain}</span>
                      </div>
                      <h4 className="text-base font-black uppercase text-black">{res.title}</h4>
                      <p className="text-xs font-bold text-slate-600">Industry Partner: {res.industryPartner}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 3: INDUSTRIAL TRAINING */}
        {activeTab === "internships" && (
          <div className="space-y-6">
            <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
              <CardHeader className="border-b-4 border-black bg-[#FFD93D]">
                <CardTitle className="text-xl font-black uppercase">Faculty Industrial Training & Fellowships</CardTitle>
                <p className="text-sm font-bold text-black mt-1">
                  Faculty industry immersion programs to experience cutting-edge engineering workflows at partner enterprises.
                </p>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Cloud Infrastructure Immersion", company: "NextGen Cloud", duration: "4 Weeks", stipend: "$5,000 Fellowship" },
                  { title: "Fintech Systems Architecture Fellowship", company: "Apex Financial", duration: "6 Weeks", stipend: "$7,500 Fellowship" },
                ].map((train, idx) => (
                  <div key={idx} className="p-6 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[6px_6px_0px_0px_#000] space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#FF6B6B] text-black border-2 border-black font-black text-xs rounded-none">
                        {train.stipend}
                      </Badge>
                      <span className="text-xs font-bold">{train.duration}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase text-black">{train.title}</h4>
                      <p className="text-xs font-bold text-primary mt-0.5">Partner: {train.company}</p>
                    </div>
                    <Button
                      className="w-full font-black uppercase tracking-wider bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_#FFF] hover:bg-neutral-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none text-xs"
                      onClick={() => alert(`Application submitted for ${train.title} fellowship!`)}
                    >
                      Apply for Fellowship
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 4: MENTORSHIP */}
        {activeTab === "mentorship" && (
          <div className="space-y-6">
            <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
              <CardHeader className="border-b-4 border-black bg-emerald-300">
                <CardTitle className="text-xl font-black uppercase text-black">Assigned Student Mentees & Capstone Reviews</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  { name: "Rahul Sharma", id: "CS-2023-401", project: "Distributed Task Scheduler", status: "Review Pending" },
                  { name: "Priya Nair", id: "CS-2023-412", project: "AI Medical Diagnostic Pipeline", status: "Approved" },
                  { name: "Vikram Mehta", id: "CS-2023-445", project: "Zero-Trust Cloud Proxy", status: "Changes Requested" },
                ].map((mentee, idx) => (
                  <div key={idx} className="p-5 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[6px_6px_0px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black uppercase text-black">{mentee.name}</h4>
                        <span className="text-xs font-mono font-bold text-slate-500">({mentee.id})</span>
                      </div>
                      <p className="text-xs font-bold text-primary">Capstone Project: {mentee.project}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-[#FFD93D] text-black border-2 border-black font-black text-xs rounded-none">
                        {mentee.status}
                      </Badge>
                      <Button
                        size="sm"
                        className="font-black uppercase tracking-wider bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#FFF] hover:bg-neutral-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-none text-xs"
                        onClick={() => alert(`Review submitted for ${mentee.name}'s capstone project!`)}
                      >
                        Submit Feedback
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
