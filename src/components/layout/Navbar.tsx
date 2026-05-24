"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthButton } from "@/components/auth/AuthButton";

const navLinks = [
  { href: "/", label: "Explore" },
  { href: "/discover", label: "Discover" },
  { href: "/compare", label: "Compare" },
  { href: "/exams", label: "Exams" },
  { href: "/predictor", label: "Predictor" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 md:bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-2xl tracking-tight font-heading"
          >
            <span>CollegeCompass</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 active:scale-[0.98]",
                  pathname === href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Search shortcut for mobile, hidden on md since we have a giant search bar on home */}
            <Link href="/colleges" className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground active:scale-[0.95] transition-all">
              <Search className="h-5 w-5" />
            </Link>
            <ThemeToggle />
            {pathname !== "/" && (
              <Link
                href="/predictor"
                className="hidden md:inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-1.5 text-[13px] font-semibold shadow-sm transition-all hover:bg-foreground/90 active:scale-[0.98]"
              >
                Try Predictor
              </Link>
            )}
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}
