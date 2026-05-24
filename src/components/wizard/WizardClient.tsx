"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, Building2, Wallet, Briefcase, Microscope, Target, ArrowLeft, Loader2, Trophy, ArrowUpRight } from "lucide-react";
import { useUserMemory } from "@/hooks/useUserMemory";
import { STREAMS } from "@/lib/taxonomy";
import Link from "next/link";
import Image from "next/image";

const PRIORITIES = [
  { id: "Placements", label: "High Placements & ROI", icon: <Briefcase className="h-4 w-4" /> },
  { id: "Startup Culture", label: "Startup Ecosystem", icon: <Sparkles className="h-4 w-4" /> },
  { id: "Research", label: "Research Opportunities", icon: <Microscope className="h-4 w-4" /> },
  { id: "Academic Excellence", label: "Academic Prestige", icon: <Target className="h-4 w-4" /> },
];

const BUDGET_OPTIONS = [
  { value: 0, label: "No Budget Limit" },
  { value: 300000, label: "Under ₹3 Lakhs" },
  { value: 1000000, label: "Under ₹10 Lakhs" },
  { value: 2500000, label: "Under ₹25 Lakhs" },
];

export function WizardClient() {
  const router = useRouter();
  const { setInferredStream, addRecentSearch } = useUserMemory();

  // Wizard State
  const [step, setStep] = useState(0);
  
  // Form State
  const [persona, setPersona] = useState("Student");
  const [stream, setStream] = useState("Engineering");
  const [budgetMax, setBudgetMax] = useState<number>(1000000);
  const [type, setType] = useState<string>("Any");
  const [priorities, setPriorities] = useState<string[]>([]);

  // Results State
  const [topMatches, setTopMatches] = useState<any[]>([]);

  // Escape Hatch
  const skipToDashboard = () => {
    router.push("/discover");
  };

  // Run the calculation logic on Step 3 -> 4
  useEffect(() => {
    if (step === 3) {
      const fetchTopMatches = async () => {
        try {
          const res = await fetch("/api/discover", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              budgetMax: budgetMax > 0 ? budgetMax : null,
              type,
              priorities,
              stream,
            }),
          });
          const data = await res.json();
          // Filter out excluded ones and take top 3
          const validMatches = data.filter((m: any) => !m.isExcluded).slice(0, 3);
          setTopMatches(validMatches);
          
          // Save to user memory
          setInferredStream(stream);
          addRecentSearch(`Wizard: ${STREAMS[stream as keyof typeof STREAMS]?.label || stream}`);

          // Artificial delay for the "Labor Illusion"
          setTimeout(() => {
            setStep(4);
          }, 2500);

        } catch (error) {
          console.error("Failed to fetch matches", error);
          router.push("/discover"); // Fallback
        }
      };
      
      fetchTopMatches();
    }
  }, [step, budgetMax, type, priorities, stream, router, setInferredStream, addRecentSearch]);

  const goToDashboard = () => {
    const params = new URLSearchParams();
    if (stream) params.set("stream", stream);
    if (budgetMax > 0) params.set("budget", budgetMax.toString());
    if (type !== "Any") params.set("type", type);
    if (priorities.length > 0) params.set("priorities", priorities.join(","));
    
    router.push(`/discover?${params.toString()}`);
  };

  // ---------------------------------------------------------
  // STEP COMPONENTS
  // ---------------------------------------------------------

  const Step0_MadLibs = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight tracking-tight">
        "I am a{" "}
        <select 
          value={persona} 
          onChange={(e) => setPersona(e.target.value)}
          className="appearance-none bg-primary/10 text-primary border-b-4 border-primary rounded-none focus:outline-none focus:ring-0 text-center cursor-pointer pb-1 mx-2 transition-colors hover:bg-primary/20"
        >
          <option value="Student">Student</option>
          <option value="Parent">Parent</option>
        </select>
        looking for the best{" "}
        <select 
          value={stream} 
          onChange={(e) => setStream(e.target.value)}
          className="appearance-none bg-primary/10 text-primary border-b-4 border-primary rounded-none focus:outline-none focus:ring-0 text-center cursor-pointer pb-1 mx-2 transition-colors hover:bg-primary/20"
        >
          {Object.values(STREAMS).map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        colleges."
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl font-medium mt-6">
        Let's find the perfect fit based on real data, not just reputation.
      </p>
      <button 
        onClick={() => setStep(1)} 
        className="mt-12 bg-foreground text-background px-8 py-4 rounded-full text-lg font-bold flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-xl"
      >
        Let's Go <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );

  const Step1_Budget = () => (
    <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full px-4">
      <Wallet className="h-12 w-12 text-primary mb-6" />
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">What is the total budget for the degree?</h2>
      <p className="text-muted-foreground mb-12">Including tuition, hostel, and mess fees.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {BUDGET_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => {
              setBudgetMax(opt.value);
              setTimeout(() => setStep(2), 300); // auto advance
            }}
            className={`p-6 rounded-2xl border-2 text-lg font-bold transition-all ${
              budgetMax === opt.value
                ? 'bg-primary/10 border-primary text-primary shadow-subtle'
                : 'bg-card border-border hover:border-foreground/30 hover:bg-muted'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  const Step2_Priorities = () => (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full px-4">
      <Target className="h-12 w-12 text-primary mb-6" />
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">What matters most to you?</h2>
      <p className="text-muted-foreground mb-10">Select up to 2 priorities.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
        {PRIORITIES.map(p => {
          const isActive = priorities.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => {
                if (isActive) {
                  setPriorities(priorities.filter(id => id !== p.id));
                } else if (priorities.length < 2) {
                  setPriorities([...priorities, p.id]);
                }
              }}
              className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-subtle'
                  : 'bg-card border-border hover:border-foreground/30 hover:bg-muted text-foreground'
              } ${!isActive && priorities.length >= 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={isActive ? 'text-primary-foreground' : 'text-primary'}>
                {p.icon}
              </div>
              <span className="font-bold text-left flex-1">{p.label}</span>
              {isActive && <span className="bg-primary-foreground/20 px-2 py-1 rounded-full text-xs font-bold">{priorities.indexOf(p.id) + 1}</span>}
            </button>
          );
        })}
      </div>

      <div className="w-full pt-8 border-t border-border/50">
        <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
          <Building2 className="h-5 w-5 text-muted-foreground" /> Institution Type
        </h3>
        <div className="flex bg-card rounded-xl border-2 border-border p-1.5 w-full max-w-md mx-auto">
          {['Any', 'GOVERNMENT', 'PRIVATE'].map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${
                type === t
                  ? 'bg-foreground text-background shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {t === 'GOVERNMENT' ? 'Public Only' : t === 'PRIVATE' ? 'Private Only' : 'No Preference'}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={() => setStep(3)}
        className="mt-12 bg-primary text-primary-foreground px-12 py-4 rounded-full text-lg font-bold flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-xl"
      >
        Find My Matches <Sparkles className="h-5 w-5 fill-current" />
      </button>
    </div>
  );

  const Step3_Loading = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-md mx-auto">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold font-heading mb-2">Crunching data...</h2>
        <p className="text-muted-foreground animate-pulse">Running {persona.toLowerCase()}'s preferences through 1,500+ Indian institutions.</p>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 mt-8 overflow-hidden">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full bg-primary"
        />
      </div>
    </div>
  );

  const Step4_Reveal = () => (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 text-amber-500 rounded-full mb-4">
          <Trophy className="h-8 w-8" />
        </div>
        <h2 className="text-4xl font-heading font-black mb-3">Your Top Matches</h2>
        <p className="text-lg text-muted-foreground">Based on your {budgetMax ? 'budget' : 'preferences'} and priorities, here are your "Gold" matches.</p>
      </div>

      {topMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {topMatches.map((college, idx) => (
            <div key={college.id} className="relative flex flex-col bg-card rounded-2xl border-2 border-primary/20 p-6 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:border-primary/50 transition-all">
              <div className="absolute -top-4 -left-4 h-10 w-10 bg-primary text-primary-foreground font-black text-xl flex items-center justify-center rounded-xl shadow-lg rotate-[-10deg]">
                #{idx + 1}
              </div>
              
              <div className="h-32 rounded-xl bg-muted overflow-hidden relative mb-5 border border-border/50">
                {college.image_url ? (
                  <Image src={college.image_url} alt={college.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Building2 className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-bold font-heading line-clamp-2 leading-tight mb-2">{college.name}</h3>
              <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">{college.city}</p>
              
              <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center">
                 <div className="flex flex-col">
                   <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider mb-0.5">Fit Score</span>
                   <span className="text-lg font-black text-emerald-500">{college.matchScore}%</span>
                 </div>
                 <Link href={`/colleges/${college.slug}`} className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors group">
                   <ArrowUpRight className="h-5 w-5" />
                 </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full bg-muted/30 border-2 border-dashed border-border rounded-2xl p-12 text-center mb-12 flex flex-col items-center">
          <div className="p-4 bg-muted rounded-full mb-4">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold font-heading mb-2">No Perfect Matches Found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your strict criteria filtered out all colleges in our database. Try adjusting your budget or institution type to see more options!
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button 
          onClick={goToDashboard}
          className="bg-foreground text-background px-8 py-4 rounded-xl text-base font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto"
        >
          Explore All Matches in Dashboard <ArrowRight className="h-4 w-4" />
        </button>
        <button 
          onClick={() => setStep(0)}
          className="bg-muted text-foreground border border-border px-8 py-4 rounded-xl text-base font-bold transition-colors hover:bg-muted/80 w-full sm:w-auto"
        >
          Start Over
        </button>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Global Header / Escape Hatch */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2 font-heading font-bold text-xl tracking-tight text-foreground/80">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
             <Building2 className="w-5 h-5" />
          </div>
          CollegeCompass
        </div>
        
        {step < 3 && (
          <button 
            onClick={skipToDashboard}
            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted px-4 py-2 rounded-full transition-colors backdrop-blur-md"
          >
            Skip to Dashboard <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Back Button */}
      {step > 0 && step < 3 && (
        <button 
          onClick={() => setStep(step - 1)}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors backdrop-blur-md hidden md:flex z-50"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      )}

      {/* Main Content Area with Framer Motion Slide */}
      <div className="w-full z-10 px-4 md:px-12 pt-20 pb-12 h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {step === 0 && <Step0_MadLibs />}
            {step === 1 && <Step1_Budget />}
            {step === 2 && <Step2_Priorities />}
            {step === 3 && <Step3_Loading />}
            {step === 4 && <Step4_Reveal />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      {step < 3 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
          {[0, 1, 2].map(i => (
            <div 
              key={i} 
              className={`h-2.5 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-primary' : 'w-2.5 bg-border hover:bg-muted-foreground cursor-pointer'}`}
              onClick={() => { if (i < step) setStep(i); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
