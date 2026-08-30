import type { LinkItemType } from "./sheard";
import { Brain, Briefcase, Handshake, BarChart3, Users, GraduationCap, Building2, BookOpen } from "lucide-react";

export const platformModuleLinks: LinkItemType[] = [
	{
		label: "Skill Mapping & Assessment",
		href: "/dashboard/student?tab=assessment",
		description: "Technical/soft skill questionnaires, diagnostic profiles, and gap analysis.",
		icon: <Brain className="size-5" />,
	},
	{
		label: "Internship & Placement Hub",
		href: "/dashboard/industry?tab=jobs",
		description: "Centralized listings, application tracking, and verified digital portfolios.",
		icon: <Briefcase className="size-5" />,
	},
	{
		label: "Academia–Industry Collaboration",
		href: "/dashboard/academician?tab=consultancy",
		description: "FDPs, faculty internships, live projects, guest lectures, and consultancy.",
		icon: <Handshake className="size-5" />,
	},
	{
		label: "Institutional Analytics",
		href: "/dashboard/institute?tab=metrics",
		description: "Student skill readiness dashboards, placement outcomes, and industry trends.",
		icon: <BarChart3 className="size-5" />,
	},
];

export const userPortalLinks: LinkItemType[] = [
	{
		label: "Student Portal",
		href: "/dashboard/student",
		description: "Portfolio builder, skill exams, job applications, and progress trackers.",
		icon: <Users className="size-5" />,
	},
	{
		label: "Industry Portal",
		href: "/dashboard/industry",
		description: "Post jobs, publish courses, manage applicant interviews and feedback.",
		icon: <Building2 className="size-5" />,
	},
	{
		label: "Institute Admin Portal",
		href: "/dashboard/institute",
		description: "Student verification queue, skill gap analytics, and placement metrics.",
		icon: <GraduationCap className="size-5" />,
	},
	{
		label: "Academician & Faculty Portal",
		href: "/dashboard/academician",
		description: "Track cohort performance and collaborate on industry project reviews.",
		icon: <BookOpen className="size-5" />,
	},
];
