import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/store/useAuthModal";
import { useUserMemory } from "@/hooks/useUserMemory";
import { useRouter } from "next/navigation";

export function useTrackExam(examId: string) {
  const { data: session } = useSession();
  const { openModal } = useAuthModal();
  const router = useRouter();
  
  // Tie into the global local memory system
  const { trackedExams, toggleTrackedExam, isLoaded } = useUserMemory();
  const [isSyncing, setIsSyncing] = useState(false);

  // Derived state: is it currently tracked locally?
  const isTracked = trackedExams.includes(examId);

  const toggleTrack = async () => {
    // 1. Optimistic Local Update
    toggleTrackedExam(examId);

    // 2. Unauthenticated -> Prompt to sign in
    if (!session?.user?.id) {
      if (!isTracked) {
        // Only prompt when tracking, not when untracking
        openModal("Sign in to sync your tracked exams across all your devices.");
      }
      return;
    }

    // 3. Authenticated -> Sync to Server
    setIsSyncing(true);
    const newValue = !isTracked;
    
    try {
      const res = await fetch("/api/exams/track", {
        method: newValue ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId }),
      });

      if (!res.ok) {
        // Revert local optimistic change on server failure
        toggleTrackedExam(examId); 
        console.error("Failed to sync tracked exam to server");
      } else {
        // Success -> refresh router to update Workspace server components
        router.refresh();
      }
    } catch (err) {
      // Revert local optimistic change
      toggleTrackedExam(examId);
    } finally {
      setIsSyncing(false);
    }
  };

  return { isTracked, toggleTrack, isLoaded, isSyncing };
}
