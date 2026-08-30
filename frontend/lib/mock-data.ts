import {
  JobPost,
  CertificationCourse,
  ApplicantInterview,
  VerificationQueueItem,
  SkillGapMetric,
  StudentSelectionMetric,
  StudentProfile,
  AcademicianProfile,
  SkillQuestionnaire,
  VerifiedDigitalPortfolioSchema,
  InstitutionalAnalyticsReport,
  RecommendationItem,
} from "@/types/platform";

export const mockStats = [
  { label: "Active Learners", value: "50,000+", change: "+24% this month" },
  { label: "Partner Universities", value: "500+", change: "Across 18 states" },
  { label: "Hiring Enterprises", value: "1,200+", change: "Tech, Finance & Core" },
  { label: "Placement Rate", value: "94.2%", change: "Verified outcomes" },
];

export const mockSolutions = {
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
    ctaLink: "/dashboard/student",
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
    ctaLink: "/dashboard/institute",
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
    ctaLink: "/dashboard/industry",
    previewHeader: "Recruiter Portal • Enterprise Talent Pipeline",
    previewSkills: ["Full-Stack", "Cloud & DevOps", "Data Science", "Embedded Systems"],
    previewScore: "Average Time-to-Hire: 6 Days",
  },
};

export const mockFeatures = [
  {
    title: "Live Industry Projects",
    description: "Tackle verified project challenges designed directly by tech leads and product architects from top firms.",
    tag: "Hands-on",
  },
  {
    title: "AI-Powered Skill Mapping",
    description: "Intelligent career path algorithms match learner skills with real-time job market requirements.",
    tag: "AI Tech",
  },
  {
    title: "Cohort & Placement Analytics",
    description: "Deep statistical dashboards for colleges to track skill acquisition, project submissions, and hiring rates.",
    tag: "Insights",
  },
  {
    title: "Verified Competency Badges",
    description: "Cryptographically verified credentials that recruiters can validate with a single click.",
    tag: "Verifiable",
  },
  {
    title: "Automated Evaluation Engine",
    description: "Instant feedback with automated test suites, code quality analysis, and benchmark scoring.",
    tag: "Speed",
  },
  {
    title: "Multi-Campus Management",
    description: "Role-based access control to manage thousands of students, faculty advisors, and enterprise partners.",
    tag: "Scalable",
  },
];

