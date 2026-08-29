"use client";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Logo } from "./logo";
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12H17l-.4 3h-2.7v7A10 10 0 0 0 22 12z"/>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 5.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2zm6.3-.6a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1zM12 9a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/>
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.5 12 4.5 12 4.5s-5.6 0-7.5.6a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.9.6 7.5.6 7.5.6s5.6 0 7.5-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8zM10 15V9l5 3-5 3z"/>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.9 6.5A2.1 2.1 0 1 1 4.8 4.4 2.1 2.1 0 0 1 6.9 6.5zM5 8.5H2.7V21H5zM9 8.5h2.2v1.7h.03a2.4 2.4 0 0 1 2.2-1.2c2.3 0 2.7 1.5 2.7 3.5V21h-2.3v-6.1c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V21H9z"/>
  </svg>
);

type FooterLink = {
	title: string;
	href: string;
	icon?: ReactNode;
};

type FooterSection = {
	label: string;
	links: FooterLink[];
};

const footerLinks: FooterSection[] = [
	{
		label: "Product",
		links: [
			{ title: "Features", href: "#" },
			{ title: "Pricing", href: "#" },
			{ title: "Testimonials", href: "#" },
			{ title: "Integration", href: "#" },
		],
	},
	{
		label: "Company",
		links: [
			{ title: "FAQs", href: "#" },
			{ title: "About Us", href: "#" },
			{ title: "Privacy Policy", href: "#" },
			{ title: "T&S", href: "#" },
		],
	},
	{
		label: "Resources",
		links: [
			{ title: "Blog", href: "#" },
			{ title: "Changelog", href: "#" },
			{ title: "Brand", href: "#" },
			{ title: "Help", href: "#" },
		],
	},
	{
		label: "Social Links",
		links: [
			{
				title: "Facebook",
				href: "#",
				icon: (
					<FacebookIcon
					/>
				),
			},
			{
				title: "Instagram",
				href: "#",
				icon: (
					<InstagramIcon
					/>
				),
			},
			{
				title: "Youtube",
				href: "#",
				icon: (
					<YoutubeIcon
					/>
				),
			},
			{
				title: "LinkedIn",
				href: "#",
				icon: (
					<LinkedinIcon
					/>
				),
			},
		],
	},
];

export function Footer() {
	return (
		<footer
			className={cn(
				"relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center rounded-t-4xl border-t px-6 sm:px-8 lg:px-12",
				"dark:bg-[radial-gradient(35%_128px_at_50%_0%,--theme(--color-foreground/.1),transparent)]"
			)}
		>
			<div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur" />

			<div className="grid w-full gap-8 py-6 md:py-8 lg:grid-cols-3 lg:gap-8">
				<AnimatedContainer className="space-y-4">
					<Logo className="h-5 w-auto text-foreground" />
					<p className="mt-8 text-muted-foreground text-sm md:mt-0">
						Connect skill with industry.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-2 lg:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer delay={0.1 + index * 0.1} key={section.label}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs">{section.label}</h3>
								<ul className="mt-4 space-y-2 text-muted-foreground text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												className="inline-flex items-center duration-250 hover:text-foreground [&_svg]:me-1 [&_svg]:size-4"
												href={link.href}
												key={`${section.label}-${link.title}`}
											>
												{link.icon}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
			<div className="h-px w-full bg-linear-to-r via-border" />
			<div className="flex w-full items-center justify-center py-4">
				<p className="text-muted-foreground text-sm">
					&copy; {new Date().getFullYear()} SkillBridge, All rights reserved
				</p>
			</div>
		</footer>
	);
}

function AnimatedContainer({
	className,
	delay = 0.1,
	children,
}: {
	delay?: number;
	className?: string;
	children: ReactNode;
}) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			className={className}
			initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
			transition={{ delay, duration: 0.8 }}
			viewport={{ once: true }}
			whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
		>
			{children}
		</motion.div>
	);
}
