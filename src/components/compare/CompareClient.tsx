"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, TrendingUp, Trophy, MapPin, X, Search, Plus } from "lucide-react";
import { CollegeDetail } from "@/types";
import { EmptyState, ErrorState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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
    <tr className="border-b border-white/5 bg-[#111113] hover:bg-white/5 transition-colors">
      <td className="py-4 px-6 text-[13px] text-muted-foreground whitespace-nowrap">
        {label}
      </td>
      {formatted.map((val, i) => (
        <td
          key={i}
          className={`py-4 px-6 text-[13px] font-medium text-center ${
            i === winnerIdx ? "text-white" : "text-muted-foreground"
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black px-6 py-2.5 text-sm font-semibold hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform active:scale-[0.98]"
            >
              <Search className="h-4 w-4" />
              Browse Colleges
            </Link>
            
            <div className="mt-8 text-left border-t border-white/5 pt-8">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-4">Trending Comparisons</p>
              <div className="flex flex-col gap-2">
                <Link href="/compare?ids=indian-institute-of-technology-madras,indian-institute-of-technology-delhi" className="text-sm font-medium hover:text-primary transition-colors flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10">
                  <span>IIT Madras vs IIT Delhi</span>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link href="/compare?ids=indian-institute-of-science,indian-institute-of-technology-bombay" className="text-sm font-medium hover:text-primary transition-colors flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10">
                  <span>IISc Bangalore vs IIT Bombay</span>
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

  return (
    <div className="overflow-x-auto bg-[#111113] border border-white/5 rounded-2xl shadow-xl">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-[#09090b] sticky top-0 z-20">
            <th className="py-5 px-6 text-left text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-40">
              Metric
            </th>
            {colleges.map((college) => (
              <th key={college.id} className="py-5 px-6 text-center min-w-[180px]">
                <div className="relative mx-auto max-w-[200px]">
                  <button
                    onClick={() => removeCollege(college.slug)}
                    className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full bg-[#1a1a20] border border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 flex items-center justify-center transition-colors shadow-lg"
                    title="Remove"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="relative h-24 w-full rounded-xl overflow-hidden mb-3 border border-white/5">
                    <Image
                      src={college.image_url || "/images/fallback-college.jpg"}
                      alt={college.name}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent" />
                  </div>
                  <Link
                    href={`/colleges/${college.slug}`}
                    className="text-sm font-bold leading-tight text-white hover:text-primary transition-colors line-clamp-2 block"
                  >
                    {college.name}
                  </Link>
                  <p className="text-[11px] text-muted-foreground mt-1 font-medium">{college.city}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#111113]">
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
          <tr className="border-b border-white/5 bg-[#111113]">
            <td className="py-4 px-6 text-[13px] text-muted-foreground">Exams</td>
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
          <tr className="bg-[#111113]">
            <td className="py-4 px-6 text-[13px] text-muted-foreground">Courses</td>
            {colleges.map((college) => (
              <td key={college.id} className="py-4 px-4 text-center text-xs text-muted-foreground">
                {college._count.courses} courses
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function CompareClient() {
  return (
    <Suspense fallback={<CompareTableSkeleton count={3} />}>
      <CompareContent />
    </Suspense>
  );
}
