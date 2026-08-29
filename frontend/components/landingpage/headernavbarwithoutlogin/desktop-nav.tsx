import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { companyLinks, companyLinks2, productLinks } from "./nav-links";
import Link from "next/link";

export function DesktopNav() {
	return (
		<NavigationMenu className="hidden md:flex">
			<NavigationMenuList>
				<NavigationMenuItem className="bg-transparent">
					<NavigationMenuTrigger className="bg-transparent">
						Product
					</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-muted/50 p-1 pr-1.5 dark:bg-background">
						<div className="rounded-lg grid w-lg grid-cols-2 gap-2 border bg-popover p-2 shadow">
							{productLinks.map((item, i) => (
								<NavigationMenuLink
									key={`item-${item.label}-${i}`}
									render={<Link href={item.href} />}
									className="flex items-center gap-x-2 rounded-lg p-2 hover:bg-muted"
								>
									<div className="flex aspect-square size-12 items-center justify-center rounded-md border bg-card text-sm shadow-sm [&_svg:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:text-foreground">
										{item.icon}
									</div>
									<div className="flex flex-col items-start justify-center">
										<span className="font-medium">{item.label}</span>
										{item.description && (
											<span className="line-clamp-2 text-muted-foreground text-xs">
												{item.description}
											</span>
										)}
									</div>
								</NavigationMenuLink>
							))}
						</div>
						<div className="p-2">
							<p className="text-muted-foreground text-sm">
								Interested?{" "}
								<Link
									className="font-medium text-foreground hover:underline"
									href="#"
								>
									Schedule a demo
								</Link>
							</p>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent">
						Company
					</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-muted/50 p-1 pr-1.5 pb-1.5 dark:bg-background">
						<div className="grid w-lg grid-cols-2 gap-2">
							<div className="rounded-lg space-y-2 border bg-popover p-2 shadow">
								{companyLinks.map((item, i) => (
									<NavigationMenuLink
										key={`item-${item.label}-${i}`}
										render={<Link href={item.href} />}
										className="flex items-center gap-x-2 rounded-lg p-2 hover:bg-muted"
									>
										<div className="flex aspect-square size-12 items-center justify-center rounded-md border bg-card text-sm shadow-sm [&_svg:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:text-foreground">
											{item.icon}
										</div>
										<div className="flex flex-col items-start justify-center">
											<span className="font-medium">{item.label}</span>
											{item.description && (
												<span className="line-clamp-2 text-muted-foreground text-xs">
													{item.description}
												</span>
											)}
										</div>
									</NavigationMenuLink>
								))}
							</div>
							<div className="space-y-2 p-3">
								{companyLinks2.map((item, i) => (
									<NavigationMenuLink
										render={<Link href={item.href} />}
										key={`item-${item.label}-${i}`}
									>
										{item.icon}
										{item.label}
									</NavigationMenuLink>
								))}
							</div>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						render={<Link href="/pricing" />}
						className="rounded-md p-2 hover:bg-accent px-4"
					>
						Pricing
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
