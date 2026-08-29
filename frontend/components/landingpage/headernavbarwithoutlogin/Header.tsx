"use client";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useScroll } from "./use-scroll";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { ThemeSwitcher } from "./theme-switcher";
import Link from "next/link"

export function Header() {
	const scrolled = useScroll(10);

	return (
		<header
			className={cn("sticky top-0 z-50 w-full border-transparent border-b", {
				"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
				<div className="flex items-center gap-5">
					<Link
						className="rounded-lg px-3 py-2.5 hover:bg-muted dark:hover:bg-muted/50"
						href="/"
					>
						<Logo className="h-5 w-auto text-foreground" />
					</Link>
					<DesktopNav />
				</div>
				<div className="hidden md:flex">
				<ThemeSwitcher />

					<Button variant="outline" render={<Link href="/login" />}>
						Sign In
					</Button>
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
