"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, TrendingUp, Trophy, MapPin, X, Search, Plus, Bookmark, BookmarkCheck, Sparkles } from "lucide-react";
import { CollegeDetail } from "@/types";
import { EmptyState, ErrorState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserMemory } from "@/hooks/useUserMemory";

function formatFees(min: number, max: number): string {
  const fmt = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;
  return min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`;
}

function formatSalary(sal: number | null): string {
  if (!sal) return "N/A";
  return `${(sal / 100000).toFixed(1)} LPA`;
}

function Winner({
  values,
  bestIndex,
}: {
  values: (number | null)[];
  bestIndex: number;
}) {
  return (
    <span className="ml-2 inline-flex items-center rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
      WINNER
    </span>
  );
}

function CompareRow({
  label,
  values,
  format,
  highlight,
}: {
  label: string;
  values: (string | number | null)[];
  format?: (v: string | number | null) => string;
  highlight?: "low" | "high";
}) {
  const formatted = values.map((v) => (format ? format(v) : String(v ?? "N/A")));
  let winnerIdx = -1;

  if (highlight && values.every((v) => v !== null)) {
    const nums = values.map(Number);
    winnerIdx =
      highlight === "high"
        ? nums.indexOf(Math.max(...nums))
        : nums.indexOf(Math.min(...nums));
  }

  return (
    <tr className="border-b border-border bg-card hover:bg-muted transition-colors">
      <td className="py-4 px-6 text-[13px] text-muted-foreground font-medium whitespace-nowrap sticky left-0 z-20 bg-card shadow-[4px_0_10px_rgba(0,0,0,0.05)] dark:shadow-[4px_0_10px_rgba(0,0,0,0.3)] border-r border-border">
        {label}
      </td>
      {formatted.map((val, i) => (
        <td
          key={i}
          className={`py-4 px-6 text-[13px] font-medium text-center ${
            i === winnerIdx ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {val}
          {i === winnerIdx && <Winner values={[]} bestIndex={i} />}
        </td>
      ))}
    </tr>
  );
}

