import { Metadata } from "next";
import { WizardClient } from "@/components/wizard/WizardClient";

export const metadata: Metadata = {
  title: "Find My College | CollegeCompass",
  description: "Take our 1-minute guided interactive wizard to find your perfect college match based on your unique profile and preferences.",
};

export default function WizardPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden flex flex-col">
      <WizardClient />
    </div>
  );
}
