"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUserMemory } from "@/hooks/useUserMemory";
import { useRouter } from "next/navigation";

function SessionSync({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      // 1. Sync Tracked Exams
      const localMemory = localStorage.getItem("college_compass_memory_v2");
      if (localMemory) {
        try {
          const parsed = JSON.parse(localMemory);
          const localExams = parsed.trackedExams || [];
          
          if (localExams.length > 0) {
            fetch("/api/exams/sync", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ examIds: localExams }),
            }).then((res) => {
              if (res.ok) {
                // Keep local storage but the items are now safely in the cloud
                router.refresh();
              }
            });
          }
        } catch (err) {
          console.error("Failed to sync tracked exams", err);
        }
      }
    }
  }, [status, session]);

  return <>{children}</>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionSync>
        {children}
      </SessionSync>
    </SessionProvider>
  );
}
