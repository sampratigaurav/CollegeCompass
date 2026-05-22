import type { Metadata } from "next";
import { CompareClient } from "@/components/compare/CompareClient";

export const metadata: Metadata = {
  title: "Compare Colleges",
  description:
    "Compare Indian colleges side-by-side. Analyze fees, NIRF rankings, placements, and ratings to make the best decision.",
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/5 via-background to-background border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Compare Colleges</h1>
          <p className="text-muted-foreground">
            Select 2–3 colleges to compare side-by-side. The better value is highlighted.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <CompareClient />
      </div>
    </div>
  );
}
