"use client";

import { useEffect, useState } from "react";
import { useAuthModal } from "@/store/useAuthModal";
import Link from "next/link";
import { MapPin, Building2, TrendingUp, IndianRupee, ArrowRight, BookmarkMinus, Calendar, Bell, CalendarDays } from "lucide-react";
import { ShortlistButton } from "@/components/shared/ShortlistButton";
import { format } from "date-fns";

export default function WorkspaceClient({ 
  session, 
  serverShortlist, 
  serverColleges,
  serverTrackedExams,
  serverEvents
}: any) {
  const { openModal } = useAuthModal();
  const [colleges, setColleges] = useState<any[]>(serverColleges || []);
  const [events, setEvents] = useState<any[]>(serverEvents || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function syncAndLoad() {
      const localIds = JSON.parse(localStorage.getItem("shortlist") || "[]");
      const localMemory = JSON.parse(localStorage.getItem("college_compass_memory_v2") || "{}");
      const localExams = localMemory.trackedExams || [];

      if (session?.user?.id) {
        // We sync local shortlists here (Exams are synced in AuthProvider)
        const missingOnServer = localIds.filter((id: string) => !serverShortlist?.includes(id));
        
        if (missingOnServer.length > 0) {
          await Promise.all(
            missingOnServer.map((collegeId: string) =>
              fetch("/api/shortlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ collegeId }),
              })
            )
          );
          window.location.reload();
        } else {
          localStorage.setItem("shortlist", JSON.stringify(serverShortlist || []));
          setColleges(serverColleges || []);
          setEvents(serverEvents || []);
          setIsLoading(false);
        }
      } else {
        // Unauthenticated: Fetch details for local shortlists AND local tracked exams
        try {
          const promises = [];
          
          if (localIds.length > 0) {
            promises.push(
              fetch("/api/colleges/batch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: localIds }),
              }).then(r => r.json()).then(data => setColleges(data))
            );
          }
          
          if (localExams.length > 0) {
            promises.push(
              fetch("/api/exams/events-batch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ examIds: localExams }),
              }).then(r => r.json()).then(data => setEvents(data))
            );
          }

          await Promise.all(promises);
        } catch (err) {
          console.error("Failed to load local workspace data");
        }
        setIsLoading(false);
      }
    }

    syncAndLoad();
  }, [session, serverShortlist, serverColleges, serverEvents]);

  const generateCalendarLink = (event: any) => {
    const start = new Date(event.startDate).toISOString().replace(/-|:|\.\d+/g, "");
    const end = event.endDate 
      ? new Date(event.endDate).toISOString().replace(/-|:|\.\d+/g, "")
      : new Date(new Date(event.startDate).getTime() + 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, "");
    const text = encodeURIComponent(`${event.exam.name} - ${event.title}`);
    const details = encodeURIComponent(`Tracked via CollegeCompass`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[70%] grid gap-6 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-muted/50 animate-pulse border border-border/40"></div>
          ))}
        </div>
        <div className="w-full lg:w-[30%] h-96 rounded-2xl bg-muted/50 animate-pulse border border-border/40"></div>
      </div>
    );
  }

  const hasData = colleges.length > 0 || events.length > 0;

  return (
    <div className="space-y-8">
      {!session && hasData && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4">
          <div>
            <h3 className="font-semibold text-primary">Anonymous Workspace</h3>
            <p className="text-sm text-muted-foreground">You are tracking data locally. Sign in to save it permanently across devices.</p>
          </div>
          <button 
            onClick={() => openModal("Sign in to sync your Shortlist and Exam Deadlines across all devices.")}
            className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Sign In to Save
          </button>
        </div>
      )}

      {!hasData ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 py-20 text-center animate-in fade-in zoom-in-95">
          <div className="rounded-full bg-muted p-4 mb-4">
            <BookmarkMinus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Your Workspace is Empty</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Start exploring colleges and exams. Add them to your workspace to track deadlines and compare options.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/colleges" 
              className="flex items-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 font-medium transition-transform hover:scale-105 active:scale-95"
            >
              Explore Colleges <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              href="/exams" 
              className="flex items-center gap-2 rounded-xl bg-muted text-foreground border px-6 py-3 font-medium transition-transform hover:scale-105 active:scale-95"
            >
              View Exams
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area (70%) */}
          <div className="w-full lg:w-[70%] order-2 lg:order-1">
            <h2 className="text-xl font-semibold mb-4 font-heading flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" /> 
              Shortlisted Colleges
            </h2>
            
            {colleges.length === 0 ? (
              <div className="p-8 border border-dashed rounded-xl text-center text-muted-foreground">
                No colleges shortlisted yet.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {colleges.map((college) => (
                  <div key={college.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-all hover:border-foreground/20 hover:shadow-md">
                    <div className="aspect-[2/1] w-full overflow-hidden bg-muted relative">
                      {college.image_url ? (
                        <img src={college.image_url} alt={college.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <Building2 className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                         <ShortlistButton collegeId={college.id} variant="icon" />
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

          {/* Sidebar / Timeline Area (30%) */}
          <div className="w-full lg:w-[30%] order-1 lg:order-2">
            <div className="sticky top-24 bg-card/40 backdrop-blur-md rounded-2xl border border-border/60 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold font-heading flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" /> 
                  Upcoming Deadlines
                </h2>
                <Link href="/exams" className="text-xs text-primary hover:underline font-medium">Manage</Link>
              </div>

              {events.length === 0 ? (
                <div className="p-6 border border-dashed rounded-xl text-center text-muted-foreground text-sm">
                  You are not tracking any exams with upcoming deadlines.
                </div>
              ) : (
                <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-2.5 before:w-px before:bg-border/60">
                  {events.map((ev, i) => {
                    const isUrgent = ev.endDate && (new Date(ev.endDate).getTime() - new Date().getTime()) < 7 * 24 * 60 * 60 * 1000;
                    
                    return (
                      <div key={ev.id} className="relative pl-8">
                        {/* Timeline Node */}
                        <div className={`absolute left-0 w-5 h-5 rounded-full border-4 border-background flex items-center justify-center ${isUrgent ? 'bg-amber-500' : 'bg-primary'}`}>
                          {isUrgent && <div className="absolute w-full h-full rounded-full bg-amber-500 animate-ping opacity-20"></div>}
                        </div>

                        <div className="bg-background rounded-xl p-3 border border-border/50 shadow-sm hover:border-border transition-colors group">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">{ev.exam.name}</span>
                            {ev.is_tentative && (
                              <span className="text-[9px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded-sm font-semibold uppercase">Tentative</span>
                            )}
                          </div>
                          <h4 className="text-sm font-medium leading-tight mb-2">{ev.title}</h4>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>
                                {format(new Date(ev.startDate), "MMM d")} 
                                {ev.endDate && ` - ${format(new Date(ev.endDate), "MMM d")}`}
                              </span>
                            </div>
                            <a 
                              href={generateCalendarLink(ev)} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-fit items-center gap-1.5 text-[10px] uppercase font-bold text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted px-2 py-1 rounded transition-colors"
                            >
                              <CalendarDays className="w-3 h-3" /> Add to Calendar
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