export const mockTestimonials = [
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

export const mockJobPosts: JobPost[] = [
  {
    id: "job-1",
    title: "Full-Stack Engineer",
    companyName: "Apex Financial",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$120k - $150k",
    skillsRequired: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    description: "Build high-throughput fintech dashboard services with rigorous test coverage and secure API endpoints.",
    status: "VERIFIED",
    applicantsCount: 42,
    postedDate: "2026-02-15",
  },
  {
    id: "job-2",
    title: "Cloud DevOps Intern",
    companyName: "NextGen Cloud",
    location: "Bangalore, India",
    type: "Internship",
    salaryRange: "$40k / yr",
    skillsRequired: ["AWS", "Docker", "Kubernetes", "Terraform"],
    description: "Automate CI/CD pipelines, monitor microservices infrastructure, and optimize deployment speeds.",
    status: "VERIFIED",
    applicantsCount: 88,
    postedDate: "2026-02-20",
  },
  {
    id: "job-3",
    title: "AI Research Engineer",
    companyName: "DataPulse Systems",
    location: "San Francisco, CA",
    type: "Full-time",
    salaryRange: "$160k - $210k",
    skillsRequired: ["Python", "PyTorch", "FastAPI", "LLMs"],
    description: "Develop retrieval-augmented generation pipelines and fine-tune open-source transformer models.",
    status: "PENDING",
    applicantsCount: 15,
    postedDate: "2026-02-26",
  },
];

export const mockCertificationCourses: CertificationCourse[] = [
  {
    id: "course-1",
    title: "Advanced System Architecture & Microservices",
    provider: "SkillBridge Engineering Board",
    category: "Backend & Cloud",
    badgeType: "Paid",
    durationWeeks: 8,
    enrolledCount: 1420,
    rating: 4.9,
    status: "VERIFIED",
  },
  {
    id: "course-2",
    title: "Modern React & Next.js Production Patterns",
    provider: "Vercel Ecosystem Partners",
    category: "Frontend",
    badgeType: "Free",
    durationWeeks: 4,
    enrolledCount: 4500,
    rating: 4.8,
    status: "VERIFIED",
  },
  {
    id: "course-3",
    title: "Applied Machine Learning Pipelines",
    provider: "AI Labs Global",
    category: "Data Science",
    badgeType: "Paid",
    durationWeeks: 10,
    enrolledCount: 890,
    rating: 4.7,
    status: "PENDING",
  },
];

export const mockApplicantInterviews: ApplicantInterview[] = [
  {
    id: "int-1",
    applicantId: "stu-1",
    applicantName: "Rahul Sharma",
    applicantEmail: "rahul.s@university.edu",
    roleApplied: "Full-Stack Engineer",
    meetingPlatform: "Zoom",
    meetingLink: "https://zoom.us/j/1234567890?pwd=mockpassword",
    scheduledAt: "2026-03-05T10:00:00Z",
    status: "SCHEDULED",
  },
  {
    id: "int-2",
    applicantId: "stu-2",
    applicantName: "Ananya Patel",
    applicantEmail: "ananya.p@college.edu",
    roleApplied: "Cloud DevOps Intern",
    meetingPlatform: "Google Meet",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    scheduledAt: "2026-02-18T14:30:00Z",
    status: "COMPLETED",
    rejectionFeedback: {
      reason: "Needs stronger proficiency in Kubernetes container orchestration and Terraform state management.",
      areasForImprovement: ["K8s cluster networking", "Terraform modules", "CI/CD security scan integration"],
      reviewedBy: "Siddharth Rao (Engineering Manager)",
      reviewedAt: "2026-02-19T11:00:00Z",
    },
  },
];

export const mockVerificationQueue: VerificationQueueItem[] = [
  {
    id: "vq-1",
    studentName: "Aditya Verma",
    studentEmail: "aditya.v@univ.ac.in",
    enrollmentNumber: "ENG2026049",
    department: "Computer Science & Engineering",
    batchYear: "2026",
    documentType: "Transcript",
    status: "PENDING",
    submittedAt: "2026-02-25T08:30:00Z",
  },
  {
    id: "vq-2",
    studentName: "Sneha Iyer",
    studentEmail: "sneha.i@univ.ac.in",
    enrollmentNumber: "ENG2026082",
    department: "Information Technology",
    batchYear: "2026",
    documentType: "Project Certificate",
    status: "VERIFIED",
    submittedAt: "2026-02-22T14:15:00Z",
  },
];

export const mockSkillGapMetrics: SkillGapMetric[] = [
  {
    skillName: "Kubernetes & Docker",
    industryDemandPercentage: 88,
    studentProficiencyPercentage: 54,
    gapSeverity: "Critical",
    recommendedAction: "Integrate containerization lab modules into Semester 6 curriculum.",
  },
  {
    skillName: "Next.js & TypeScript",
    industryDemandPercentage: 92,
    studentProficiencyPercentage: 78,
    gapSeverity: "Moderate",
    recommendedAction: "Conduct weekend hackathons focused on full-stack TypeScript apps.",
  },
  {
    skillName: "SQL & Query Optimization",
    industryDemandPercentage: 85,
    studentProficiencyPercentage: 81,
    gapSeverity: "Low",
    recommendedAction: "Maintain existing database lab benchmarks.",
  },
];

export const mockStudentSelectionMetrics: StudentSelectionMetric[] = [
  {
    department: "Computer Science & Engineering",
    totalStudents: 320,
    placedStudents: 298,
    averagePackage: "$18.5k / yr",
    topRecruiters: ["Apex Financial", "CloudScale", "DataPulse"],
    placementRate: 93.1,
  },
  {
    department: "Information Technology",
    totalStudents: 210,
    placedStudents: 195,
    averagePackage: "$16.2k / yr",
    topRecruiters: ["NextGen Cloud", "InnoTech", "Alpha Solutions"],
    placementRate: 92.8,
  },
];

export const mockStudentProfile: StudentProfile = {
  id: "stu-1",
  fullName: "Rahul Sharma",
  email: "rahul.sharma@skillbridge.io",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  role: "student",
  status: "VERIFIED",
  instituteLink: {
    instituteName: "National Institute of Technology",
    enrollmentId: "CS-2023-401",
    status: "VERIFIED",
    linkedDate: "2023-08-15",
    verifiedBy: "Dr. Ananya Sharma (Dean)",
  },
  courses: [
    {
      courseId: "course-1",
      courseTitle: "Advanced System Architecture & Microservices",
      provider: "SkillBridge Engineering Board",
      progressPercentage: 75,
      currentModule: "Module 4: Event-Driven Kafka Messaging",
      badgeType: "Paid",
      completed: false,
    },
    {
      courseId: "course-2",
      courseTitle: "Modern React & Next.js Production Patterns",
      provider: "Vercel Ecosystem Partners",
      progressPercentage: 100,
      currentModule: "Final Capstone Submitted",
      badgeType: "Free",
      completed: true,
    },
  ],
  appliedJobs: [
    {
      jobId: "job-1",
      title: "Full-Stack Engineer",
      companyName: "Apex Financial",
      appliedDate: "2026-02-20",
      status: "Interview Scheduled",
      interviewDetails: mockApplicantInterviews[0],
    },
  ],
  portfolio: {
    isPublic: true,
    customSlug: "rahul-sharma-eng",
    bio: "Full-stack developer passionate about building scalable web applications and distributed systems.",
    featuredProjects: [
      {
        title: "Distributed Task Scheduler",
        description: "Built a fault-tolerant task queue in Node.js with Redis backplane and real-time WebSocket updates.",
        techStack: ["Node.js", "Redis", "TypeScript", "WebSockets"],
        demoUrl: "https://task-scheduler-demo.io",
        githubUrl: "https://github.com/mockuser/task-scheduler",
      },
    ],
    verifiedBadgesCount: 5,
  },
  skillExams: [
    {
      skillName: "TypeScript Advanced",
      examId: "ex-1",
      status: "PASSED",
      score: 96,
      attemptsLeft: 2,
      certifiedBadgeEarned: true,
    },
    {
      skillName: "AWS Cloud Architect",
      examId: "ex-2",
      status: "IN_PROGRESS",
      attemptsLeft: 3,
      certifiedBadgeEarned: false,
    },
  ],
};

// --- Academician / Faculty Role Mock Data (Problem Statement 26044) ---
export const mockAcademicianProfile: AcademicianProfile = {
  id: "fac-1",
  fullName: "Dr. Rajesh Kumar",
  email: "rajesh.kumar@nit.edu.in",
  department: "Computer Science & Engineering",
  designation: "Professor & Head of R&D",
  role: "academician",
  status: "VERIFIED",
  fdpParticipations: [
    {
      id: "fdp-1",
      title: "AI & Generative Models in Higher Education",
      organizer: "National AI Taskforce & SkillBridge",
      durationDays: 5,
      mode: "Hybrid",
      status: "VERIFIED",
    },
    {
      id: "fdp-2",
      title: "Advanced Cloud Infrastructure & DevSecOps",
      organizer: "CloudScale Academy",
      durationDays: 3,
      mode: "Online",
      status: "VERIFIED",
    },
  ],
  consultancyProjects: [
    {
      id: "cons-1",
      title: "Automated Fraud Detection for Fintech Gateway",
      sponsoringCompany: "Apex Financial",
      budget: "$45,000",
      requiredExpertise: ["Machine Learning", "Python", "Anomaly Detection"],
      deadline: "2026-06-30",
    },
  ],
  researchProjects: [
    {
      id: "res-1",
      title: "Zero-Trust Microservices Architecture in Distributed Clouds",
      researchDomain: "Cloud Computing & Cybersecurity",
      industryPartner: "NextGen Cloud",
      academicLead: "Dr. Rajesh Kumar",
      status: "ACTIVE",
    },
  ],
};

// --- Skill Assessment Questionnaire Engine Mock Data ---
export const mockSkillQuestionnaires: SkillQuestionnaire[] = [
  {
    id: "q-1",
    title: "Advanced TypeScript & React Server Components Diagnostic",
    category: "Technical",
    totalQuestions: 10,
    passingScorePercent: 80,
    questions: [
      {
        questionText: "What is the primary benefit of React Server Components (RSCs)?",
        options: [
          "Zero bundle size for server-executed code and direct backend access",
          "Faster client-side state management",
          "Automatic CSS minification",
          "Elimination of TypeScript compilation",
        ],
        correctAnswerIndex: 0,
      },
      {
        questionText: "How do Server Actions handle data mutations in Next.js?",
        options: [
          "Via synchronous XMLHttpRequests",
          "As asynchronous functions executed on the server that can revalidate cache",
          "Through client-side WebSockets exclusively",
          "By bypassing database connections",
        ],
        correctAnswerIndex: 1,
      },
    ],
  },
];

// --- Verified Digital Portfolio Schema Mock Data ---
export const mockVerifiedPortfolio: VerifiedDigitalPortfolioSchema = {
  portfolioId: "port-101",
  ownerName: "Rahul Sharma",
  verifiedBadges: [
    {
      badgeName: "TypeScript Advanced Specialist",
      issuedBy: "SkillBridge Board of Certification",
      issuedDate: "2026-01-15",
      credentialHash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1a",
    },
    {
      badgeName: "Cloud DevOps Practitioner",
      issuedBy: "NextGen Cloud Academy",
      issuedDate: "2026-02-10",
      credentialHash: "0x3a91c2856ee2bc44a81eb09238c2d54eec1b3f2",
    },
  ],
  repositories: [
    {
      repoName: "distributed-task-queue",
      stars: 124,
      primaryLanguage: "TypeScript",
      verifiedCommitCount: 142,
    },
    {
      repoName: "ai-rag-pipeline",
      stars: 89,
      primaryLanguage: "Python",
      verifiedCommitCount: 96,
    },
  ],
  resumeExportConfig: {
    templateName: "Neo-Brutalist Technical Profile",
    includeBadges: true,
    includeProjects: true,
    customSummary: "High-performing full-stack software engineer with verified project credentials and 98% benchmark score.",
  },
};

// --- Institutional & Policy Analytics Mock Data ---
export const mockInstitutionalAnalytics: InstitutionalAnalyticsReport = {
  totalEnrolled: 4250,
  placementReadinessScore: 91.4,
  recruitmentOutcomes: [
    { sector: "Fintech & Banking", hireCount: 420, averageCTC: "$19,500" },
    { sector: "Cloud & DevOps", hireCount: 310, averageCTC: "$17,800" },
    { sector: "AI & Data Science", hireCount: 250, averageCTC: "$22,000" },
    { sector: "Core Engineering", hireCount: 180, averageCTC: "$15,000" },
  ],
  regionalSkillDemandTrends: [
    { region: "Bangalore Tech Corridor", topSkill: "Kubernetes & Docker", demandGrowthPercentage: 38 },
    { region: "Silicon Valley Remote", topSkill: "Next.js & TypeScript", demandGrowthPercentage: 45 },
    { region: "Financial District (NY/LDN)", topSkill: "Distributed Microservices", demandGrowthPercentage: 31 },
  ],
};

export const mockRecommendations: RecommendationItem[] = [
  {
    id: "rec-1",
    entityType: "job",
    title: "Full-Stack Engineer",
    organization: "Apex Financial",
    matchScore: 98,
    badgeType: "Paid",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    description: "Direct match based on your 96% score in TypeScript Advanced and verified project portfolio.",
    ctaText: "Apply with 1-Click",
  },
  {
    id: "rec-2",
    entityType: "course",
    title: "Advanced System Architecture & Microservices",
    organization: "SkillBridge Engineering Board",
    matchScore: 94,
    badgeType: "Paid",
    tags: ["System Design", "Kafka", "Docker"],
    description: "Recommended to bridge your gap in distributed system design for senior engineering roles.",
    ctaText: "Enroll Now",
  },
  {
    id: "rec-3",
    entityType: "internship",
    title: "Cloud DevOps Intern",
    organization: "NextGen Cloud",
    matchScore: 91,
    badgeType: "Free",
    tags: ["AWS", "Docker", "Terraform"],
    description: "Gain hands-on experience in production CI/CD pipelines with mentorship from lead architects.",
    ctaText: "View Details",
  },
  {
    id: "rec-4",
    entityType: "consultancy",
    title: "Automated Fraud Detection for Fintech Gateway",
    organization: "Apex Financial",
    matchScore: 96,
    badgeType: "Paid",
    tags: ["Machine Learning", "Python", "Fintech"],
    description: "Faculty consultancy opportunity matching your research domain in AI and security.",
    ctaText: "Apply for Consultancy",
  },
  {
    id: "rec-5",
    entityType: "fdp",
    title: "AI & Generative Models in Higher Education",
    organization: "National AI Taskforce",
    matchScore: 99,
    badgeType: "Free",
    tags: ["Generative AI", "Curriculum Design", "Higher Ed"],
    description: "Faculty Development Program designed to align institutional curriculum with generative AI trends.",
    ctaText: "Register for FDP",
  },
];
