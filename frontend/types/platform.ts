export type UserRole = "industry" | "institute" | "student" | "academician";

export type PlatformStatus = "PENDING" | "VERIFIED" | "REJECTED";

// --- Industry Interfaces ---
export interface ApplicantInterview {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  roleApplied: string;
  meetingPlatform: "Zoom" | "Google Meet" | "Microsoft Teams";
  meetingLink: string;
  scheduledAt: string; // ISO date string
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  rejectionFeedback?: {
    reason: string;
    areasForImprovement: string[];
    reviewedBy: string;
    reviewedAt: string;
  };
}

export interface JobPost {
  id: string;
  title: string;
  companyName: string;
  location: string;
  type: "Full-time" | "Internship" | "Contract";
  salaryRange: string;
  skillsRequired: string[];
  description: string;
  status: PlatformStatus;
  applicantsCount: number;
  postedDate: string;
}

export interface CertificationCourse {
  id: string;
  title: string;
  provider: string;
  category: string;
  badgeType: "Paid" | "Free";
  durationWeeks: number;
  enrolledCount: number;
  rating: number;
  status: PlatformStatus;
}

// --- Institute Interfaces ---
export interface VerificationQueueItem {
  id: string;
  studentName: string;
  studentEmail: string;
  enrollmentNumber: string;
  department: string;
  batchYear: string;
  documentType: "Transcript" | "Project Certificate" | "Identity Proof";
  status: PlatformStatus;
  submittedAt: string;
}

export interface SkillGapMetric {
  skillName: string;
  industryDemandPercentage: number;
  studentProficiencyPercentage: number;
  gapSeverity: "Critical" | "Moderate" | "Low";
  recommendedAction: string;
}

export interface StudentSelectionMetric {
  department: string;
  totalStudents: number;
  placedStudents: number;
  averagePackage: string;
  topRecruiters: string[];
  placementRate: number;
}

// --- Student Interfaces ---
export interface InstituteLinkStatus {
  instituteName: string;
  enrollmentId: string;
  status: PlatformStatus;
  linkedDate: string;
  verifiedBy: string;
}

export interface CourseProgress {
  courseId: string;
  courseTitle: string;
  provider: string;
  progressPercentage: number;
  currentModule: string;
  badgeType: "Paid" | "Free";
  completed: boolean;
}

export interface AppliedJob {
  jobId: string;
  title: string;
  companyName: string;
  appliedDate: string;
  status: "Under Review" | "Interview Scheduled" | "Offered" | "Rejected";
  interviewDetails?: ApplicantInterview;
}

export interface DigitalPortfolioSettings {
  isPublic: boolean;
  customSlug: string;
  bio: string;
  featuredProjects: {
    title: string;
    description: string;
    techStack: string[];
    demoUrl?: string;
    githubUrl?: string;
  }[];
  verifiedBadgesCount: number;
}

export interface SkillExamState {
  skillName: string;
  examId: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "PASSED" | "FAILED";
  score?: number;
  attemptsLeft: number;
  certifiedBadgeEarned: boolean;
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  status: PlatformStatus;
  instituteLink: InstituteLinkStatus;
  courses: CourseProgress[];
  appliedJobs: AppliedJob[];
  portfolio: DigitalPortfolioSettings;
  skillExams: SkillExamState[];
}

// --- Academician & Faculty Interfaces (Problem Statement 26044) ---
export interface FacultyDevelopmentProgram {
  id: string;
  title: string;
  organizer: string;
  durationDays: number;
  mode: "Online" | "Hybrid" | "In-Person";
  status: PlatformStatus;
}

export interface ConsultancyOpportunity {
  id: string;
  title: string;
  sponsoringCompany: string;
  budget: string;
  requiredExpertise: string[];
  deadline: string;
}

export interface JointResearchProject {
  id: string;
  title: string;
  researchDomain: string;
  industryPartner: string;
  academicLead: string;
  status: "PROPOSED" | "ACTIVE" | "COMPLETED";
}

export interface AcademicianProfile {
  id: string;
  fullName: string;
  email: string;
  department: string;
  designation: string;
  role: UserRole;
  status: PlatformStatus;
  fdpParticipations: FacultyDevelopmentProgram[];
  consultancyProjects: ConsultancyOpportunity[];
  researchProjects: JointResearchProject[];
}

// --- Skill Assessment Questionnaire Engine ---
export interface AssessmentQuestion {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface SkillQuestionnaire {
  id: string;
  title: string;
  category: "Technical" | "Soft Skill" | "Domain Specific";
  totalQuestions: number;
  passingScorePercent: number;
  questions: AssessmentQuestion[];
}

export interface SkillDiagnosticProfile {
  profileId: string;
  evaluatedSkills: {
    skillName: string;
    score: number;
    benchmarkDelta: number;
  }[];
  gapAnalysisNotes: string;
}

// --- Verified Digital Portfolio Schema ---
export interface VerifiedBadge {
  badgeName: string;
  issuedBy: string;
  issuedDate: string;
  credentialHash: string;
}

export interface CodeRepository {
  repoName: string;
  stars: number;
  primaryLanguage: string;
  verifiedCommitCount: number;
}

export interface ResumeExportConfig {
  templateName: string;
  includeBadges: boolean;
  includeProjects: boolean;
  customSummary: string;
}

export interface VerifiedDigitalPortfolioSchema {
  portfolioId: string;
  ownerName: string;
  verifiedBadges: VerifiedBadge[];
  repositories: CodeRepository[];
  resumeExportConfig: ResumeExportConfig;
}

// --- Institutional & Policy Analytics ---
export interface RecruitmentOutcomeSector {
  sector: string;
  hireCount: number;
  averageCTC: string;
}

export interface RegionalSkillDemandTrend {
  region: string;
  topSkill: string;
  demandGrowthPercentage: number;
}

export interface InstitutionalAnalyticsReport {
  totalEnrolled: number;
  placementReadinessScore: number;
  recruitmentOutcomes: RecruitmentOutcomeSector[];
  regionalSkillDemandTrends: RegionalSkillDemandTrend[];
}

// --- Recommendations Interfaces ---
export type RecommendationEntityType = "job" | "internship" | "course" | "challenge" | "consultancy" | "fdp";

export interface RecommendationItem {
  id: string;
  entityType: RecommendationEntityType;
  title: string;
  organization: string;
  matchScore: number; // e.g. 96 for 96%
  badgeType: "Paid" | "Free";
  tags: string[];
  description: string;
  ctaText: string;
}
