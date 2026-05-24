import { prisma } from "@/lib/db";
import { ExamsClientView } from "./ExamsClientView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exam Calendar & Timeline",
  description: "Track important registration and exam dates for JEE Main, NEET UG, BITSAT, and more.",
};

export const revalidate = 3600; // Cache for 1 hour

export default async function ExamsPage() {
  // Fetch exams and their events
  const exams = await prisma.exam.findMany({
    include: {
      events: {
        orderBy: { startDate: "asc" },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return <ExamsClientView exams={exams} />;
}
