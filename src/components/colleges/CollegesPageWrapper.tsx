"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BarChart3, X } from "lucide-react";
import { CollegesClient } from "@/components/colleges/CollegesClient";
import { CollegeCard as CollegeCardType } from "@/types";
import Link from "next/link";

export function CollegesPageWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [compareList, setCompareList] = useState<CollegeCardType[]>([]);

  const handleCompareToggle = useCallback((college: CollegeCardType) => {
    setCompareList((prev) => {
      const exists = prev.find((c) => c.id === college.id);
      if (exists) return prev.filter((c) => c.id !== college.id);
      if (prev.length >= 3) return prev; // Max 3
      return [...prev, college];
    });
  }, []);

  const goToCompare = () => {
    const ids = compareList.map((c) => c.slug).join(",");
    router.push(`/compare?ids=${ids}`);
  };

  return (
    <>
      <CollegesClient
        compareIds={compareList.map((c) => c.id)}
        onCompareToggle={handleCompareToggle}
      />

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/95 backdrop-blur-xl px-4 py-3 shadow-2xl">
            <BarChart3 className="h-5 w-5 text-primary shrink-0" />
            <div className="flex-1 flex items-center gap-2 min-w-0">
              {compareList.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-1.5 bg-primary/10 text-primary rounded-full pl-2.5 pr-1 py-0.5 text-sm font-medium min-w-0"
                >
                  <span className="truncate max-w-[120px]">{c.name.split(" ").slice(0, 3).join(" ")}</span>
                  <button
                    onClick={() => handleCompareToggle(c)}
                    className="h-4 w-4 flex items-center justify-center rounded-full hover:bg-primary/20 transition-colors shrink-0"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {compareList.length < 3 && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  +{3 - compareList.length} more
                </span>
              )}
            </div>
            <button
              onClick={goToCompare}
              disabled={compareList.length < 2}
              className="shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              Compare {compareList.length}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
