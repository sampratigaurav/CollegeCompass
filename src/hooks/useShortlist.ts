import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/store/useAuthModal";
import { useRouter } from "next/navigation";

export function useShortlist(collegeId: string) {
  const { data: session } = useSession();
  const { openModal } = useAuthModal();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initial check
  useEffect(() => {
    // 1. Check local storage
    const localShortlist = JSON.parse(localStorage.getItem("shortlist") || "[]");
    if (localShortlist.includes(collegeId)) {
      setIsSaved(true);
    } else if (session) {
      // 2. If logged in, maybe fetch from server? 
      // For now we'll rely on the parent providing initial server state if available, 
      // but a quick check endpoint would be better if we don't have it.
      // We will sync local to server after login anyway.
    }
    setIsHydrated(true);
  }, [collegeId, session]);

  const toggleSave = async () => {
    // Optimistic UI update
    const newValue = !isSaved;
    setIsSaved(newValue);

    // Update Local Storage anonymously
    let localShortlist = JSON.parse(localStorage.getItem("shortlist") || "[]");
    if (newValue) {
      localShortlist.push(collegeId);
    } else {
      localShortlist = localShortlist.filter((id: string) => id !== collegeId);
    }
    localStorage.setItem("shortlist", JSON.stringify(localShortlist));

    if (!session) {
      // If saving anonymously, gently prompt them to sign in to sync
      if (newValue) {
        openModal("Sign in to save your Shortlist across all your devices.");
      }
      return;
    }

    // Authenticated: Sync to Server
    try {
      const res = await fetch("/api/shortlist", {
        method: newValue ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId }),
      });

      if (!res.ok) {
        // Revert on failure
        setIsSaved(!newValue);
        console.error("Failed to sync shortlist to server");
      } else {
        router.refresh();
      }
    } catch (err) {
      // Revert on failure
      setIsSaved(!newValue);
    }
  };

  return { isSaved, toggleSave, isHydrated };
}