function CompareTableSkeleton({ count }: { count: number }) {
  return (
    <div className="overflow-x-auto surface-bento">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/50 bg-muted/20 sticky top-0 z-20">
            <th className="py-4 px-4 text-left text-sm font-semibold text-muted-foreground w-40">
              Metric
            </th>
            {Array.from({ length: count }, (_, i) => (
              <th key={i} className="py-4 px-4 text-center">
                <Skeleton className="h-24 w-full rounded-xl" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }, (_, i) => (
            <tr key={i} className="border-b border-border/50">
              <td className="py-3 px-4">
                <Skeleton className="h-4 w-24" />
              </td>
              {Array.from({ length: count }, (_, j) => (
                <td key={j} className="py-3 px-4">
                  <Skeleton className="h-4 w-20 mx-auto" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawIds = searchParams.get("ids") ?? "";
  const ids = rawIds
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);

  const [colleges, setColleges] = useState<CollegeDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tradeoffs, setTradeoffs] = useState<{ loading: boolean, text?: string }>({ loading: false });

  const { addRecentComparison, logActivity, toggleSavedComparison, savedComparisons } = useUserMemory();

  useEffect(() => {
    if (ids.length < 1) return;

    const fetchCompare = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids }),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.error);
        setColleges(json.data);
        
        if (json.data.length >= 2) {
          const c1 = json.data[0];
          const c2 = json.data[1];
          addRecentComparison({
            college1: { id: c1.id, name: c1.name, slug: c1.slug },
            college2: { id: c2.id, name: c2.name, slug: c2.slug },
          });
          logActivity('compare', `Compared ${c1.name} and ${c2.name}`, `/compare?ids=${rawIds}`);
          // Auto-fetch insights once colleges are loaded
          setTradeoffs({ loading: true });
          fetch("/api/insights", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "COMPARE_TRADEOFFS", payload: { colleges: json.data } })
          }).then(r => r.json()).then(d => {
            setTradeoffs({ loading: false, text: d.insight });
          }).catch(() => {
            setTradeoffs({ loading: false, text: undefined });
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load comparison");
      } finally {
        setLoading(false);
      }
    };

    fetchCompare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawIds]);

  const removeCollege = (slug: string) => {
    const newIds = ids.filter((id) => id !== slug);
    router.push(newIds.length > 0 ? `/compare?ids=${newIds.join(",")}` : "/compare");
  };

  if (ids.length === 0) {
    return (
      <EmptyState
        icon="compare"
        title="No colleges selected"
        description="Select 2–3 colleges to compare side-by-side. Or try a trending comparison below."
        action={
          <div className="flex flex-col gap-4 mt-4">
            <Link
              href="/colleges"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 shadow-elevated transition-transform active:scale-[0.98]"
            >
              <Search className="h-4 w-4" />
              Browse Colleges
            </Link>
            
            <div className="mt-8 text-left border-t border-border pt-8">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-4">Trending Comparisons</p>
              <div className="flex flex-col gap-2">
                <Link href="/compare?ids=iit-madras,iit-delhi" className="text-sm font-medium hover:text-primary transition-colors flex items-center justify-between bg-muted border border-border rounded-lg p-3 hover:bg-muted/80">
                  <span>IIT Madras vs IIT Delhi</span>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link href="/compare?ids=bits-pilani,nit-surathkal" className="text-sm font-medium hover:text-primary transition-colors flex items-center justify-between bg-muted border border-border rounded-lg p-3 hover:bg-muted/80">
                  <span>BITS Pilani vs NIT Surathkal</span>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </div>
        }
      />
    );
  }

  if (error) return <ErrorState message={error} />;

  if (loading) return <CompareTableSkeleton count={ids.length} />;

  if (colleges.length < 2) {
    return (
      <EmptyState
        icon="compare"
        title="Not enough colleges"
        description="Select at least 2 colleges to compare. Some IDs may be invalid."
        action={
          <Link href="/colleges" className="rounded-full border border-border px-5 py-3 text-sm font-bold hover:bg-muted transition-transform active:scale-[0.98]">
            Browse Colleges
          </Link>
        }
      />
    );
  }

  const isSaved = colleges.length === 2 && savedComparisons?.some(
    c => 
      (c.college1.id === colleges[0].id && c.college2.id === colleges[1].id) ||
      (c.college1.id === colleges[1].id && c.college2.id === colleges[0].id)
  );

  const handleSave = () => {
    if (colleges.length !== 2) return;
    toggleSavedComparison({
      college1: { id: colleges[0].id, name: colleges[0].name, slug: colleges[0].slug },
      college2: { id: colleges[1].id, name: colleges[1].name, slug: colleges[1].slug }
    });
  };

  // Deterministic dimension winners (zero latency, no LLM)
  const getDimensionWinners = () => {
    if (colleges.length < 2) return [];
    const dims: { label: string; winner: string; detail: string }[] = [];

    // Best Placement
    const bestPlacement = [...colleges].sort((a, b) => (b.placement_percentage ?? 0) - (a.placement_percentage ?? 0))[0];
    if (bestPlacement.placement_percentage) {
      dims.push({ label: "Placements", winner: bestPlacement.name.split(" ").slice(0, 3).join(" "), detail: `${bestPlacement.placement_percentage}% placed` });
    }

    // Best Avg Salary
    const bestSalary = [...colleges].sort((a, b) => (b.avg_salary ?? 0) - (a.avg_salary ?? 0))[0];
    if (bestSalary.avg_salary) {
      dims.push({ label: "Avg Salary", winner: bestSalary.name.split(" ").slice(0, 3).join(" "), detail: formatSalary(bestSalary.avg_salary) });
    }

    // Lowest Fees
    const lowestFees = [...colleges].sort((a, b) => (a.fees_min ?? Infinity) - (b.fees_min ?? Infinity))[0];
    if (lowestFees.fees_min) {
      dims.push({ label: "Affordability", winner: lowestFees.name.split(" ").slice(0, 3).join(" "), detail: `from ${formatFees(lowestFees.fees_min, lowestFees.fees_max)}` });
    }

    // Best NIRF Rank
    const bestRank = [...colleges].filter(c => c.nirf_rank).sort((a, b) => (a.nirf_rank ?? 999) - (b.nirf_rank ?? 999))[0];
    if (bestRank?.nirf_rank) {
      dims.push({ label: "NIRF Rank", winner: bestRank.name.split(" ").slice(0, 3).join(" "), detail: `#${bestRank.nirf_rank}` });
    }

    return dims;
  };

  const dimensionWinners = getDimensionWinners();

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 px-4 md:px-0 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Comparison Matrix</h2>
          <p className="text-sm text-muted-foreground mt-1">Side-by-side analysis of selected institutions</p>
        </div>
        {colleges.length === 2 && (
          <button
            onClick={handleSave}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-transform active:scale-[0.98] ${
              isSaved 
                ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/15' 
                : 'bg-card border-border hover:bg-muted text-foreground'
            }`}
          >
            {isSaved ? (
              <><BookmarkCheck className="h-4 w-4" /> Session Saved</>
            ) : (
              <><Bookmark className="h-4 w-4" /> Save Session</>
            )}
          </button>
        )}
      </div>

      {/* Compare Insights Card — always visible, auto-loaded */}
      {colleges.length >= 2 && (
        <div className="mb-8 px-4 md:px-0">
          <div className="w-full p-5 rounded-2xl border border-border bg-card shadow-elevated overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.06),transparent_60%)] pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Compare Insights</p>
                <p className="text-[11px] text-muted-foreground">Deterministic highlights · Narrative analysis</p>
              </div>
            </div>

            {/* Dimension Winner Chips */}
            {dimensionWinners.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {dimensionWinners.map(dim => (
                  <div key={dim.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/60">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{dim.label}</span>
                    <span className="h-3 w-px bg-border" />
                    <span className="text-xs font-bold text-foreground">{dim.winner}</span>
                    <span className="text-[10px] text-muted-foreground">· {dim.detail}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Narrative */}
            <div className="border-t border-border/50 pt-4">
              {tradeoffs.loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-5/6" />
                  <Skeleton className="h-3.5 w-4/6" />
                </div>
              ) : tradeoffs.text ? (
                <p className="text-sm leading-relaxed text-foreground/90">{tradeoffs.text}</p>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Stacked Swipeable Cards (< 768px) */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-proximity gap-4 pb-4 -mx-4 px-4 hide-scrollbar">
        {colleges.map(college => (
          <div key={college.id} className="min-w-[85vw] snap-center bg-card rounded-2xl border border-border shadow-elevated p-5 relative">
            <button
              onClick={() => removeCollege(college.slug)}
              className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-muted border border-border hover:bg-red-500/20 text-muted-foreground hover:text-red-600 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-border shrink-0 bg-muted">
                <Image src={college.image_url || "/images/fallback-college.jpg"} alt={college.name} fill className="object-cover" />
              </div>
              <div className="pr-10">
                <Link href={`/colleges/${college.slug}`} className="text-base font-bold text-foreground hover:text-primary transition-colors line-clamp-2">
                  {college.name}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">{college.city}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              {[
                { label: "NIRF Rank", value: college.nirf_rank ? `#${college.nirf_rank}` : "Unranked" },
                { label: "Rating", value: `${college.rating.toFixed(1)} / 5` },
                { label: "Placement", value: `${college.placement_percentage}%` },
                { label: "Avg Salary", value: formatSalary(college.avg_salary) },
                { label: "Annual Fees", value: formatFees(college.fees_min, college.fees_min) },
                { label: "Type", value: college.type.charAt(0) + college.type.slice(1).toLowerCase() },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center py-2.5 border-b border-border/50 last:border-0">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  <span className="text-sm font-bold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
            <Link href={`/colleges/${college.slug}`} className="mt-6 w-full inline-flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 py-3 rounded-xl text-sm font-bold active:scale-[0.98] transition-all">
               View Full Details
            </Link>
          </div>
        ))}
      </div>

      {/* Desktop/Tablet Matrix (>= 768px) */}
      <div className="hidden md:block overflow-x-auto bg-card border border-border rounded-2xl shadow-elevated relative">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-background sticky top-0 z-30">
              <th className="py-5 px-6 text-left text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-40 sticky left-0 z-40 bg-background shadow-[4px_0_10px_rgba(0,0,0,0.05)] dark:shadow-[4px_0_10px_rgba(0,0,0,0.3)] border-r border-border">
                Metric
              </th>
            {colleges.map((college) => (
              <th key={college.id} className="py-5 px-6 text-center min-w-[180px]">
                <div className="relative mx-auto max-w-[200px]">
                  <button
                    onClick={() => removeCollege(college.slug)}
                    className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full bg-muted border border-border hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/30 flex items-center justify-center transition-colors shadow-lg"
                    title="Remove"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="relative h-24 w-full rounded-xl overflow-hidden mb-3 border border-border">
                    <Image
                      src={college.image_url || "/images/fallback-college.jpg"}
                      alt={college.name}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>
                  <Link
                    href={`/colleges/${college.slug}`}
                    className="text-sm font-bold leading-tight text-foreground hover:text-primary transition-colors line-clamp-2 block"
                  >
                    {college.name}
                  </Link>
                  <p className="text-[11px] text-muted-foreground mt-1 font-medium">{college.city}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-card">
          <CompareRow
            label="NIRF Rank"
            values={colleges.map((c) => c.nirf_rank)}
            format={(v) => (v ? `#${v}` : "Unranked")}
            highlight="low"
          />
          <CompareRow
            label="Rating"
            values={colleges.map((c) => c.rating)}
            format={(v) => `${Number(v).toFixed(1)} / 5`}
            highlight="high"
          />
          <CompareRow
            label="Placement %"
            values={colleges.map((c) => c.placement_percentage)}
            format={(v) => `${v}%`}
            highlight="high"
          />
          <CompareRow
            label="Avg Salary"
            values={colleges.map((c) => c.avg_salary)}
            format={(v) => formatSalary(v as number | null)}
            highlight="high"
          />
          <CompareRow
            label="Annual Fees"
            values={colleges.map((c) => c.fees_min)}
            format={(v) =>
              formatFees(v as number, colleges.find((c) => c.fees_min === v)?.fees_max ?? (v as number))
            }
            highlight="low"
          />
          <CompareRow
            label="Location"
            values={colleges.map((c) => c.location)}
          />
          <CompareRow
            label="Type"
            values={colleges.map((c) => c.type.charAt(0) + c.type.slice(1).toLowerCase())}
          />
          <CompareRow
            label="Accreditation"
            values={colleges.map((c) => c.accreditation ?? "N/A")}
          />
          <CompareRow
            label="Established"
            values={colleges.map((c) => c.established ?? "N/A")}
          />
          <tr className="border-b border-border bg-card">
            <td className="py-4 px-6 text-[13px] text-muted-foreground font-medium whitespace-nowrap sticky left-0 z-20 bg-card shadow-[4px_0_10px_rgba(0,0,0,0.05)] dark:shadow-[4px_0_10px_rgba(0,0,0,0.3)] border-r border-border">Exams</td>
            {colleges.map((college) => (
              <td key={college.id} className="py-3 px-4 text-center">
                <div className="flex flex-wrap gap-1 justify-center">
                  {college.exam.slice(0, 2).map((e) => (
                    <Badge key={e} variant="secondary" className="text-[10px]">
                      {e}
                    </Badge>
                  ))}
                </div>
              </td>
            ))}
          </tr>
          <tr className="bg-card">
            <td className="py-4 px-6 text-[13px] text-muted-foreground font-medium whitespace-nowrap sticky left-0 z-20 bg-card shadow-[4px_0_10px_rgba(0,0,0,0.05)] dark:shadow-[4px_0_10px_rgba(0,0,0,0.3)] border-r border-border">Courses</td>
            {colleges.map((college) => (
              <td key={college.id} className="py-4 px-4 text-center text-xs text-muted-foreground">
                {college._count.courses} courses
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      </div>
    </>
  );
}

export function CompareClient() {
  return (
    <Suspense fallback={<CompareTableSkeleton count={3} />}>
      <CompareContent />
    </Suspense>
  );
}
