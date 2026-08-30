"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { InstituteLinkerGate } from "@/components/platform/InstituteLinkerGate";
import { RecommendationCard } from "@/components/platform/RecommendationCard";
import { VerificationBanner } from "@/components/platform/VerificationBanner";
import { mockStudentProfile, mockRecommendations, mockSkillQuestionnaires, mockVerifiedPortfolio } from "@/lib/mock-data";
import { PlatformStatus, StudentProfile, RecommendationItem } from "@/types/platform";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  BookOpen,
  Briefcase,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  Code2,
  Terminal,
  Check,
  Download,
  Share2,
  ArrowLeft,
} from "lucide-react";

export default function StudentPortalDashboard() {
  const [profile, setProfile] = useState<StudentProfile>(mockStudentProfile);
  const [isLinked, setIsLinked] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"profile" | "portfolio" | "tracker" | "assessment" | "recommendations">("profile");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam && ["profile", "portfolio", "tracker", "assessment", "recommendations"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, []);

  // Assessment Runner State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const questionnaire = mockSkillQuestionnaires[0];

  const handleLinkInstitute = (instName: string, enrollmentId: string) => {
    setIsLinked(true);
    setProfile((prev) => ({
      ...prev,
      instituteLink: {
        instituteName: instName,
        enrollmentId: enrollmentId,
        status: "VERIFIED",
        linkedDate: new Date().toISOString().split("T")[0],
        verifiedBy: "Registrar Office",
      },
    }));
  };

  const handleRecommendationAction = (item: RecommendationItem) => {
    alert(`Successfully applied / enrolled for ${item.title} at ${item.organization}!`);
  };

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx });
  };

  const handleSubmitAssessment = () => {
    setAssessmentSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black pb-24">
      {/* Top Header */}
      <div className="border-b-4 border-black bg-white sticky top-0 z-30 shadow-[0_4px_0px_0px_#000]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button className="font-black uppercase tracking-wider bg-white text-black border-4 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-slate-100 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-none text-xs gap-2">
                <ArrowLeft className="size-4 stroke-[3]" />
                Home
              </Button>
            </Link>
            <div className="size-12 rounded-none bg-[#FF6B6B] border-4 border-black text-black flex items-center justify-center font-black shadow-[3px_3px_0px_0px_#000]">
              <User className="size-6 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black uppercase tracking-tight">Student & Learner Portal</h1>
                <Badge className="bg-[#FFD93D] text-black border-2 border-black text-[10px] font-black rounded-none">
                  Verified Learner
                </Badge>
              </div>
              <p className="text-xs font-bold text-slate-600">
                Manage academic portfolio, diagnostic skill assessments, unified application tracking, and AI recommendations.
              </p>
            </div>
          </div>

          {/* Test Link Toggle */}
          <div className="flex items-center gap-2 bg-[#FFFDF5] p-2 rounded-none border-4 border-black shadow-[4px_4px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase px-1">Institute Status:</span>
            <button
              onClick={() => setIsLinked(!isLinked)}
              className={`px-3 py-1 rounded-none text-[10px] font-black uppercase border-2 border-black transition-all ${
                isLinked ? "bg-emerald-300 text-black shadow-[2px_2px_0px_0px_#000]" : "bg-[#FF6B6B] text-black shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              {isLinked ? "Linked & Verified" : "Unlinked (Test Gate)"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 space-y-8">
        {/* Institute Linker Gate / Verification Banner */}
        {!isLinked ? (
          <InstituteLinkerGate isLinked={false} onLinkInstitute={handleLinkInstitute} />
        ) : (
          <div className="space-y-4">
            <VerificationBanner status={profile.status} entityName="Student Profile" />
            <InstituteLinkerGate
              isLinked={true}
              instituteName={profile.instituteLink.instituteName}
              enrollmentId={profile.instituteLink.enrollmentId}
            />
          </div>
        )}

        {/* Tabbed Navigation Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b-4 border-black">
          {[
            { id: "profile", label: "Profile & Academic Manager", icon: User, color: "bg-[#FFD93D]" },
            { id: "portfolio", label: "Verified Digital Portfolio", icon: Code2, color: "bg-[#FF6B6B]" },
            { id: "tracker", label: "Unified Application Tracker", icon: Briefcase, color: "bg-[#C4B5FD]" },
            { id: "assessment", label: "Skill Assessment Engine", icon: Terminal, color: "bg-emerald-300" },
            { id: "recommendations", label: `AI Recommendations (${mockRecommendations.length})`, icon: Sparkles, color: "bg-[#FFD93D]" },
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

        {/* TAB 1: PROFILE & ACADEMIC MANAGER */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
                <CardHeader className="border-b-4 border-black bg-[#FFD93D]">
                  <CardTitle className="text-xl font-black uppercase">Personal & Academic Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider">Institute Enrollment ID</label>
                    <input
                      type="text"
                      value={profile.instituteLink.enrollmentId}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          instituteLink: { ...profile.instituteLink, enrollmentId: e.target.value },
                        })
                      }
                      className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-mono font-bold shadow-[3px_3px_0px_0px_#000]"
                    />
                  </div>

                  <Button
                    className="w-full font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#ff5252] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none"
                    onClick={() => alert("Profile details updated successfully!")}
                  >
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
                <CardHeader className="border-b-4 border-black bg-[#C4B5FD]">
                  <CardTitle className="text-xl font-black uppercase">Verified Skill Badges & Certificates</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {profile.skillExams.map((ex, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black uppercase text-black">{ex.skillName}</h4>
                          <Badge className="bg-[#FFD93D] text-black border-2 border-black text-[10px] font-black rounded-none">
                            {ex.status}
                          </Badge>
                        </div>
                        <p className="text-xs font-bold text-slate-600">
                          Score: <strong className="text-black">{ex.score}%</strong> • Attempts Left: {ex.attemptsLeft}
                        </p>
                      </div>
                      {ex.certifiedBadgeEarned && (
                        <div className="flex items-center gap-1.5 text-xs font-black text-black bg-emerald-300 border-2 border-black px-3 py-1 rounded-none shadow-[2px_2px_0px_0px_#000]">
                          <CheckCircle2 className="size-4 stroke-[3]" />
                          <span>Verified Credential</span>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 2: VERIFIED DIGITAL PORTFOLIO */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            <Card className="rounded-none border-4 border-black bg-white shadow-[12px_12px_0px_0px_#000]">
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b-4 border-black bg-[#FF6B6B]">
                <div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight">Verified Digital Portfolio & Resume Export</CardTitle>
                  <p className="text-sm font-bold text-black mt-1">
                    Public Portfolio URL: <code className="bg-white border-2 border-black px-2 py-0.5 font-mono">https://skillbridge.io/portfolio/{profile.portfolio.customSlug}</code>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    className="font-black uppercase tracking-wider bg-[#FFD93D] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#fcc816] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none text-xs gap-2"
                    onClick={() => alert("Resume exported in Neo-Brutalist Technical Profile format!")}
                  >
                    <Download className="size-4 stroke-[3]" />
                    Export Resume
                  </Button>
                  <Button
                    className="font-black uppercase tracking-wider bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-slate-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none text-xs gap-2"
                    onClick={() => alert("Portfolio shareable link copied to clipboard!")}
                  >
                    <Share2 className="size-4 stroke-[3]" />
                    Share
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="p-4 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[6px_6px_0px_0px_#000] space-y-3">
                  <h4 className="text-sm font-black uppercase">Cryptographic Badge Verification</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockVerifiedPortfolio.verifiedBadges.map((vb, idx) => (
                      <div key={idx} className="p-3 rounded-none border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000] space-y-1">
                        <p className="font-black uppercase text-sm">{vb.badgeName}</p>
                        <p className="text-xs font-bold text-primary">Issued by: {vb.issuedBy}</p>
                        <p className="text-[10px] font-mono text-slate-500 truncate">Hash: {vb.credentialHash}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[6px_6px_0px_0px_#000] space-y-3">
                  <h4 className="text-sm font-black uppercase">Verified Code Repositories</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockVerifiedPortfolio.repositories.map((repo, idx) => (
                      <div key={idx} className="p-3 rounded-none border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000] space-y-1">
                        <p className="font-black uppercase text-sm">{repo.repoName}</p>
                        <p className="text-xs font-bold">Language: {repo.primaryLanguage} • Stars: ⭐ {repo.stars}</p>
                        <p className="text-xs font-bold text-emerald-700">Verified Commits: {repo.verifiedCommitCount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 3: UNIFIED APPLICATION TRACKER */}
        {activeTab === "tracker" && (
          <div className="space-y-6">
            <Card className="rounded-none border-4 border-black bg-white shadow-[12px_12px_0px_0px_#000]">
              <CardHeader className="border-b-4 border-black bg-[#C4B5FD]">
                <CardTitle className="text-2xl font-black uppercase tracking-tight">Unified Application & Project Tracker</CardTitle>
                <p className="text-sm font-bold text-black mt-1">
                  Single dashboard tracking applications across Internships, FDP-linked industry projects, and full-time placements.
                </p>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-none border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden">
                    <div className="flex items-center justify-between border-b-4 border-black bg-[#FFD93D] px-4 py-3">
                      <span className="font-black uppercase text-xs">Internships</span>
                      <Badge className="bg-white text-black border-2 border-black font-black text-[10px] rounded-none">1 ACTIVE</Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="p-3 rounded-none border-2 border-black bg-[#FFFDF5] shadow-[3px_3px_0px_0px_#000] space-y-1.5">
                        <p className="font-black text-sm">Cloud DevOps Intern</p>
                        <p className="text-xs font-bold text-slate-600">NextGen Cloud</p>
                        <Badge className="bg-emerald-300 text-black border border-black text-[10px] font-black rounded-none">Interview Scheduled</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-none border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden">
                    <div className="flex items-center justify-between border-b-4 border-black bg-[#C4B5FD] px-4 py-3">
                      <span className="font-black uppercase text-xs">FDP Projects</span>
                      <Badge className="bg-white text-black border-2 border-black font-black text-[10px] rounded-none">1 ACTIVE</Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="p-3 rounded-none border-2 border-black bg-[#FFFDF5] shadow-[3px_3px_0px_0px_#000] space-y-1.5">
                        <p className="font-black text-sm">AI Research Taskforce</p>
                        <p className="text-xs font-bold text-slate-600">National AI Initiative</p>
                        <Badge className="bg-[#FFD93D] text-black border border-black text-[10px] font-black rounded-none">In Progress</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-none border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden">
                    <div className="flex items-center justify-between border-b-4 border-black bg-[#FF6B6B] px-4 py-3">
                      <span className="font-black uppercase text-xs">Placements</span>
                      <Badge className="bg-white text-black border-2 border-black font-black text-[10px] rounded-none">1 ACTIVE</Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="p-3 rounded-none border-2 border-black bg-[#FFFDF5] shadow-[3px_3px_0px_0px_#000] space-y-1.5">
                        <p className="font-black text-sm">Full-Stack Engineer</p>
                        <p className="text-xs font-bold text-slate-600">Apex Financial</p>
                        <Badge className="bg-emerald-300 text-black border border-black text-[10px] font-black rounded-none">Shortlisted</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 4: SKILL ASSESSMENT ENGINE */}
        {activeTab === "assessment" && (
          <Card className="rounded-none border-4 border-black bg-white shadow-[12px_12px_0px_0px_#000]">
            <CardHeader className="border-b-4 border-black bg-emerald-300">
              <CardTitle className="text-2xl font-black uppercase tracking-tight text-black">Skill Assessment & Diagnostic Questionnaire Engine</CardTitle>
              <p className="text-sm font-bold text-black mt-1">
                Interactive technical and soft skill questionnaires generating instant strength/gap breakdowns against industry benchmarks.
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-6 max-w-3xl">
              {!assessmentSubmitted ? (
                <div className="space-y-6">
                  <div className="rounded-none border-4 border-black bg-[#FFFDF5] shadow-[6px_6px_0px_0px_#000] overflow-hidden">
                    <div className="flex items-center justify-between border-b-4 border-black bg-[#FFD93D] px-4 py-3">
                      <span className="font-black uppercase text-xs">Question {currentQuestionIdx + 1} of {questionnaire.totalQuestions}</span>
                      <Badge className="bg-white text-black border-2 border-black font-black text-[10px] rounded-none">{questionnaire.category}</Badge>
                    </div>
                    <div className="p-6 space-y-6">
                      <h3 className="text-lg font-black uppercase text-black">
                        {questionnaire.questions[currentQuestionIdx]?.questionText}
                      </h3>

                      <div className="space-y-3">
                        {questionnaire.questions[currentQuestionIdx]?.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(currentQuestionIdx, optIdx)}
                            className={`w-full text-left p-4 rounded-none border-4 border-black text-xs font-black uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_#000] ${
                              selectedAnswers[currentQuestionIdx] === optIdx
                                ? "bg-[#FFD93D] text-black"
                                : "bg-white hover:bg-slate-100 text-black"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-between pt-4">
                        {currentQuestionIdx > 0 && (
                          <Button
                            className="font-black uppercase tracking-wider bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-none text-xs"
                            onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
                          >
                            Previous
                          </Button>
                        )}
                        {currentQuestionIdx < questionnaire.questions.length - 1 ? (
                          <Button
                            className="font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#ff5252] rounded-none text-xs ml-auto"
                            onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                          >
                            Next Question
                          </Button>
                        ) : (
                          <Button
                            className="font-black uppercase tracking-wider bg-emerald-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-emerald-500 rounded-none text-xs ml-auto"
                            onClick={handleSubmitAssessment}
                          >
                            Submit Assessment
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-none border-4 border-black bg-[#FFFDF5] shadow-[8px_8px_0px_0px_#000] space-y-6 text-center">
                  <h3 className="text-2xl font-black uppercase text-black">Diagnostic Skill Profile Generated! 🎉</h3>
                  <p className="text-sm font-bold text-slate-600">
                    Your assessment results have been benchmarked against live industry demand curves.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="p-4 rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
                      <p className="font-black uppercase text-emerald-700">Top Strengths</p>
                      <p className="text-xs font-bold mt-1">React Server Components, TypeScript Generics, API Architecture (98th percentile)</p>
                    </div>
                    <div className="p-4 rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
                      <p className="font-black uppercase text-[#FF6B6B]">Identified Skill Gaps</p>
                      <p className="text-xs font-bold mt-1">Kubernetes Cluster Networking, Terraform State Management</p>
                    </div>
                  </div>
                  <Button
                    className="font-black uppercase tracking-wider bg-[#FFD93D] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-none"
                    onClick={() => setAssessmentSubmitted(false)}
                  >
                    Retake Assessment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* TAB 5: AI RECOMMENDATIONS */}
        {activeTab === "recommendations" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-black">AI-Driven Personalized Recommendations</h3>
              <p className="text-sm font-bold text-slate-600 mt-1">
                Matched to your verified skill portfolio and diagnostic assessment scores with 94%+ precision.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockRecommendations.map((rec) => (
                <RecommendationCard key={rec.id} item={rec} onAction={handleRecommendationAction} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
