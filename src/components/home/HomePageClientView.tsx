"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Clock, TrendingUp, ChevronRight, Activity, Calendar, Building2, Wallet, Users, Lightbulb, MapPin, ArrowRight, History, Bookmark, Sparkles, Scale } from "lucide-react";
import { useUserMemory } from "@/hooks/useUserMemory";
import { SearchBar } from "@/components/shared/SearchBar";
import { STREAMS } from "@/lib/taxonomy";

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
  const { isLoaded, recentSearches, recentColleges, recentComparisons, savedColleges, savedComparisons, recentActivity, preferredExams, previousPredictions, inferredStream } = useUserMemory();
  const { topColleges, stats, exams } = initialData;

  const hasPersonalization = isLoaded && (recentColleges.length > 0 || savedColleges?.length > 0 || savedComparisons?.length > 0 || recentActivity?.length > 0);

  // For suggestions: find colleges with similar type to recently viewed, excluding already viewed/saved
  const viewedIds = new Set([...recentColleges.map(c => c.id), ...(savedColleges?.map(c => c.id) || [])]);
  const dominantType = recentColleges.length > 0 ? recentColleges[0].type : null;
  const suggestions = topColleges.filter(c => !viewedIds.has(c.id) && (dominantType ? c.type === dominantType : true)).slice(0, 3);
  const suggestionReason = dominantType ? `Related to your interest in ${dominantType} institutions` : "Based on your search patterns";

  // For exams: sort exams based on preferredExams
  const sortedExams = [...exams].sort((a, b) => {
    const aPref = preferredExams?.includes(a.name) ? 1 : 0;
    const bPref = preferredExams?.includes(b.name) ? 1 : 0;
    return bPref - aPref;
  });

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
            
            <h1 className="text-5xl lg:text-[4rem] font-black tracking-tight leading-[1.05] font-heading mt-2">
              Decide your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground">future path.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mt-4 font-medium">
              Data-driven college discovery for ambitious students. Analyze placements, compare real fees, and find your perfect fit.
            </p>

            {/* Smart Search Input */}
            <div className="w-full max-w-2xl mt-4 relative z-20">
              <SearchBar />
            </div>

            {/* Quick Streams */}
            <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 no-scrollbar snap-x mt-2">
              {Object.values(STREAMS).map(stream => {
                const Icon = stream.icon;
                const isPrimary = inferredStream === stream.id;
                return (
                  <Link 
                    key={stream.id} 
                    href={`/discover?stream=${stream.id}`} 
                    className={`shrink-0 snap-start flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all hover:scale-[1.02] active:scale-95 ${
                      isPrimary ? `${stream.bgClass} ${stream.colorClass} border-current shadow-sm` : 'bg-card border-border hover:border-foreground/20 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium whitespace-nowrap">{stream.label}</span>
                  </Link>
                );
              })}
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
            <div className="flex items-center gap-2 pt-4">
              <Link href="/colleges" className="text-sm font-medium text-foreground hover:text-primary transition-all active:scale-[0.98] flex items-center gap-1.5 group px-2 py-1.5 -ml-2 rounded-md hover:bg-foreground/5">
                Explore Rankings <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/predictor" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all active:scale-[0.98] flex items-center gap-1.5 group px-2 py-1.5 rounded-md hover:bg-foreground/5">
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
              
              <div className="space-y-3">
                {topColleges.slice(0, 4).map((college, idx) => (
                  <Link href={`/colleges/${college.slug}`} key={college.id} className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-foreground/5 active:bg-foreground/10 transition-colors">
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

      {/* NEW SECTION: PERSONALIZED WORKSPACE */}
      {hasPersonalization && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/50 bg-primary/5">
          <div className="mb-8">
            <h2 className="text-xl font-medium flex items-center gap-2 text-foreground">
              <Sparkles className="h-5 w-5 text-primary" /> Continue Exploring
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Based on your recent activity and shortlisted choices.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT: Saved & Suggested */}
            <div className="lg:col-span-8 space-y-10">
              {/* Shortlist */}
              {savedColleges?.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Bookmark className="h-4 w-4" /> Decision Workspace (Shortlist)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedColleges.map(college => (
                      <Link href={`/colleges/${college.slug}`} key={college.id} className="bg-card border border-border rounded-xl p-4 shadow-subtle hover:border-primary/40 transition-colors group flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">{college.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{college.location || "Institution"}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Comparisons */}
              {savedComparisons?.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Scale className="h-4 w-4" /> Active Comparisons
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedComparisons.map((comp, idx) => (
                      <Link href={`/compare?ids=${comp.college1.slug},${comp.college2.slug}`} key={idx} className="bg-card border border-border rounded-xl p-4 shadow-subtle hover:border-primary/40 transition-colors group">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1 flex-1">{comp.college1.name}</p>
                          <span className="text-[10px] text-muted-foreground font-bold px-2">VS</span>
                          <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1 flex-1 text-right">{comp.college2.name}</p>
                        </div>
                        <p className="text-[10px] text-primary/80 font-medium uppercase tracking-wider flex items-center justify-center gap-1 mt-3">
                          Continue Session <ChevronRight className="h-3 w-3" />
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" /> Suggested for You
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 ml-6">{suggestionReason}</p>
                  <div className="flex overflow-x-auto snap-x snap-proximity gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 hide-scrollbar">
                    {suggestions.map(college => (
                       <Link href={`/colleges/${college.slug}`} key={college.id} className="min-w-[75vw] sm:min-w-0 snap-center bg-card border border-border rounded-xl p-4 shadow-subtle hover:border-foreground/20 transition-colors group">
                          <p className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-primary">{college.name}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase tracking-wider font-bold">
                              {formatLPA(college.avg_salary)}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{college.type || "College"}</span>
                          </div>
                       </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Recent Activity Timeline */}
            <div className="lg:col-span-4 bg-card rounded-2xl border border-border p-6 shadow-subtle">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                <History className="h-4 w-4" /> Recent Activity
              </h3>
              {recentActivity?.length > 0 ? (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
                  {recentActivity.slice(0, 5).map(act => (
                    <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-3 h-3 rounded-full border border-background bg-muted-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 -translate-x-[4px] md:translate-x-0" 
                           style={{
                             backgroundColor: act.type === 'view' ? '#60a5fa' : act.type === 'compare' ? '#c084fc' : act.type === 'predict' ? '#34d399' : '#fbbf24'
                           }} />
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-6 md:ml-0 p-3 rounded-lg border border-border bg-background shadow-subtle">
                        {act.link ? (
                           <Link href={act.link} className="text-xs font-medium hover:text-primary transition-colors text-foreground line-clamp-2 leading-relaxed">{act.text}</Link>
                        ) : (
                           <p className="text-xs font-medium text-foreground line-clamp-2 leading-relaxed">{act.text}</p>
                        )}
                        <p className="text-[9px] text-muted-foreground mt-1 uppercase tracking-wider font-bold">{new Date(act.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No recent activity yet.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: SPOTLIGHT & HISTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Institution Spotlight</h2>
            <p className="text-sm text-muted-foreground">Discover top-ranked colleges based on our AI analysis.</p>
          </div>
          <Link href={`/colleges/${initialData.featured.slug}`} className="text-[11px] font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors flex items-center gap-1">
            View Details <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Featured College Card */}
          <Link href={`/colleges/${initialData.featured.slug}`} className="md:col-span-2 bg-card rounded-xl border border-border shadow-subtle flex flex-col md:flex-row items-stretch relative overflow-hidden group active:scale-[0.99] md:active:scale-100 hover:border-foreground/10 hover:shadow-elevated transition-all">
            
            {/* Image Side */}
            <div className="relative w-full md:w-2/5 h-48 md:h-auto shrink-0 overflow-hidden">
              {initialData.featured.image_url ? (
                <Image 
                  src={initialData.featured.image_url} 
                  alt={initialData.featured.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/40 md:to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-auto md:top-4 z-10">
                <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
                  Featured
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {initialData.featured.name}
              </h3>
              
              <p className="text-xs text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                {initialData.featured.ai_summary?.replace('**AI Summary**: ', '') || initialData.featured.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-muted/50 rounded-lg p-3 border border-border/50 group-hover:bg-muted transition-colors">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Median Salary</p>
                  <p className="text-sm font-medium text-emerald-500 dark:text-emerald-400">
                    {formatLPA(initialData.featured.avg_salary)}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 border border-border/50 group-hover:bg-muted transition-colors">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">NIRF Rank</p>
                  <p className="text-sm font-medium text-foreground">
                    #{initialData.featured.nirf_rank || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </Link>

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

            <div className="flex overflow-x-auto snap-x snap-proximity gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 hide-scrollbar">
              {/* Featured Compare Card 1 */}
              <div className="min-w-[85vw] sm:min-w-0 snap-center bg-card rounded-xl border border-border shadow-subtle p-5 hover:border-foreground/10 active:scale-[0.98] md:active:scale-100 transition-all cursor-pointer group">
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
              <div className="min-w-[85vw] sm:min-w-0 snap-center bg-card rounded-xl border border-border shadow-subtle p-5 hover:border-foreground/10 active:scale-[0.98] md:active:scale-100 transition-all cursor-pointer group">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border mt-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium flex items-center gap-2">
              Application Deadlines
              <span className="bg-foreground/5 text-muted-foreground text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border border-border">Updated Daily</span>
            </h2>
            <p className="text-sm text-muted-foreground">Monitoring official notices for entrance exams and schedules.</p>
          </div>
          {exams.length > 0 && exams[0].last_synced_at && (
            <div className="text-[10px] text-muted-foreground flex items-center gap-1.5 bg-muted px-2 py-1 rounded border border-border">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Last checked {new Date(exams[0].last_synced_at).toLocaleDateString()}
            </div>
          )}
        </div>

        <div className="flex overflow-x-auto snap-x snap-proximity gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 hide-scrollbar">
          {sortedExams.map((exam) => (
            <div key={exam.id} className={`min-w-[85vw] sm:min-w-0 snap-center bg-card border shadow-subtle rounded-xl p-5 transition-colors relative group ${preferredExams?.includes(exam.name) ? "border-primary/40 bg-primary/[0.02]" : "border-border hover:border-foreground/10"}`}>
              {exam.has_changes && (
                <div className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                    {exam.name}
                    {preferredExams?.includes(exam.name) && (
                      <span className="bg-primary/10 text-primary text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Relevant</span>
                    )}
                  </h4>
                  {exam.source_url && (
                    <a href={exam.source_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-0.5 mt-0.5">
                      Source: Official Website
                    </a>
                  )}
                </div>
                <div className="bg-foreground/5 border border-border rounded px-1.5 py-0.5 flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                  <Calendar className="h-3 w-3" /> 2025/26
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-xs items-center bg-muted/50 p-2 rounded-lg border border-border/50">
                  <span className="text-muted-foreground">Exam Date</span>
                  <span className="font-medium text-foreground">{exam.exam_date || "To be announced"}</span>
                </div>
                <div className="flex justify-between text-xs items-center px-2">
                  <span className="text-muted-foreground">Registration Ends</span>
                  <span className="font-medium text-foreground">{exam.registration_ends || "To be announced"}</span>
                </div>
                <div className="flex justify-between text-xs items-center px-2">
                  <span className="text-muted-foreground">Counselling</span>
                  <span className="font-medium text-foreground">{exam.counselling_starts || "To be announced"}</span>
                </div>
              </div>

              {exam.has_changes && exam.last_updated_at && (
                <div className="mt-4 pt-3 border-t border-border/50">
                   <p className="text-[10px] text-amber-500/80 leading-relaxed font-medium">
                     Schedule was recently revised on {new Date(exam.last_updated_at).toLocaleDateString()}. Check official portal for details.
                   </p>
                </div>
              )}
            </div>
          ))}
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
