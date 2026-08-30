"use client";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useScroll } from "./use-scroll";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import Link from "next/link";

export function Header() {
	const scrolled = useScroll(10);

	return (
		<header
			className={cn("sticky top-0 z-50 w-full border-b-4 border-black bg-[#FFFDF5] text-black", {
				"shadow-[0_4px_0px_0px_#000]": scrolled,
			})}
		>
			<nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
				<div className="flex items-center gap-6">
					<Link
						className="rounded-none border-2 border-black px-3 py-2 bg-[#FFD93D] shadow-[3px_3px_0px_0px_#000] hover:bg-[#fcc816] transition-all"
						href="/"
					>
						<Logo className="h-6 w-auto text-black font-black" />
					</Link>
					<DesktopNav />
				</div>
				<div className="hidden md:flex items-center gap-4">
					<Button
						className="font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#ff5252] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none text-xs"
						render={<Link href="/login" />}
					>
						Sign In / Get Started
					</Button>
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
