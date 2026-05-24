"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, CheckCircle2, ChevronRight, Scale, X, Sparkles, Building2, Wallet, Briefcase, Microscope, Target } from "lucide-react";

type CollegeMatch = {
  id: string;
  name: string;
  slug: string;
  city: string;
  image_url: string | null;
  type: string;
  fees_max: number;
  matchScore: number;
  narrative: string;
  excludedReasons: string[];
  isExcluded: boolean;
};

const PRIORITIES = [
  { id: "Placements", label: "High Placements & ROI", icon: <Briefcase className="h-4 w-4" /> },
  { id: "Startup Culture", label: "Startup Ecosystem", icon: <Sparkles className="h-4 w-4" /> },
  { id: "Research", label: "Research Opportunities", icon: <Microscope className="h-4 w-4" /> },
  { id: "Academic Excellence", label: "Academic Prestige", icon: <Target className="h-4 w-4" /> },
];

const BUDGET_OPTIONS = [
  { value: 0, label: "Any Budget" },
  { value: 300000, label: "< ₹3 Lakhs" },
  { value: 1000000, label: "< ₹10 Lakhs" },
  { value: 2500000, label: "< ₹25 Lakhs" },
];

export function DiscoverClient() {
  const router = useRouter();
  
  // Canvas State
  const [budgetMax, setBudgetMax] = useState<number>(0);
  const [type, setType] = useState<string>("Any");
  const [priorities, setPriorities] = useState<string[]>([]);
  
  // Results State
  const [results, setResults] = useState<CollegeMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Compare Handoff
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  
  const fetchMatches = async (currentPriorities: string[], currentBudget: number, currentType: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budgetMax: currentBudget > 0 ? currentBudget : null,
          type: currentType,
          priorities: currentPriorities,
        }),
      });
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch matches", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce API calls slightly
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hasInteracted) return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchMatches(priorities, budgetMax, type);
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [budgetMax, type, priorities, hasInteracted]);

  const togglePriority = (id: string) => {
    setHasInteracted(true);
    setPriorities(prev => {
      if (prev.includes(id)) {
        return prev.filter(p => p !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleCompare = (slug: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug);
      if (prev.length >= 3) {
        alert("You can compare up to 3 colleges at once.");
        return prev;
      }
      return [...prev, slug];
    });
  };

  const executeCompare = () => {
    if (selectedForCompare.length >= 2) {
      router.push(`/compare?ids=${selectedForCompare.join(",")}`);
    }
  };

  // Match Ring Component
  const MatchRing = ({ score }: { score: number }) => {
    const strokeDasharray = `${score} ${100 - score}`;
    const colorClass = score >= 85 ? "text-emerald-500" : score >= 60 ? "text-amber-500" : "text-muted-foreground";
    
    return (
      <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
          <path
            className="text-muted/30"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className={colorClass}
            strokeDasharray={strokeDasharray}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
        <span className="absolute text-xs font-bold">{score}%</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background">
      {/* LEFT PANE: PREFERENCES */}
      <div className="w-full lg:w-[400px] shrink-0 border-r border-border bg-muted/10 p-6 lg:p-8 flex flex-col gap-10 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Find Your Fit</h1>
          <p className="text-sm text-muted-foreground">Adjust your preferences below. The engine will instantly update your matches.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">What matters most?</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {PRIORITIES.map(p => {
              const isActive = priorities.includes(p.id);
              const index = priorities.indexOf(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePriority(p.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all active:scale-[0.98] ${
                    isActive 
                      ? 'bg-primary text-primary-foreground border-primary shadow-subtle' 
                      : 'bg-card text-foreground border-border hover:border-primary/30'
                  }`}
                >
                  {p.icon}
                  {p.label}
                  {isActive && <span className="ml-1 text-[10px] bg-primary-foreground/20 px-1.5 py-0.5 rounded-full">{index + 1}</span>}
                </button>
              );
            })}
          </div>
          {priorities.length > 0 && (
            <p className="text-[10px] text-muted-foreground">Numbers indicate your priority weighting.</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Budget Constraint</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {BUDGET_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  setHasInteracted(true);
                  setBudgetMax(opt.value);
                }}
                className={`py-2.5 rounded-lg border text-sm font-medium transition-all active:scale-[0.98] ${
                  budgetMax === opt.value
                    ? 'bg-primary/10 text-primary border-primary/30 ring-1 ring-primary/30'
                    : 'bg-card text-foreground border-border hover:bg-muted'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Institution Type</h3>
          </div>
          <div className="flex bg-card rounded-lg border border-border p-1">
            {['Any', 'GOVERNMENT', 'PRIVATE'].map(t => (
              <button
                key={t}
                onClick={() => {
                  setHasInteracted(true);
                  setType(t);
                }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  type === t
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {t === 'GOVERNMENT' ? 'Public' : t === 'PRIVATE' ? 'Private' : 'Any'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANE: LIVE RESULTS */}
      <div className="flex-1 bg-background p-6 lg:p-8 overflow-y-auto relative pb-32">
        {!hasInteracted ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6 pt-10">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <SlidersHorizontal className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Shape your future</h2>
              <p className="text-muted-foreground">
                Tweak the controls on the left to see instantly matched institutions. 
                The scoring engine dynamically evaluates every college based on your unique profile.
              </p>
            </div>
            <div className="w-full space-y-3 mt-8 text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Try popular paths</p>
              <button onClick={() => { setType('GOVERNMENT'); setBudgetMax(300000); setPriorities(['Placements']); setHasInteracted(true); }} className="w-full p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors flex items-center justify-between group">
                <span className="font-medium text-sm">High ROI Public Institutions</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => { setType('Any'); setBudgetMax(0); setPriorities(['Startup Culture']); setHasInteracted(true); }} className="w-full p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors flex items-center justify-between group">
                <span className="font-medium text-sm">Vibrant Startup Ecosystems</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Your Matches</h2>
              {loading && <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>}
            </div>
            
            <div className="space-y-4">
              {results.filter(r => !r.isExcluded).map((college, idx) => {
                const isSelected = selectedForCompare.includes(college.slug);
                return (
                  <div key={college.id} className={`flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border transition-colors ${isSelected ? 'border-primary ring-1 ring-primary/20 bg-primary/[0.02]' : 'border-border bg-card hover:border-foreground/20'}`}>
                    {/* Checkbox for Compare */}
                    <div className="pt-2 sm:pt-0 sm:pr-2 hidden sm:flex items-start">
                      <button 
                        onClick={() => toggleCompare(college.slug)}
                        className={`h-5 w-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground bg-transparent hover:border-foreground'}`}
                      >
                        {isSelected && <CheckCircle2 className="h-3 w-3" />}
                      </button>
                    </div>

                    <div className="flex items-start gap-4 flex-1">
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-border shrink-0 bg-muted">
                        <Image src={college.image_url || "/images/fallback-college.jpg"} alt={college.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link href={`/colleges/${college.slug}`} className="text-base font-bold text-foreground hover:text-primary transition-colors line-clamp-1">
                              {college.name}
                            </Link>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                              {college.city} <span className="h-1 w-1 rounded-full bg-border"></span> {college.type === 'GOVERNMENT' ? 'Public' : 'Private'}
                            </p>
                          </div>
                          <div className="sm:hidden">
                            <MatchRing score={college.matchScore} />
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                          <p className="text-sm font-medium leading-relaxed">{college.narrative}</p>
                        </div>
                        
                        {/* Mobile Checkbox */}
                        <div className="mt-4 sm:hidden flex items-center gap-2">
                           <button 
                            onClick={() => toggleCompare(college.slug)}
                            className={`flex-1 py-2 text-xs font-medium rounded-md border flex items-center justify-center gap-2 transition-colors ${isSelected ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-transparent border-border text-foreground'}`}
                          >
                            {isSelected ? <><CheckCircle2 className="h-3 w-3" /> Selected</> : <><Scale className="h-3 w-3" /> Add to Compare</>}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden sm:flex flex-col items-center justify-start pl-4 border-l border-border/50 shrink-0 min-w-[80px]">
                      <MatchRing score={college.matchScore} />
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mt-2 text-center">Fit Score</p>
                    </div>
                  </div>
                );
              })}

              {/* Excluded Section */}
              {results.filter(r => r.isExcluded).length > 0 && (
                <div className="mt-12 pt-8 border-t border-border border-dashed">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">Not Recommended</h3>
                  <div className="space-y-3 opacity-60 hover:opacity-100 transition-opacity">
                    {results.filter(r => r.isExcluded).slice(0, 5).map(college => (
                      <div key={college.id} className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card/50">
                        <p className="text-sm font-medium w-1/3 line-clamp-1">{college.name}</p>
                        <p className="text-xs text-muted-foreground flex-1 line-clamp-1 pl-4 border-l border-border/50">
                          <span className="text-red-500/80 font-bold mr-1">Excluded:</span>
                          {college.excludedReasons[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FLOATING COMPARE BAR */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-6 lg:bottom-10 right-6 lg:right-10 left-6 lg:left-auto lg:w-[400px] bg-foreground text-background p-4 rounded-2xl shadow-elevated flex items-center justify-between z-50 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`h-8 w-8 rounded-full border-2 border-foreground flex items-center justify-center text-xs font-bold ${i < selectedForCompare.length ? 'bg-primary text-primary-foreground' : 'bg-muted/20 text-muted-foreground'}`}>
                  {i < selectedForCompare.length ? i + 1 : '+'}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold">{selectedForCompare.length} Selected</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSelectedForCompare([])} className="h-10 w-10 flex items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors">
              <X className="h-4 w-4" />
            </button>
            <button 
              onClick={executeCompare}
              disabled={selectedForCompare.length < 2}
              className="h-10 px-5 rounded-full bg-background text-foreground font-bold text-sm hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
            >
              Compare {selectedForCompare.length >= 2 && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Need to import ArrowRight at the top
import { ArrowRight } from "lucide-react";
