"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VerificationBanner } from "@/components/platform/VerificationBanner";
import { StudentVerifyQueue } from "@/components/platform/StudentVerifyQueue";
import { PlatformStatus } from "@/types/platform";
import {
  mockVerificationQueue,
  mockSkillGapMetrics,
  mockStudentSelectionMetrics,
  mockCertificationCourses,
} from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  Users,
  BarChart3,
  Building2,
  TrendingUp,
  AlertTriangle,
  Download,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

export default function InstitutePortalDashboard() {
  const [platformStatus, setPlatformStatus] = useState<PlatformStatus>("VERIFIED");
  const [activeTab, setActiveTab] = useState<"queue" | "metrics" | "collaboration">("queue");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam && ["queue", "metrics", "collaboration"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, []);

  const [queueItems, setQueueItems] = useState(mockVerificationQueue);
  const [skillGaps, setSkillGaps] = useState(mockSkillGapMetrics);
  const [selectionMetrics, setSelectionMetrics] = useState(mockStudentSelectionMetrics);

  const handleApproveStudent = (id: string) => {
    setQueueItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "VERIFIED" as const } : item))
    );
  };

  const handleRejectStudent = (id: string) => {
    setQueueItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "REJECTED" as const } : item))
    );
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
              <GraduationCap className="size-6 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black uppercase tracking-tight">University & Institute Placement Portal</h1>
                <Badge className="bg-[#C4B5FD] text-black border-2 border-black text-[10px] font-black rounded-none">
                  Administrator Mode
                </Badge>
              </div>
              <p className="text-xs font-bold text-slate-600">
                Manage student verification queues, curriculum skill gaps, and corporate placement analytics.
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
          entityName="National Institute of Technology"
          onResubmit={() => {
            setPlatformStatus("PENDING");
            alert("Institute accreditation data re-submitted!");
          }}
        />

        {platformStatus !== "VERIFIED" && (
          <div className="rounded-none border-4 border-black bg-[#FFD93D] p-4 flex items-center gap-3 shadow-[6px_6px_0px_0px_#000]">
            <AlertTriangle className="size-6 text-black shrink-0 stroke-[3]" />
            <p className="text-xs font-black uppercase text-black">
              Notice: Register with correct registrar data to ensure seamless student credential sync and recruiter trust accreditation.
            </p>
          </div>
        )}

        {/* Tabbed Navigation Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b-4 border-black">
          {[
            { id: "queue", label: `Student Verification (${queueItems.filter((i) => i.status === "PENDING").length} Pending)`, icon: Users, color: "bg-[#FF6B6B]" },
            { id: "metrics", label: "Performance & Skill Gaps", icon: BarChart3, color: "bg-[#FFD93D]" },
            { id: "collaboration", label: "Industry Collaboration", icon: Building2, color: "bg-[#C4B5FD]" },
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

        {/* TAB 1: STUDENT VERIFICATION QUEUE */}
        {activeTab === "queue" && (
          <StudentVerifyQueue
            items={queueItems}
            onApprove={handleApproveStudent}
            onReject={handleRejectStudent}
          />
        )}

        {/* TAB 2: METRICS */}
        {activeTab === "metrics" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectionMetrics.map((sm, idx) => (
                <Card key={idx} className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="size-12 rounded-none bg-[#FFD93D] border-2 border-black text-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
                        <TrendingUp className="size-6 stroke-[3]" />
                      </div>
                      <Badge className="bg-emerald-300 text-black border-2 border-black font-black text-xs rounded-none">
                        {sm.placementRate}% Placement
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-base font-black uppercase text-black">{sm.department}</h4>
                      <p className="text-xs font-bold text-slate-600 mt-0.5">Average Package: {sm.averagePackage}</p>
                    </div>
                    <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs font-bold">
                      <span>Total: <strong className="text-black">{sm.totalStudents}</strong></span>
                      <span>Placed: <strong className="text-black">{sm.placedStudents}</strong></span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="rounded-none border-4 border-black bg-white shadow-[12px_12px_0px_0px_#000]">
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b-4 border-black bg-[#FFD93D]">
                <div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight text-black">Curriculum Skill Gap Analytics</CardTitle>
                  <p className="text-sm font-bold text-black mt-1">
                    Comparison of industry demand vs student proficiency across core technical competencies.
                  </p>
                </div>
                <Button
                  className="font-black uppercase tracking-wider bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-slate-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none text-xs gap-2"
                  onClick={() => alert("Downloading exportable skill gap report CSV...")}
                >
                  <Download className="size-4 stroke-[3]" />
                  Export Report
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {skillGaps.map((sg, idx) => (
                  <div key={idx} className="rounded-none border-4 border-black bg-[#FFFDF5] p-5 shadow-[6px_6px_0px_0px_#000] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-black uppercase text-black">{sg.skillName}</h4>
                        <Badge
                          className={`text-[10px] font-black uppercase rounded-none border-2 border-black px-2.5 py-1 ${
                            sg.gapSeverity === "Critical"
                              ? "bg-[#FF6B6B]"
                              : sg.gapSeverity === "Moderate"
                              ? "bg-[#FFD93D]"
                              : "bg-emerald-300"
                          }`}
                        >
                          {sg.gapSeverity} Gap
                        </Badge>
                      </div>
                      <span className="text-xs font-black uppercase text-slate-600">
                        Demand: {sg.industryDemandPercentage}% | Proficiency: {sg.studentProficiencyPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-white rounded-none border-2 border-black h-4 p-0.5">
                      <div
                        className="bg-[#FF6B6B] h-full"
                        style={{ width: `${sg.studentProficiencyPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs font-bold bg-white p-3 rounded-none border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                      <strong>Recommended Action:</strong> {sg.recommendedAction}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 3: COLLABORATION */}
        {activeTab === "collaboration" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
                <CardHeader className="border-b-4 border-black bg-[#FFD93D]">
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                    <Building2 className="size-5 stroke-[3]" />
                    Verified Corporate Partners
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {[
                    { name: "Apex Financial", moUStatus: "Active MOU", hires: 42, tech: "Fintech & Cloud" },
                    { name: "NextGen Cloud", moUStatus: "Active MOU", hires: 35, tech: "DevOps & K8s" },
                    { name: "DataPulse Systems", moUStatus: "Pending Renewal", hires: 18, tech: "AI & Data Science" },
                  ].map((partner, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
                      <div>
                        <p className="text-sm font-black uppercase text-black">{partner.name}</p>
                        <p className="text-xs font-bold text-slate-600">{partner.tech} • {partner.hires} Placements</p>
                      </div>
                      <Badge className="bg-emerald-300 text-black border-2 border-black text-[10px] font-black uppercase rounded-none px-2.5 py-1">
                        {partner.moUStatus}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
                <CardHeader className="border-b-4 border-black bg-[#C4B5FD]">
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                    <BookOpen className="size-5 stroke-[3]" />
                    Industry-Sponsored Training Programs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {mockCertificationCourses.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-4 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
                      <div>
                        <p className="text-sm font-black uppercase text-black">{c.title}</p>
                        <p className="text-xs font-bold text-slate-600">{c.provider} • {c.enrolledCount} Enrolled</p>
                      </div>
                      <Badge className="bg-[#FFD93D] text-black border-2 border-black text-[10px] font-black uppercase rounded-none px-2.5 py-1">
                        {c.badgeType}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
