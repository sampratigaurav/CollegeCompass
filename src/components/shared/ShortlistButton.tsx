"use client";

import { Bookmark } from "lucide-react";
import { useShortlist } from "@/hooks/useShortlist";
import { cn } from "@/lib/utils";

interface ShortlistButtonProps {
  collegeId: string;
  className?: string;
  variant?: "icon" | "button";
}

export function ShortlistButton({ collegeId, className, variant = "icon" }: ShortlistButtonProps) {
  const { isSaved, toggleSave, isHydrated } = useShortlist(collegeId);

  // Avoid hydration mismatch by not rendering the full state until mounted
  if (!isHydrated) {
    return (
      <button className={cn("opacity-50", className)} disabled>
        <Bookmark className="h-5 w-5" />
      </button>
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={toggleSave}
        className={cn(
          "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all active:scale-95",
          isSaved 
            ? "bg-primary/10 text-primary hover:bg-primary/20" 
            : "bg-muted text-foreground hover:bg-muted/80",
          className
        )}
      >
        <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
        {isSaved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      onClick={toggleSave}
      className={cn(
        "rounded-full p-2 transition-all active:scale-95",
        isSaved 
          ? "bg-primary/10 text-primary hover:bg-primary/20" 
          : "bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground backdrop-blur-sm",
        className
      )}
      title={isSaved ? "Remove from Shortlist" : "Save to Shortlist"}
    >
      <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />
    </button>
  );
}
