import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner"

import Providers from "./providers";

export const metadata: Metadata = {
  title: 'sih',
  description: 'sih',
  generator: 'priyanshujha.space',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased")}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
        <TooltipProvider>
          {children}
        </TooltipProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
