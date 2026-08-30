import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { platformModuleLinks, userPortalLinks } from "./nav-links";
import Link from "next/link";

export function DesktopNav() {
	return (
		<NavigationMenu className="hidden md:flex">
			<NavigationMenuList>
				<NavigationMenuItem className="bg-transparent">
					<NavigationMenuTrigger className="bg-transparent font-bold">
						Platform Modules
					</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-muted/50 p-1 pr-1.5 dark:bg-background">
						<div className="rounded-lg grid w-lg grid-cols-2 gap-2 border bg-popover p-2 shadow">
							{platformModuleLinks.map((item, i) => (
								<NavigationMenuLink
									key={`item-${item.label}-${i}`}
									render={<Link href={item.href} />}
									className="flex items-center gap-x-2 rounded-lg p-2 hover:bg-muted"
								>
									<div className="flex aspect-square size-12 items-center justify-center rounded-md border bg-card text-sm shadow-sm [&_svg:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:text-foreground">
										{item.icon}
									</div>
									<div className="flex flex-col items-start justify-center">
										<span className="font-medium text-xs">{item.label}</span>
										{item.description && (
											<span className="line-clamp-2 text-muted-foreground text-[11px]">
												{item.description}
											</span>
										)}
									</div>
								</NavigationMenuLink>
							))}
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent font-bold">
						User Portals
					</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-muted/50 p-1 pr-1.5 dark:bg-background">
						<div className="rounded-lg grid w-lg grid-cols-2 gap-2 border bg-popover p-2 shadow">
							{userPortalLinks.map((item, i) => (
								<NavigationMenuLink
									key={`item-${item.label}-${i}`}
									render={<Link href={item.href} />}
									className="flex items-center gap-x-2 rounded-lg p-2 hover:bg-muted"
								>
									<div className="flex aspect-square size-12 items-center justify-center rounded-md border bg-card text-sm shadow-sm [&_svg:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:text-foreground">
										{item.icon}
									</div>
									<div className="flex flex-col items-start justify-center">
										<span className="font-medium text-xs">{item.label}</span>
										{item.description && (
											<span className="line-clamp-2 text-muted-foreground text-[11px]">
												{item.description}
											</span>
										)}
									</div>
								</NavigationMenuLink>
							))}
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
