import type { Metadata } from "next";
import { Suspense } from "react";
import { CollegesPageWrapper } from "@/components/colleges/CollegesPageWrapper";
import { CollegeGridSkeleton } from "@/components/colleges/CollegeSkeleton";

export const metadata: Metadata = {
  title: "Explore Indian Colleges",
  description:
    "Browse 500+ Indian colleges with filters for location, fees, exam, and type. Compare NIRF rankings, placements, and fees.",
};

export default function CollegesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-background border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Explore Colleges</h1>
          <p className="text-muted-foreground">
            Discover top Indian colleges — filter by exam, location, fees, and more.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<CollegeGridSkeleton count={12} />}>
          <CollegesPageWrapper />
        </Suspense>
      </div>
    </div>
  );
}
