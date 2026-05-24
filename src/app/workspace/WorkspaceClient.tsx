"use client";

import { useEffect, useState } from "react";
import { useAuthModal } from "@/store/useAuthModal";
import Link from "next/link";
import { MapPin, Building2, TrendingUp, IndianRupee, ArrowRight, BookmarkMinus } from "lucide-react";
import { ShortlistButton } from "@/components/shared/ShortlistButton";

export default function WorkspaceClient({ session, serverShortlist, serverColleges }: any) {
  const { openModal } = useAuthModal();
  const [colleges, setColleges] = useState<any[]>(serverColleges || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function syncAndLoad() {
      const localIds = JSON.parse(localStorage.getItem("shortlist") || "[]");

      if (session?.user?.id) {
        // Authenticated: Merge local items that aren't on server
        const missingOnServer = localIds.filter((id: string) => !serverShortlist.includes(id));
        
        if (missingOnServer.length > 0) {
          // Sync them to server
          await Promise.all(
            missingOnServer.map((collegeId: string) =>
              fetch("/api/shortlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ collegeId }),
              })
            )
          );
          // Refetch fresh data from server (or reload)
          window.location.reload();
        } else {
          // Keep local storage in sync with server
          localStorage.setItem("shortlist", JSON.stringify(serverShortlist));
          setIsLoading(false);
        }
      } else {
        // Unauthenticated: Fetch details for local IDs
        if (localIds.length > 0) {
          try {
            const res = await fetch("/api/colleges/batch", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ids: localIds }),
            });
            const data = await res.json();
            setColleges(data);
          } catch (err) {
            console.error("Failed to load local shortlist");
          }
        }
        setIsLoading(false);
      }
    }

    syncAndLoad();
  }, [session, serverShortlist]);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 rounded-2xl bg-muted/50 animate-pulse border border-border/40"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {!session && colleges.length > 0 && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4">
          <div>
            <h3 className="font-semibold text-primary">Anonymous Workspace</h3>
            <p className="text-sm text-muted-foreground">You are tracking these colleges on this device. Sign in to save them permanently.</p>
          </div>
          <button 
            onClick={() => openModal("Sign in to save your Shortlist across all your devices.")}
            className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Sign In to Save
          </button>
        </div>
      )}

      {colleges.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 py-20 text-center animate-in fade-in zoom-in-95">
          <div className="rounded-full bg-muted p-4 mb-4">
            <BookmarkMinus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Your Shortlist is Empty</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Start exploring colleges and click the bookmark icon to add them to your decision workspace.
          </p>
          <Link 
            href="/colleges" 
            className="flex items-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 font-medium transition-transform hover:scale-105 active:scale-95"
          >
            Explore Colleges <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college) => (
            <div key={college.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-all hover:border-foreground/20 hover:shadow-md animate-in fade-in zoom-in-95">
              <div className="aspect-[2/1] w-full overflow-hidden bg-muted relative">
                {college.image_url ? (
                  <img src={college.image_url} alt={college.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Building2 className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                   <ShortlistButton collegeId={college.id} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="mb-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                      {college.type}
                    </span>
                    <h3 className="font-heading text-lg font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                      <Link href={`/colleges/${college.slug || college.id}`} className="before:absolute before:inset-0">
                        {college.name}
                      </Link>
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {college.city}, {college.state}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/40 text-sm">
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      {college.fees_max ? `₹${(college.fees_max / 100000).toFixed(1)}L` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      {college.placement_percentage}% Placed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
