"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, SlidersHorizontal, X, ArrowUpDown, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { CollegeGridSkeleton } from "@/components/colleges/CollegeSkeleton";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState, ErrorState } from "@/components/shared/EmptyState";
import { CollegeCard as CollegeCardType, SortOption } from "@/types";
import { Badge } from "@/components/ui/badge";

const SORT_OPTIONS: { value: SortOption; label: string; order: "asc" | "desc" }[] = [
  { value: "nirf_rank", label: "Best NIRF Rank", order: "asc" },
  { value: "rating", label: "Highest Rated", order: "desc" },
  { value: "placement_percentage", label: "Best Placements", order: "desc" },
  { value: "fees_min", label: "Lowest Fees", order: "asc" },
  { value: "name", label: "A – Z", order: "asc" },
];

const STATES = [
  "All States",
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "West Bengal",
  "Uttar Pradesh",
  "Rajasthan",
  "Gujarat",
  "Punjab",
  "Goa",
];

const EXAMS = ["All Exams", "JEE Advanced", "JEE Main", "NEET UG", "CAT", "CLAT", "BITSAT", "VITEEE"];
const TYPES = ["All Types", "GOVERNMENT", "PRIVATE", "DEEMED", "AUTONOMOUS"];

interface CollegesClientProps {
  compareIds: string[];
  onCompareToggle: (college: CollegeCardType) => void;
}

export function CollegesClient({ compareIds, onCompareToggle }: CollegesClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial state from URL
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [state, setState] = useState(searchParams.get("state") ?? "");
  const [exam, setExam] = useState(searchParams.get("exam") ?? "");
  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) ?? "nirf_rank"
  );
  const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1", 10));

  const [colleges, setColleges] = useState<CollegeCardType[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 350);

  // Sync state to URL
  const syncToUrl = useCallback(
    (overrides: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(overrides).forEach(([k, v]) => {
        if (v) params.set(k, String(v));
        else params.delete(k);
      });
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    setError(null);

    const sortOpt = SORT_OPTIONS.find((s) => s.value === sort);
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (state) params.set("state", state);
    if (exam) params.set("exam", exam);
    if (type) params.set("type", type);
    params.set("sort", sort);
    params.set("order", sortOpt?.order ?? "asc");
    params.set("page", String(page));
    params.set("limit", "12");

    try {
      const res = await fetch(`/api/colleges?${params.toString()}`);
      const json = await res.json();

      if (!json.success) throw new Error(json.error);
      setColleges(json.data);
      setPagination(json.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load colleges");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, state, exam, type, sort, page]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
    syncToUrl({
      search: debouncedSearch,
      state,
      exam,
      type,
      sort,
      page: 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, state, exam, type, sort]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    syncToUrl({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeFilters = [state, exam, type].filter(Boolean).length;
  const clearFilters = () => {
    setState("");
    setExam("");
    setType("");
  };

  return (
    <div>
      {/* Search + Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="college-search"
            placeholder="Search colleges, cities, states, courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
          {loading && search && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 pr-10 text-sm text-white font-medium hover:bg-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
            id="sort-select"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`inline-flex items-center gap-2 h-10 rounded-lg border px-4 text-sm font-semibold transition-all relative ${filtersOpen ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilters > 0 && (
            <Badge className="h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {activeFilters}
            </Badge>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-5 mb-6 shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 block">State</label>
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value === "All States" ? "" : e.target.value)}
                    className="w-full h-10 appearance-none rounded-lg border border-white/10 bg-white/5 px-3 pr-10 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors hover:bg-white/10"
                  >
                    {STATES.map((s) => (
                      <option key={s} value={s === "All States" ? "" : s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Exam</label>
                <div className="relative">
                  <select
                    value={exam}
                    onChange={(e) => setExam(e.target.value === "All Exams" ? "" : e.target.value)}
                    className="w-full h-10 appearance-none rounded-lg border border-white/10 bg-white/5 px-3 pr-10 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors hover:bg-white/10"
                  >
                    {EXAMS.map((e) => (
                      <option key={e} value={e === "All Exams" ? "" : e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Type</label>
                <div className="relative">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value === "All Types" ? "" : e.target.value)}
                    className="w-full h-10 appearance-none rounded-lg border border-white/10 bg-white/5 px-3 pr-10 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors hover:bg-white/10"
                  >
                    {TYPES.map((t) => (
                      <option key={t} value={t === "All Types" ? "" : t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="sm:col-span-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      {!loading && !error && (
        <p className="text-sm text-muted-foreground mb-4">
          {pagination.total > 0 ? (
            <>
              <span className="font-medium text-foreground">{pagination.total}</span> colleges found
            </>
          ) : null}
        </p>
      )}

      {/* Grid */}
      {error ? (
        <ErrorState message={error} onRetry={fetchColleges} />
      ) : loading ? (
        <CollegeGridSkeleton count={12} />
      ) : colleges.length === 0 ? (
        <EmptyState
          icon="search"
          title="No colleges found"
          description="Try adjusting your search or filters. We have 25+ colleges across India."
          action={
            <button
              onClick={() => {
                setSearch("");
                clearFilters();
              }}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Clear search
            </button>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                onCompareToggle={onCompareToggle}
                isInCompare={compareIds.includes(college.id)}
              />
            ))}
          </div>
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
