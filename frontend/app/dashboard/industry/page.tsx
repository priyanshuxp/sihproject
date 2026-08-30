"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VerificationBanner } from "@/components/platform/VerificationBanner";
import { PlatformStatus, JobPost, CertificationCourse, ApplicantInterview } from "@/types/platform";
import { mockJobPosts, mockCertificationCourses, mockApplicantInterviews, mockStudentProfile } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Briefcase,
  BookOpen,
  Users,
  CalendarCheck,
  Plus,
  Search,
  ExternalLink,
  CheckCircle2,
  XCircle,
  FileText,
  Building2,
  Sparkles,
  Award,
  ArrowLeft,
} from "lucide-react";

export default function IndustryPortalDashboard() {
  const [platformStatus, setPlatformStatus] = useState<PlatformStatus>("VERIFIED");
  const [activeTab, setActiveTab] = useState<"jobs" | "courses" | "candidates" | "interviews">("jobs");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam && ["jobs", "courses", "candidates", "interviews"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, []);

  // State lists
  const [jobs, setJobs] = useState<JobPost[]>(mockJobPosts);
  const [courses, setCourses] = useState<CertificationCourse[]>(mockCertificationCourses);
  const [interviews, setInterviews] = useState<ApplicantInterview[]>(mockApplicantInterviews);

  // New Job Form State
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobType, setNewJobType] = useState<"Full-time" | "Internship" | "Contract">("Full-time");
  const [newJobSalary, setNewJobSalary] = useState("");
  const [newJobSkills, setNewJobSkills] = useState("");
  const [newJobDesc, setNewJobDesc] = useState("");

  // New Course Form State
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("");
  const [newCourseBadge, setNewCourseBadge] = useState<"Paid" | "Free">("Paid");
  const [newCourseDuration, setNewCourseDuration] = useState("6");

  // Candidate Search State
  const [candidateSearch, setCandidateSearch] = useState("");

  // Interview & Feedback State
  const [selectedInterviewId, setSelectedInterviewId] = useState<string>(interviews[0]?.id || "");
  const [zoomLinkInput, setZoomLinkInput] = useState("");
  const [rejectionReasonInput, setRejectionReasonInput] = useState("");
  const [improvementAreasInput, setImprovementAreasInput] = useState("");

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;
    const created: JobPost = {
      id: `job-${Date.now()}`,
      title: newJobTitle,
      companyName: "Apex Financial",
      location: "Remote",
      type: newJobType,
      salaryRange: newJobSalary || "$100k - $140k",
      skillsRequired: newJobSkills ? newJobSkills.split(",").map((s) => s.trim()) : ["React", "Node.js"],
      description: newJobDesc || "Build scalable web applications and microservices.",
      status: platformStatus,
      applicantsCount: 0,
      postedDate: new Date().toISOString().split("T")[0],
    };
    setJobs([created, ...jobs]);
    setNewJobTitle("");
    setNewJobSalary("");
    setNewJobSkills("");
    setNewJobDesc("");
    alert("Job post published successfully!");
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    const created: CertificationCourse = {
      id: `course-${Date.now()}`,
      title: newCourseTitle,
      provider: "Apex Enterprise Academy",
      category: newCourseCategory || "Full-Stack Engineering",
      badgeType: newCourseBadge,
      durationWeeks: parseInt(newCourseDuration) || 6,
      enrolledCount: 0,
      rating: 5.0,
      status: platformStatus,
    };
    setCourses([created, ...courses]);
    setNewCourseTitle("");
    setNewCourseCategory("");
    alert("Certification course published successfully!");
  };

  const handleAttachInterviewLink = (interviewId: string) => {
    if (!zoomLinkInput.trim()) return;
    setInterviews((prev) =>
      prev.map((item) =>
        item.id === interviewId
          ? { ...item, meetingLink: zoomLinkInput, status: "SCHEDULED" as const }
          : item
      )
    );
    setZoomLinkInput("");
    alert("Interview meeting link attached successfully!");
  };

  const handleSubmitRejectionFeedback = (interviewId: string) => {
    if (!rejectionReasonInput.trim()) return;
    setInterviews((prev) =>
      prev.map((item) =>
        item.id === interviewId
          ? {
              ...item,
              status: "COMPLETED" as const,
              rejectionFeedback: {
                reason: rejectionReasonInput,
                areasForImprovement: improvementAreasInput
                  ? improvementAreasInput.split(",").map((s) => s.trim())
                  : ["Algorithm Optimization", "System Architecture"],
                reviewedBy: "Enterprise Hiring Lead",
                reviewedAt: new Date().toISOString(),
              },
            }
          : item
      )
    );
    setRejectionReasonInput("");
    setImprovementAreasInput("");
    alert("Structured rejection feedback submitted to candidate!");
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
            <div className="size-12 rounded-none bg-[#C4B5FD] border-4 border-black text-black flex items-center justify-center font-black shadow-[3px_3px_0px_0px_#000]">
              <Building2 className="size-6 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black uppercase tracking-tight">Enterprise & Industry Portal</h1>
                <Badge className="bg-[#FFD93D] text-black border-2 border-black text-[10px] font-black rounded-none">
                  Recruiter Mode
                </Badge>
              </div>
              <p className="text-xs font-bold text-slate-600">
                Manage job listings, certified training modules, candidate registries, and live interviews.
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
          entityName="Apex Financial Enterprises"
          onResubmit={() => {
            setPlatformStatus("PENDING");
            alert("Registration data re-submitted for verification review!");
          }}
        />

        {/* Tabbed Navigation Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b-4 border-black">
          {[
            { id: "jobs", label: `Post Job / Internship (${jobs.length})`, icon: Briefcase, color: "bg-[#FF6B6B]" },
            { id: "courses", label: `Certification Courses (${courses.length})`, icon: BookOpen, color: "bg-[#FFD93D]" },
            { id: "candidates", label: "Candidate Search", icon: Users, color: "bg-[#C4B5FD]" },
            { id: "interviews", label: `Applicant Interviews (${interviews.length})`, icon: CalendarCheck, color: "bg-emerald-300" },
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

        {/* TAB 1: JOBS */}
        {activeTab === "jobs" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
                <CardHeader className="border-b-4 border-black bg-[#FFD93D]">
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                    <Plus className="size-5 stroke-[3]" />
                    Create New Job Post
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleCreateJob} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider">Role Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Senior Backend Architect"
                        value={newJobTitle}
                        onChange={(e) => setNewJobTitle(e.target.value)}
                        className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider">Type</label>
                        <select
                          value={newJobType}
                          onChange={(e) => setNewJobType(e.target.value as any)}
                          className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Internship">Internship</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider">Salary / Stipend</label>
                        <input
                          type="text"
                          placeholder="e.g. $130k - $160k"
                          value={newJobSalary}
                          onChange={(e) => setNewJobSalary(e.target.value)}
                          className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider">Required Skills (Comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. Node.js, PostgreSQL, Docker"
                        value={newJobSkills}
                        onChange={(e) => setNewJobSkills(e.target.value)}
                        className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider">Description</label>
                      <textarea
                        rows={3}
                        placeholder="Detail the core responsibilities..."
                        value={newJobDesc}
                        onChange={(e) => setNewJobDesc(e.target.value)}
                        className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold resize-none shadow-[3px_3px_0px_0px_#000]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#ff5252] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none gap-2"
                    >
                      <Plus className="size-4 stroke-[3]" />
                      Publish Job Listing
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider">Active Listings ({jobs.length})</h3>
              <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-[#C4B5FD] text-black border-2 border-black text-[10px] font-black rounded-none">
                          {job.type} • {job.location}
                        </Badge>
                        <Badge className="bg-emerald-300 text-black border-2 border-black text-[10px] font-black rounded-none">
                          {job.status}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-lg font-black uppercase text-black">{job.title}</h4>
                        <p className="text-xs font-bold text-slate-600 mt-0.5">{job.companyName} • {job.salaryRange}</p>
                      </div>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">{job.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.skillsRequired.map((sk, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-none bg-[#FFFDF5] text-[10px] font-black uppercase text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                            {sk}
                          </span>
                        ))}
                      </div>
                      <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs font-bold">
                        <span>Applicants: <strong className="text-black">{job.applicantsCount}</strong></span>
                        <span>Posted: {job.postedDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COURSES */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <Card className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
                <CardHeader className="border-b-4 border-black bg-[#FFD93D]">
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                    <Award className="size-5 stroke-[3]" />
                    Publish Certification Course
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleCreateCourse} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider">Course Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Enterprise Cloud Security"
                        value={newCourseTitle}
                        onChange={(e) => setNewCourseTitle(e.target.value)}
                        className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider">Category</label>
                      <input
                        type="text"
                        placeholder="e.g. Cloud & DevOps"
                        value={newCourseCategory}
                        onChange={(e) => setNewCourseCategory(e.target.value)}
                        className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider">Badge Tier</label>
                        <select
                          value={newCourseBadge}
                          onChange={(e) => setNewCourseBadge(e.target.value as any)}
                          className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                        >
                          <option value="Paid">Paid ($)</option>
                          <option value="Free">Free</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider">Duration (Weeks)</label>
                        <input
                          type="number"
                          min="1"
                          max="52"
                          value={newCourseDuration}
                          onChange={(e) => setNewCourseDuration(e.target.value)}
                          className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#ff5252] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none gap-2"
                    >
                      <Sparkles className="size-4 stroke-[3]" />
                      Publish Course Program
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider">Sponsored Courses ({courses.length})</h3>
              <div className="grid grid-cols-1 gap-4">
                {courses.map((course) => (
                  <Card key={course.id} className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-[#C4B5FD] text-black border-2 border-black text-[10px] font-black rounded-none">
                          {course.category} • {course.durationWeeks} Weeks
                        </Badge>
                        <Badge className={`text-[10px] font-black uppercase rounded-none border-2 border-black px-2.5 py-1 ${course.badgeType === "Paid" ? "bg-[#FF6B6B]" : "bg-emerald-300"}`}>
                          {course.badgeType}
                        </Badge>
                      </div>
                      <h4 className="text-lg font-black uppercase text-black">{course.title}</h4>
                      <p className="text-xs font-bold text-slate-600">Offered by {course.provider}</p>
                      <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs font-bold">
                        <span>Enrolled Learners: <strong className="text-black">{course.enrolledCount}</strong></span>
                        <span>Rating: ⭐ {course.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CANDIDATES */}
        {activeTab === "candidates" && (
          <div className="space-y-6">
            <Card className="rounded-none border-4 border-black bg-white shadow-[12px_12px_0px_0px_#000]">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-4 border-black bg-[#FFD93D]">
                <div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight text-black">Student Registry & Talent Pool</CardTitle>
                  <p className="text-sm font-bold text-black mt-1">
                    Search pre-assessed candidates across verified university networks by skill tags and competency scores.
                  </p>
                </div>
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-3.5 size-4 text-black" />
                  <input
                    type="text"
                    placeholder="Search by skill (e.g. Next.js, Python)..."
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                    className="w-full rounded-none border-4 border-black bg-white pl-10 pr-4 py-2.5 text-xs font-bold text-black focus:outline-none shadow-[4px_4px_0px_0px_#000]"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto rounded-none border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                  <Table>
                    <TableHeader className="bg-[#FFFDF5] border-b-4 border-black">
                      <TableRow>
                        <TableHead className="font-black uppercase text-black">Candidate Name</TableHead>
                        <TableHead className="font-black uppercase text-black">Institute & Enrollment</TableHead>
                        <TableHead className="font-black uppercase text-black">Verified Skills & Stack</TableHead>
                        <TableHead className="font-black uppercase text-black">Status</TableHead>
                        <TableHead className="text-right font-black uppercase text-black">Portfolio & Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-[#FFFDF5] border-b-2 border-black">
                        <TableCell className="font-black">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-none bg-[#FF6B6B] border-2 border-black text-black font-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
                              {mockStudentProfile.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="text-black font-black">{mockStudentProfile.fullName}</p>
                              <p className="text-xs font-bold text-slate-600">{mockStudentProfile.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-xs font-black text-black">{mockStudentProfile.instituteLink.instituteName}</p>
                          <p className="text-[10px] font-mono font-bold text-slate-500">{mockStudentProfile.instituteLink.enrollmentId}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {mockStudentProfile.portfolio.featuredProjects[0].techStack.map((st, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-none bg-[#FFFDF5] text-[10px] font-black uppercase text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                                {st}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-300 text-black border-2 border-black text-[10px] font-black uppercase rounded-none px-2.5 py-1">
                            {mockStudentProfile.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            className="font-black uppercase tracking-wider bg-[#FFD93D] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#fcc816] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-none text-xs gap-1.5"
                            onClick={() => alert(`Opening digital portfolio for ${mockStudentProfile.fullName}`)}
                          >
                            <ExternalLink className="size-4 stroke-[3]" />
                            View Portfolio
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 4: INTERVIEWS */}
        {activeTab === "interviews" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider">Active Applicants ({interviews.length})</h3>
              <div className="space-y-3">
                {interviews.map((inv) => (
                  <Card
                    key={inv.id}
                    onClick={() => setSelectedInterviewId(inv.id)}
                    className={`cursor-pointer transition-all rounded-none border-4 border-black ${
                      selectedInterviewId === inv.id ? "bg-[#FFD93D] shadow-[6px_6px_0px_0px_#000]" : "bg-white shadow-[4px_4px_0px_0px_#000] hover:translate-x-1"
                    }`}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black uppercase text-black">{inv.applicantName}</span>
                        <Badge className={`text-[10px] font-black uppercase rounded-none border-2 border-black px-2 py-0.5 ${inv.status === "COMPLETED" ? "bg-[#C4B5FD]" : "bg-emerald-300"}`}>
                          {inv.status}
                        </Badge>
                      </div>
                      <p className="text-xs font-black uppercase text-black">{inv.roleApplied}</p>
                      <p className="text-[11px] font-bold text-slate-600">{inv.applicantEmail}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {(() => {
                const currentInv = interviews.find((i) => i.id === selectedInterviewId) || interviews[0];
                if (!currentInv) return <p className="font-bold">No interview selected.</p>;
                return (
                  <Card className="rounded-none border-4 border-black bg-white shadow-[12px_12px_0px_0px_#000]">
                    <CardHeader className="border-b-4 border-black bg-[#C4B5FD]">
                      <CardTitle className="text-xl font-black uppercase">Manage Interview & Feedback</CardTitle>
                      <p className="text-xs font-bold text-black mt-1">
                        Candidate: <strong className="text-black">{currentInv.applicantName}</strong> ({currentInv.roleApplied})
                      </p>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="rounded-none border-4 border-black bg-[#FFFDF5] p-5 shadow-[6px_6px_0px_0px_#000] space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-black">Attach Interview Link (Zoom / Meet)</h4>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            placeholder="https://zoom.us/j/..."
                            value={zoomLinkInput}
                            onChange={(e) => setZoomLinkInput(e.target.value)}
                            className="flex-1 rounded-none border-4 border-black bg-white px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                          />
                          <Button
                            size="sm"
                            className="font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#ff5252] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-none text-xs"
                            onClick={() => handleAttachInterviewLink(currentInv.id)}
                          >
                            Attach Link
                          </Button>
                        </div>
                        {currentInv.meetingLink && (
                          <div className="text-xs flex items-center gap-2 font-bold pt-1">
                            <span>Active Link:</span>
                            <a href={currentInv.meetingLink} target="_blank" rel="noreferrer" className="underline truncate max-w-xs text-primary font-mono">
                              {currentInv.meetingLink}
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="rounded-none border-4 border-black bg-[#FFFDF5] p-5 shadow-[6px_6px_0px_0px_#000] space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-black">Submit Structured Rejection Feedback</h4>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-black uppercase text-slate-600">Detailed Rejection Reason</label>
                            <textarea
                              rows={2}
                              placeholder="Provide constructive feedback..."
                              value={rejectionReasonInput}
                              onChange={(e) => setRejectionReasonInput(e.target.value)}
                              className="w-full rounded-none border-4 border-black bg-white px-3 py-2 text-xs font-bold resize-none shadow-[3px_3px_0px_0px_#000]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-black uppercase text-slate-600">Areas for Improvement (Comma separated)</label>
                            <input
                              type="text"
                              placeholder="e.g. Asynchronous state, Error boundaries"
                              value={improvementAreasInput}
                              onChange={(e) => setImprovementAreasInput(e.target.value)}
                              className="w-full rounded-none border-4 border-black bg-white px-3 py-2 text-xs font-bold shadow-[3px_3px_0px_0px_#000]"
                            />
                          </div>
                          <Button
                            size="sm"
                            className="font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#ff5252] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none text-xs gap-1.5"
                            onClick={() => handleSubmitRejectionFeedback(currentInv.id)}
                          >
                            <XCircle className="size-4 stroke-[3]" />
                            Submit Rejection & Notes
                          </Button>
                        </div>

                        {currentInv.rejectionFeedback && (
                          <div className="mt-4 p-4 rounded-none border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000] text-xs space-y-1.5">
                            <p className="font-black uppercase text-[#FF6B6B]">Previous Feedback Submitted:</p>
                            <p className="font-bold"><strong>Reason:</strong> {currentInv.rejectionFeedback.reason}</p>
                            <p className="font-bold"><strong>Areas to Improve:</strong> {currentInv.rejectionFeedback.areasForImprovement.join(", ")}</p>
                            <p className="text-[10px] font-mono text-slate-500">Reviewed by: {currentInv.rejectionFeedback.reviewedBy}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
