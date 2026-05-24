"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, GitCompare, Calculator, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/50 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
      <nav className="flex items-center justify-around h-16 px-2">
        <Link href="/" className={cn("flex flex-col items-center justify-center w-16 h-full gap-1 active:scale-[0.95] transition-transform", pathname === "/" ? "text-primary" : "text-muted-foreground")}>
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-wide">Home</span>
        </Link>
        
        <Link href="/discover" className={cn("flex flex-col items-center justify-center w-16 h-full gap-1 active:scale-[0.95] transition-transform", pathname === "/discover" ? "text-primary" : "text-muted-foreground")}>
          <Sparkles className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-wide">Discover</span>
        </Link>
        
        {/* Search Elevated Pill */}
        <div className="relative -top-5">
          <Link href="/colleges?focus=true" className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-elevated active:scale-[0.92] transition-transform ring-4 ring-background">
            <Search className="h-6 w-6" />
          </Link>
        </div>

        <Link href="/compare" className={cn("flex flex-col items-center justify-center w-16 h-full gap-1 active:scale-[0.95] transition-transform", pathname === "/compare" ? "text-primary" : "text-muted-foreground")}>
          <GitCompare className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-wide">Compare</span>
        </Link>
        
        <Link href="/predictor" className={cn("flex flex-col items-center justify-center w-16 h-full gap-1 active:scale-[0.95] transition-transform", pathname === "/predictor" ? "text-primary" : "text-muted-foreground")}>
          <Calculator className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-wide">Predictor</span>
        </Link>
      </nav>
    </div>
  );
}
