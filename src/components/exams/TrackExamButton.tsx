"use client";

import { useTrackExam } from "@/hooks/useTrackExam";
import { cn } from "@/lib/utils";
import { Bell, BellRing } from "lucide-react";

interface TrackExamButtonProps {
  examId: string;
  className?: string;
  variant?: "icon" | "button";
}

export function TrackExamButton({ examId, className, variant = "button" }: TrackExamButtonProps) {
  const { isTracked, toggleTrack, isLoaded, isSyncing } = useTrackExam(examId);

  // Avoid hydration mismatch by not rendering full state until mounted
  if (!isLoaded) {
    if (variant === "icon") {
      return (
        <button className={cn("opacity-50 p-2", className)} disabled>
          <Bell className="h-5 w-5" />
        </button>
      );
    }
    return (
      <button className={cn("opacity-50 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium", className)} disabled>
        <Bell className="h-4 w-4" />
        Track
      </button>
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={toggleTrack}
        disabled={isSyncing}
        className={cn(
          "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all active:scale-95",
          isTracked 
            ? "bg-primary/10 text-primary hover:bg-primary/20" 
            : "bg-muted text-foreground hover:bg-muted/80",
          isSyncing && "opacity-70 cursor-wait",
          className
        )}
      >
        {isTracked ? (
          <>
            <BellRing className="h-4 w-4 fill-current animate-in spin-in-12" />
            Tracking
          </>
        ) : (
          <>
            <Bell className="h-4 w-4" />
            Track Exam
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTrack}
      disabled={isSyncing}
      className={cn(
        "rounded-full p-2 transition-all active:scale-95",
        isTracked 
          ? "bg-primary/10 text-primary hover:bg-primary/20" 
          : "bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground backdrop-blur-sm",
        isSyncing && "opacity-70 cursor-wait",
        className
      )}
      title={isTracked ? "Stop tracking" : "Track exam"}
    >
      {isTracked ? <BellRing className="h-5 w-5 fill-current" /> : <Bell className="h-5 w-5" />}
    </button>
  );
}
