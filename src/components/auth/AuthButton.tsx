"use client";

import { useSession, signOut } from "next-auth/react";
import { useAuthModal } from "@/store/useAuthModal";
import { LogOut, User, LayoutDashboard, Bookmark } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function AuthButton() {
  const { data: session, status } = useSession();
  const { openModal } = useAuthModal();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>;
  }

  if (!session) {
    return (
      <button
        onClick={() => openModal("Sign in to save colleges and track exams.")}
        className="hidden md:inline-flex items-center justify-center rounded-md border border-border/50 bg-background px-4 py-1.5 text-[13px] font-medium transition-all hover:bg-muted active:scale-[0.98]"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-muted transition-transform active:scale-95"
      >
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-border/50 bg-background shadow-lg shadow-black/5 animate-in fade-in zoom-in-95 z-50">
          <div className="flex flex-col p-3 border-b border-border/50">
            <span className="text-sm font-medium truncate">{session.user?.name}</span>
            <span className="text-xs text-muted-foreground truncate">{session.user?.email}</span>
          </div>
          <div className="p-1">
            <Link
              href="/workspace"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <LayoutDashboard className="h-4 w-4" />
              Workspace
            </Link>
            <Link
              href="/workspace"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <Bookmark className="h-4 w-4" />
              Your Shortlist
            </Link>
          </div>
          <div className="p-1 border-t border-border/50">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
