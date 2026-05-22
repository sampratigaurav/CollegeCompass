"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star, TrendingUp, Trophy, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmptyState, ErrorState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import { PredictedCollege } from "@/types";

const EXAMS = ["JEE Advanced", "JEE Main", "NEET UG", "CAT", "CLAT"];

const chanceMeta = {
  High: {
    label: "High Chance",
    class: "bg-emerald-900/20 text-emerald-400 border-emerald-500/30 backdrop-blur-sm",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  },
  Medium: {
    label: "Medium Chance",
    class: "bg-amber-900/20 text-amber-400 border-amber-500/30 backdrop-blur-sm",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
  },
  Low: {
    label: "Low Chance",
    class: "bg-red-900/20 text-red-400 border-red-500/30 backdrop-blur-sm",
    dot: "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
  },
};

interface PredictorMeta {
  exam: string;
  rank: number;
  totalMatches: number;
  highChance: number;
  mediumChance: number;
  lowChance: number;
}

export function PredictorClient() {
  const [exam, setExam] = useState("JEE Main");
  const [rank, setRank] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictedCollege[] | null>(null);
  const [meta, setMeta] = useState<PredictorMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank || isNaN(Number(rank)) || Number(rank) <= 0) return;

    setLoading(true);
    setError(null);
    setResults(null);
    setMeta(null);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          exam, 
          rank: parseInt(rank, 10),
          ...(budget && { budget: parseInt(budget, 10) }),
          ...(location && { location })
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setResults(json.data.results);
      setMeta(json.data.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Predictor Form */}
      <div className="surface-bento p-6 mb-8 noise-bg">
        <h2 className="text-xl font-bold mb-4 font-heading">Enter Your Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Entrance Exam
              </label>
              <select
                id="predictor-exam"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {EXAMS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Your Rank
              </label>
              <Input
                id="predictor-rank"
                type="number"
                placeholder="e.g. 5000"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                min={1}
                className="h-11"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Max Budget / Year (Optional)
              </label>
              <Input
                id="predictor-budget"
                type="number"
                placeholder="e.g. 200000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                min={0}
                className="h-11"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Preferred State (Optional)
              </label>
              <Input
                id="predictor-location"
                type="text"
                placeholder="e.g. Karnataka"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="flex w-full sm:w-auto mt-4 sm:mt-0">
              <button
                type="submit"
                disabled={loading || !rank}
                id="predictor-submit"
                className="h-11 w-full px-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 interactive-glow transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Predict Matches
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results */}
      {error && <ErrorState message={error} onRetry={() => setError(null)} />}

      {results !== null && !error && (
        <>
          {/* Summary */}
          {meta && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">
                {meta.totalMatches > 0
                  ? `${meta.totalMatches} college${meta.totalMatches === 1 ? "" : "s"} match your profile`
                  : "No matches found"}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Based on {meta.exam} rank <strong>{meta.rank.toLocaleString()}</strong>
              </p>

              {meta.totalMatches > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    { label: "High Chance", count: meta.highChance, color: "text-emerald-600 bg-emerald-50" },
                    { label: "Medium Chance", count: meta.mediumChance, color: "text-yellow-600 bg-yellow-50" },
                    { label: "Low Chance", count: meta.lowChance, color: "text-red-600 bg-red-50" },
                  ].map(({ label, count, color }) => (
                    count > 0 && (
                      <div key={label} className={`rounded-full px-3 py-1 text-sm font-medium ${color}`}>
                        {count} {label}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          )}

          {results.length === 0 ? (
            <EmptyState
              icon="search"
              title="No colleges found"
              description={`No colleges accept ${exam} with a rank around ${Number(rank).toLocaleString()}. Try a different exam or rank.`}
            />
          ) : (
            <div className="space-y-4">
              {results.map((college) => {
                const chance = chanceMeta[college.chance];
                return (
                  <div
                    key={college.id}
                    className="flex flex-col sm:flex-row gap-5 surface-bento p-5 gradient-border-hover transition-transform hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative h-28 sm:h-auto sm:w-36 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image
                        src={college.image_url || "/images/fallback-college.jpg"}
                        alt={college.name}
                        fill
                        className="object-cover"
                        sizes="144px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <Link
                            href={`/colleges/${college.slug}`}
                            className="font-semibold hover:text-primary transition-colors text-base leading-tight"
                          >
                            {college.name}
                          </Link>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            {college.location}
                          </div>
                        </div>
                        {/* Match Score */}
                        <div className="shrink-0 flex items-center gap-3">
                          <div
                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${chance.class}`}
                          >
                            <span className={`h-2 w-2 rounded-full ${chance.dot}`} />
                            {chance.label}
                          </div>
                          <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                              <path
                                className="text-muted/30"
                                strokeWidth="3"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className={`${college.match_score >= 80 ? 'text-emerald-500' : college.match_score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}
                                strokeDasharray={`${college.match_score}, 100`}
                                strokeWidth="3"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[10px] font-bold">{college.match_score}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-4 text-sm mt-2">
                        {college.nirf_rank && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Trophy className="h-3.5 w-3.5 text-yellow-500" />
                            NIRF #{college.nirf_rank}
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          {college.rating.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                          {college.placement_percentage}% placed
                        </div>
                        {college.min_rank && college.max_rank && (
                          <div className="text-xs text-muted-foreground">
                            Rank: {college.min_rank.toLocaleString()} – {college.max_rank.toLocaleString()}
                          </div>
                        )}
                      </div>

                      {/* Courses */}
                      {college.courses && college.courses.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {college.courses.slice(0, 2).map((c) => (
                            <Badge key={c.name} variant="secondary" className="text-[10px]">
                              {c.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action */}
                    <div className="flex sm:flex-col gap-2 items-center sm:items-end justify-end shrink-0">
                      <Link
                        href={`/colleges/${college.slug}`}
                        className="rounded-full bg-primary/10 text-primary px-5 py-2 text-xs font-bold hover:bg-primary/20 interactive-glow transition-transform active:scale-[0.98] whitespace-nowrap"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/compare?ids=${college.slug}`}
                        className="rounded-full border border-border px-5 py-2 text-xs font-bold text-muted-foreground hover:bg-muted transition-transform active:scale-[0.98] whitespace-nowrap"
                      >
                        Compare
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
