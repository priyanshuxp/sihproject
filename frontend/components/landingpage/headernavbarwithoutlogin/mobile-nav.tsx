import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "./portal";
import { Button } from "@/components/ui/button";
import { platformModuleLinks, userPortalLinks } from "./nav-links";
import { LinkItem } from "./sheard";
import { XIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="md:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				className="md:hidden"
				onClick={() => setOpen(!open)}
				size="icon"
				variant="outline"
			>
				<div
					className={cn(
						"transition-all",
						open ? "scale-100 opacity-100" : "scale-0 opacity-0"
					)}
				>
					<XIcon />
				</div>
				<div
					className={cn(
						"absolute transition-all",
						open ? "scale-0 opacity-0" : "scale-100 opacity-100"
					)}
				>
					<MenuIcon />
				</div>
			</Button>
			{open && (
				<Portal className="top-14">
					<PortalBackdrop />
					<div
						className={cn(
							"size-full overflow-y-auto p-4 bg-background",
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="flex w-full flex-col gap-y-2">
							<span className="text-sm font-bold uppercase tracking-wider text-muted-foreground pt-2">Platform Modules</span>
							{platformModuleLinks.map((link) => (
								<LinkItem
									className="rounded-lg p-2 active:bg-muted dark:active:bg-muted/50"
									key={`mod-${link.label}`}
									onClick={() => setOpen(false)}
									{...link}
								/>
							))}
							<span className="text-sm font-bold uppercase tracking-wider text-muted-foreground pt-4">User Portals</span>
							{userPortalLinks.map((link) => (
								<LinkItem
									className="rounded-lg p-2 active:bg-muted dark:active:bg-muted/50"
									key={`portal-${link.label}`}
									onClick={() => setOpen(false)}
									{...link}
								/>
							))}
						</div>
						<div className="mt-6 flex flex-col gap-2 pb-12">
							<Button className="w-full font-bold" variant="outline" render={<Link href="/login" onClick={() => setOpen(false)} />}>
								Sign In
							</Button>
							<Button className="w-full font-bold" render={<Link href="/login" onClick={() => setOpen(false)} />}>
								Get Started
							</Button>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
