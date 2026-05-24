import type { Metadata } from "next";
import { DiscoverClient } from "@/components/discover/DiscoverClient";

export const metadata: Metadata = {
  title: "Discover Colleges | Smart Match",
  description:
    "Find the best colleges for you based on your unique priorities, budget, and preferences.",
};

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <DiscoverClient />
    </div>
  );
}
