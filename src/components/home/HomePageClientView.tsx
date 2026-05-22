"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Clock, TrendingUp, ChevronRight, Activity, Calendar, Building2, Wallet, Users, Lightbulb, MapPin, ArrowRight } from "lucide-react";
import { useUserMemory } from "@/hooks/useUserMemory";
import { SearchBar } from "@/components/shared/SearchBar";

interface HomePageProps {
  initialData: {
    topColleges: any[];
    rank1: any;
    trends: any[];
    featured: any;
    compareColleges: any[];
    stats: {
      totalColleges: number;
      avgFees: number;
      topPlacement: number;
      statesCovered: number;
    };
    exams: any[];
  };
}

export function HomePageClientView({ initialData }: HomePageProps) {
  const { isLoaded, recentSearches, recentColleges, recentComparisons } = useUserMemory();
  const { topColleges, stats, exams } = initialData;

  const formatLPA = (val: number | null) => val ? `₹${(val / 100000).toFixed(1)} LPA` : "N/A";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans pb-20">
      {/* SECTION 1: SMART SEARCH HUB (Asymmetric Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Search & Command */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-emerald-500/50 flex items-center justify-center">
                <div className="h-1 w-1 rounded-full bg-emerald-400 animate-ping" />
              </div>
              System Active • {stats.totalColleges.toLocaleString()} Institutions
            </div>
            
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
              Search colleges. <span className="text-muted-foreground">Compare placements. Predict admissions.</span>
            </h1>

            {/* Smart Search Input */}
            <div className="relative mt-2">
              <div className="bg-card border border-border rounded-xl p-1.5 shadow-elevated focus-within:border-foreground/20 focus-within:ring-1 focus-within:ring-foreground/10 transition-all z-50">
                <SearchBar />
              </div>
            </div>

            {/* User Memory: Recent Searches */}
            {isLoaded && recentSearches.length > 0 && (
              <div className="pt-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> Recent Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((query) => (
                    <Link href={`/colleges?q=${encodeURIComponent(query)}`} key={query} className="text-xs bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 rounded-md px-3 py-1.5 transition-colors text-muted-foreground hover:text-foreground">
                      {query}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Links instead of 'Get Started' */}
            <div className="flex items-center gap-4 pt-4">
              <Link href="/colleges" className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                Explore Rankings <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/predictor" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group">
                Try Predictor <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Live Intelligence Feed */}
          <div className="lg:col-span-5 bg-card rounded-2xl border border-border p-6 h-full flex flex-col justify-between shadow-subtle">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase flex items-center gap-1.5">
                  <Activity className="h-3 w-3" /> Trending this week
                </h3>
                <span className="text-[10px] text-muted-foreground">Updated 12m ago</span>
              </div>
              
              <div className="space-y-4">
                {topColleges.slice(0, 4).map((college, idx) => (
                  <Link href={`/colleges/${college.slug}`} key={college.id} className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-foreground/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-[10px] font-bold text-muted-foreground w-4 text-center">{idx + 1}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{college.name}</p>
                        <p className="text-[11px] text-muted-foreground">{college.city}, {college.state}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-emerald-400">{formatLPA(college.avg_salary)}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Median</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Indexed</p>
                <p className="text-lg font-medium">{stats.totalColleges.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Top Placement</p>
                <p className="text-lg font-medium text-primary">{stats.topPlacement}%</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: PERSONALIZED PREDICTIONS (Utility Focused) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Admission Predictor</h2>
            <p className="text-sm text-muted-foreground">Historical cutoff analysis and probability scoring.</p>
          </div>
          <Link href="/predictor" className="text-[11px] font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors flex items-center gap-1">
            Open Predictor <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sample Prediction Box */}
          <div className="md:col-span-2 bg-card rounded-xl border border-border shadow-subtle p-6 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden group hover:border-foreground/10 transition-colors">
            
            <div className="relative h-28 w-28 shrink-0">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-muted/20" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#34d399" strokeWidth="8" strokeDasharray="283" strokeDashoffset="42" className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">85%</span>
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Match</span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">High Confidence</span>
                  <span className="text-xs text-muted-foreground">Based on 2025 cutoffs</span>
                </div>
                <h3 className="text-lg font-medium text-foreground">NIT Trichy — Computer Science</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-3 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Required Rank</p>
                  <p className="text-sm font-medium text-foreground">AIR 700 - 1500</p>
                </div>
                <div className="bg-muted rounded-lg p-3 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Category</p>
                  <p className="text-sm font-medium text-foreground">General / OS</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Memory: Viewed Colleges or Recommendations */}
          <div className="bg-card shadow-subtle rounded-xl border border-border p-6">
            <h3 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-4 flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Recently Viewed
            </h3>
            
            {isLoaded && recentColleges.length > 0 ? (
              <div className="space-y-3">
                {recentColleges.map((college) => (
                  <Link href={`/colleges/${college.slug}`} key={college.id} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded bg-foreground/5 border border-border flex items-center justify-center overflow-hidden shrink-0 relative">
                      {college.image_url ? (
                        <Image src={college.image_url} alt={college.name} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">{college.name}</p>
                      <p className="text-[10px] text-muted-foreground">Rank {college.nirf_rank ?? "N/A"}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs text-muted-foreground">No recent history.</p>
                <Link href="/colleges" className="text-xs text-primary hover:text-primary/80 mt-2 inline-block">Explore colleges</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: SMART COMPARISON & INSIGHTS (Asymmetric) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Compare Section */}
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Smart Comparisons</h2>
                <p className="text-sm text-muted-foreground">Side-by-side technical breakdown of top institutions.</p>
              </div>
              <Link href="/compare" className="text-[11px] font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors flex items-center gap-1">
                Open Matrix <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Featured Compare Card 1 */}
              <div className="bg-card rounded-xl border border-border shadow-subtle p-5 hover:border-foreground/10 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] font-bold bg-foreground/5 text-muted-foreground px-2 py-0.5 rounded uppercase tracking-wider">Featured Matchup</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center flex-1">
                    <p className="text-sm font-medium text-foreground line-clamp-1">IIT Madras</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Rank 1</p>
                  </div>
                  <div className="px-3 text-muted-foreground text-xs font-bold">VS</div>
                  <div className="text-center flex-1">
                    <p className="text-sm font-medium text-foreground line-clamp-1">IIT Delhi</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Rank 2</p>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-3 border border-border flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Placement Winner</span>
                  <span className="text-xs font-medium text-emerald-500 dark:text-emerald-400 flex items-center gap-1">IIT Delhi <TrophyIcon /></span>
                </div>
              </div>

              {/* Featured Compare Card 2 */}
              <div className="bg-card rounded-xl border border-border shadow-subtle p-5 hover:border-foreground/10 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] font-bold bg-foreground/5 text-muted-foreground px-2 py-0.5 rounded uppercase tracking-wider">ROI Analysis</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center flex-1">
                    <p className="text-sm font-medium text-foreground line-clamp-1">BITS Pilani</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Private</p>
                  </div>
                  <div className="px-3 text-muted-foreground text-xs font-bold">VS</div>
                  <div className="text-center flex-1">
                    <p className="text-sm font-medium text-foreground line-clamp-1">NIT Surathkal</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Public</p>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-3 border border-border flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Fee Efficiency</span>
                  <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-1">NIT Surathkal <TrophyIcon /></span>
                </div>
              </div>
            </div>
          </div>

          {/* Hardcoded Insights Section */}
          <div className="lg:col-span-4">
            <h2 className="text-lg font-medium mb-6">Insights</h2>
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 shadow-subtle">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm leading-relaxed text-foreground">Students targeting startup culture and entrepreneurship often prefer <span className="font-medium text-primary">IIT Hyderabad</span> over older NITs due to its flexible curriculum.</p>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 shadow-subtle">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm leading-relaxed text-muted-foreground"><span className="text-foreground font-medium">BITS Pilani</span> maintains one of the strongest placement-to-fee ratios among private institutions in 2024.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: ADMISSION TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Application Deadlines</h2>
            <p className="text-sm text-muted-foreground">Upcoming entrance exams and counselling schedules.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-card border border-border shadow-subtle rounded-xl p-4 hover:bg-foreground/5 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-medium text-foreground">{exam.name}</h4>
                <div className="bg-foreground/5 border border-foreground/10 rounded px-1.5 py-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Calendar className="h-3 w-3" /> 2025
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Exam Date</span>
                  <span className="font-medium text-foreground">{exam.exam_date || "TBD"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Counselling</span>
                  <span className="font-medium text-foreground">{exam.counselling_starts || "TBD"}</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Mocked Alert Card */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 hover:bg-amber-500/10 transition-colors">
             <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-medium text-amber-400">KCET Update</h4>
             </div>
             <p className="text-xs text-amber-500/80 leading-relaxed">
               Document verification schedule has been revised. Check official portal for updates.
             </p>
          </div>
        </div>
      </section>

    </div>
  );
}

function TrophyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
  );
}
