import type { Metadata } from "next";
import { PredictorClient } from "@/components/predictor/PredictorClient";

export const metadata: Metadata = {
  title: "College Admission Predictor",
  description:
    "Predict your college admission chances based on your JEE, NEET, or CAT rank. Get High/Medium/Low chance predictions for top Indian colleges.",
};

export default function PredictorPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/5 via-background to-background border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            College Admission Predictor
          </h1>
          <p className="text-muted-foreground">
            Enter your exam and rank to discover which colleges you have the best chances of getting into.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <PredictorClient />
      </div>
    </div>
  );
}
