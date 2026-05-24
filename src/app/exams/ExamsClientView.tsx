"use client";

import { useState, useEffect } from "react";
import { format, differenceInDays } from "date-fns";
import { Activity, ShieldCheck, Calendar, Clock, GraduationCap, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type ExamEvent = {
  id: string;
  type: string;
  title: string;
  startDate: Date;
  endDate: Date | null;
  is_tentative: boolean;
};

type Exam = {
  id: string;
  name: string;
  authority: string | null;
  last_verified_at: Date | null;
  events: ExamEvent[];
  _count?: {
    colleges: number;
  };
};

function getExamStatus(events: ExamEvent[]) {
  const now = new Date();
  
  const activeEvent = events.find(e => new Date(e.startDate) <= now && (!e.endDate || new Date(e.endDate) >= now));
  if (activeEvent) {
    if (activeEvent.type === "REGISTRATION") {
      const daysLeft = activeEvent.endDate ? differenceInDays(new Date(activeEvent.endDate), now) : 0;
      if (daysLeft > 0 && daysLeft <= 7) return { label: `Registration Closing in ${daysLeft} days`, status: "urgency" };
      return { label: "Registration Open", status: "live" };
    }
    if (activeEvent.type === "EXAM") return { label: "Exam Ongoing", status: "live" };
    if (activeEvent.type === "COUNSELLING") return { label: "Counselling Active", status: "live" };
  }

  const upcoming = events.find(e => new Date(e.startDate) > now);
  if (upcoming) {
    if (upcoming.type === "RESULT") return { label: "Results Awaited", status: "anticipation" };
    const daysUntil = differenceInDays(new Date(upcoming.startDate), now);
    return { label: `Next: ${upcoming.title} in ${daysUntil}d`, status: "anticipation" };
  }

  return { label: "Cycle Completed", status: "historical" };
}

const statusColors: Record<string, string> = {
  live: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/10",
  urgency: "bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-400 dark:bg-amber-500/10",
  anticipation: "bg-blue-500/15 text-blue-700 border-blue-500/30 dark:text-blue-400 dark:bg-blue-500/10",
  historical: "bg-zinc-500/15 text-zinc-600 border-zinc-500/30 dark:text-zinc-400 dark:bg-zinc-500/10",
};

function CountdownTimer({ targetDate, label }: { targetDate: Date, label: string }) {
  const [timeLeft, setTimeLeft] = useState<{d:number, h:number, m:number, s:number} | null>(null);

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - new Date().getTime();
      if (diff <= 0) return { d:0, h:0, m:0, s:0 };
      return {
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60)
      };
    };
    setTimeLeft(calc());
    const interval = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;
  if (timeLeft.d === 0 && timeLeft.h === 0 && timeLeft.m === 0 && timeLeft.s === 0) return null;

  return (
    <div className="flex flex-col gap-1.5 items-end">
      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1">
        <Clock className="w-3 h-3 text-primary/70" /> {label}
      </span>
      <div className="flex gap-1.5">
        {[
          { v: timeLeft.d, l: "Days" },
          { v: timeLeft.h.toString().padStart(2, '0'), l: "Hrs" },
          { v: timeLeft.m.toString().padStart(2, '0'), l: "Min" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-md w-10 h-10 border shadow-sm">
            <span className="text-sm font-bold font-mono leading-none">{item.v}</span>
            <span className="text-[8px] uppercase text-muted-foreground mt-0.5">{item.l}</span>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-md w-10 h-10 border border-primary/20 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <span className="text-sm font-bold font-mono leading-none z-10">{timeLeft.s.toString().padStart(2, '0')}</span>
          <span className="text-[8px] uppercase text-primary/70 mt-0.5 z-10">Sec</span>
        </div>
      </div>
    </div>
  );
}

export function ExamsClientView({ exams }: { exams: Exam[] }) {
  const [filterAuthority, setFilterAuthority] = useState<string | null>(null);

  const authorities = Array.from(new Set(exams.map(e => e.authority).filter(Boolean))) as string[];

  const filteredExams = filterAuthority 
    ? exams.filter(e => e.authority === filterAuthority)
    : exams;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <div className="border-b border-border/40 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Activity className="h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-heading">Exam Operations Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Track official timelines, registration windows, and milestones for upcoming entrance exams. 
            Monitored and verified directly from official authority notices.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button 
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filterAuthority === null ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
            onClick={() => setFilterAuthority(null)}
          >
            All Authorities
          </button>
          {authorities.map(auth => (
            <button 
              key={auth}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filterAuthority === auth ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
              onClick={() => setFilterAuthority(auth)}
            >
              {auth}
            </button>
          ))}
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExams.map(exam => (
            <ExamEcosystemCard key={exam.id} exam={exam} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExamEcosystemCard({ exam }: { exam: Exam }) {
  const statusInfo = getExamStatus(exam.events);
  const now = new Date();
  
  const activeEvent = exam.events.find(e => new Date(e.startDate) <= now && (!e.endDate || new Date(e.endDate) >= now));
  const upcomingEvent = exam.events.find(e => new Date(e.startDate) > now);
  const targetDate = activeEvent?.endDate ? new Date(activeEvent.endDate) : upcomingEvent?.startDate ? new Date(upcomingEvent.startDate) : null;
  const targetLabel = activeEvent?.endDate ? `Closes In` : upcomingEvent?.startDate ? `Starts In` : null;

  return (
    <Card className="p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden group border-border/60 bg-card/80 backdrop-blur-xl">
      {statusInfo.status === "live" && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
      )}
      {statusInfo.status === "urgency" && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-amber-500/20 transition-all"></div>
      )}
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold font-heading mb-1.5 group-hover:text-primary transition-colors">{exam.name}</h2>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground font-medium">{exam.authority}</span>
              {exam._count && exam._count.colleges > 0 && (
                <>
                  <span className="text-muted-foreground/40">•</span>
                  <Link href={`/colleges?exam=${exam.name}`} className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors bg-primary/10 px-2 py-0.5 rounded-full text-xs font-semibold">
                    <GraduationCap className="w-3.5 h-3.5" />
                    Accepted by {exam._count.colleges} Colleges
                    <ArrowRight className="w-3 h-3 ml-0.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className={`px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide shadow-sm ${statusColors[statusInfo.status]}`}>
              {statusInfo.label}
            </div>
            {targetDate && targetLabel && (
              <CountdownTimer targetDate={targetDate} label={targetLabel} />
            )}
          </div>
        </div>

        {/* Event Progression Visualization */}
        {exam.events.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between relative mt-6 mb-4">
              <div className="absolute left-0 right-0 h-px bg-border top-1/2 -translate-y-1/2 z-0" />
              {exam.events.slice(0, 4).map((ev, idx) => {
                const isCompleted = new Date(ev.startDate) < now;
                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center bg-card px-2 gap-2 group">
                    <div className={`h-3 w-3 rounded-full border-2 transition-colors duration-300 ${isCompleted ? 'bg-primary border-primary' : 'bg-background border-muted-foreground/30 group-hover:border-primary/50'}`} />
                    <span className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-wider ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {ev.type.replace('_', ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Detailed Events List */}
        <div className="space-y-3">
          {exam.events.map((ev) => (
            <div key={ev.id} className="flex justify-between items-center p-3 rounded-lg bg-secondary/30 border border-border/30">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{ev.title}</span>
                  {ev.is_tentative && (
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5 uppercase tracking-wider text-amber-500 border-amber-500/30">
                      Tentative
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {format(new Date(ev.startDate), "MMM d, yyyy")}
                    {ev.endDate ? ` - ${format(new Date(ev.endDate), "MMM d, yyyy")}` : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {exam.events.length === 0 && (
            <div className="text-sm text-muted-foreground p-4 text-center border border-dashed rounded-lg">
              No dates announced yet.
            </div>
          )}
        </div>
      </div>

      {/* Source Transparency */}
      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border/40 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-emerald-500/70" />
        <span>Verified from {exam.authority} sources</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Updated {exam.last_verified_at ? format(new Date(exam.last_verified_at), "MMM d") : "Recently"}
        </span>
      </div>
    </Card>
  );
}
