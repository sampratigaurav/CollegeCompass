"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Info } from "lucide-react";
import { CollegeDetail } from "@/types";

export function InvestmentOutlook({ college }: { college: CollegeDetail }) {
  const baseFees = college.fees_max || college.fees_min;
  const baseSalary = college.avg_salary;

  if (!baseFees || !baseSalary) {
    return null;
  }

  const [hasLoan, setHasLoan] = useState(false);

  // Hidden Assumptions
  const DEGREE_YEARS = 4;
  const LOAN_MULTIPLIER = 1.35;
  const SALARY_DEDICATION_RATE = 0.3; // 30% of salary goes to payback

  const totalCost = baseFees * DEGREE_YEARS * (hasLoan ? LOAN_MULTIPLIER : 1);

  const calculatePayback = (salary: number) => {
    return totalCost / (salary * SALARY_DEDICATION_RATE);
  };

  const paybackBase = calculatePayback(baseSalary);

  // Affordability Feel
  let affordability = "Accessible";
  let affordabilityColor = "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  if (totalCost > baseSalary * 3) {
    affordability = "High Investment";
    affordabilityColor = "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20";
  } else if (totalCost > baseSalary * 1.5) {
    affordability = "Stretch";
    affordabilityColor = "text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
  }

  // Why this score
  const getWhyText = () => {
    if (paybackBase < 3) return `Strong outlook due to high placement averages relative to tuition costs.`;
    if (paybackBase < 6) return `Balanced outlook with a moderate payback horizon and solid outcomes.`;
    return `Longer payback horizon due to higher initial investment or moderate placement averages.`;
  };

  const formatLakhs = (n: number) => `₹${(n / 100000).toFixed(1)}L`;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-elevated">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-bold text-base text-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Investment Outlook
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Cost vs Outcome Analysis</p>
        </div>
        <div className={`px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${affordabilityColor}`}>
          {affordability}
        </div>
      </div>

      <div className="space-y-6">
        {/* Visual Timeline */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
            <span>0y</span>
            <span className="text-foreground">~{paybackBase.toFixed(1)}y Payback</span>
            <span>10y+</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary/50 to-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((paybackBase / 10) * 100, 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Inputs */}
        <div className="flex items-center justify-between py-3 border-y border-border/50">
          <span className="text-sm font-medium text-foreground">Include Education Loan</span>
          <button
            onClick={() => setHasLoan(!hasLoan)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${hasLoan ? 'bg-primary' : 'bg-muted-foreground/30'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${hasLoan ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Scenarios */}
        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Payback Scenarios</h4>
          <div className="space-y-2">
            {[
              { label: "Conservative", salary: baseSalary * 0.75, color: "text-muted-foreground" },
              { label: "Average", salary: baseSalary, color: "text-foreground font-bold" },
              { label: "Optimistic", salary: baseSalary * 1.35, color: "text-primary font-bold" }
            ].map(scenario => (
              <div key={scenario.label} className="flex justify-between items-center text-sm">
                <span className={`w-24 ${scenario.color}`}>{scenario.label}</span>
                <span className="text-muted-foreground text-xs">{formatLakhs(scenario.salary)}</span>
                <span className={scenario.color}>~{calculatePayback(scenario.salary).toFixed(1)}y</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why this score */}
        <div className="bg-muted/30 p-3 rounded-lg border border-border/40">
          <p className="text-xs leading-relaxed text-foreground/80">
            <span className="font-bold">Analysis:</span> {getWhyText()}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-1.5 opacity-60">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <p className="text-[10px] leading-tight">
            Estimates are heuristic. Career outcomes vary based on specialization, skills, and market conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
