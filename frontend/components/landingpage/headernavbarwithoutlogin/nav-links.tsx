import type { LinkItemType } from "./sheard";
import { UserCog, ShoppingCart, BarChart3, Package, Zap, UsersIcon, StarIcon, HandshakeIcon, FileTextIcon, ShieldIcon, RotateCcwIcon, LeafIcon, HelpCircleIcon, Handshake } from "lucide-react";

export const productLinks: LinkItemType[] = [
	{
		label: "Business Management",
		href: "#",
		description: "Manage teams, roles, multi-branch operations",
		icon: (
			<UserCog
			/>
		),
	},
	{
		label: "Sales & CRM",
		href: "#",
		description: "Track leads, manage customers, close deals faster",
		icon: (
			<Handshake
			/>
		),
	},
	{
		label: "Online Store",
		href: "#",
		description: "Launch store instantly, manage products, orders, payments",
		icon: (
			<ShoppingCart
			/>
		),
	},
	{
		label: "Analytics",
		href: "#",
		description: "Get insights, reports, track business performance",
		icon: (
			<BarChart3
			/>
		),
	},
	{
		label: "Operations",
		href: "#",
		description: "Manage purchases, vendors, inventory, stock operations",
		icon: (
			<Package
			/>
		),
	},
	{
		label: "Automation",
		href: "#",
		description: "Trigger actions, alerts, and workflows automatically",
		icon: (
			<Zap
			/>
		),
	},
];

export const companyLinks: LinkItemType[] = [
	{
		label: "About Us",
		href: "/about",
		description: "Learn more about our story and team",
		icon: (
			<UsersIcon
			/>
		),
	},
	{
		label: "Customer Stories",
		href: "/stories",
		description: "See how we've helped our clients succeed",
		icon: (
			<StarIcon
			/>
		),
	},
	{
		label: "Partnerships",
		href: "#",
		icon: (
			<HandshakeIcon
			/>
		),
		description: "Collaborate with us for mutual growth",
	},
];

export const companyLinks2: LinkItemType[] = [
	{
		label: "Terms of Service",
		href: "/terms",
		icon: (
			<FileTextIcon
			/>
		),
	},
	{
		label: "Privacy Policy",
		href: "/privacypolicy",
		icon: (
			<ShieldIcon
			/>
		),
	},
	{
		label: "Refund Policy",
		href: "/refundpolicy",
		icon: (
			<RotateCcwIcon
			/>
		),
	},
	{
		label: "Blog",
		href: "/blog",
		icon: (
			<LeafIcon
			/>
		),
	},
	{
		label: "Help Center",
		href: "/helps",
		icon: (
			<HelpCircleIcon
			/>
		),
	},
];
