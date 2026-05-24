import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { budgetMax, type, priorities, stream } = body;
    // budgetMax: number (e.g. 500000)
    // type: string ("Any", "GOVERNMENT", "PRIVATE")
    // priorities: string[] (e.g. ["Placements", "Startup Culture", "Research"])

    const allColleges = await prisma.college.findMany({
      include: {
        courses: true
      }
    });

    const scoredColleges = allColleges.map(college => {
      let score = 100;
      const reasons: string[] = [];
      const excludeReasons: string[] = [];

      // 1. Budget Penalty
      if (budgetMax && college.fees_max > budgetMax) {
        score -= 40;
        excludeReasons.push(`Exceeds your budget preference of ₹${(budgetMax/100000).toFixed(1)}L`);
      } else if (budgetMax) {
        score += 10; // Bonus for being within budget
        reasons.push("Matches budget");
      }

      // 2. Type Penalty
      if (type && type !== "Any" && college.type !== type) {
        score -= 20;
        excludeReasons.push(`You preferred ${type} institutions`);
      } else if (type !== "Any") {
        score += 10;
        reasons.push(`${college.type === 'GOVERNMENT' ? 'Public' : 'Private'} institution`);
      }

      // 3. Priorities (Weighted Bonus)
      // Priorities are ordered. 1st: 30pts, 2nd: 20pts, 3rd: 10pts
      const allTags = [...(college.best_for || []), ...(college.tags || [])];
      
      priorities?.forEach((priority: string, index: number) => {
        const weight = index === 0 ? 30 : index === 1 ? 20 : 10;
        let matched = false;

        // Semantic mapping
        if (priority === "Placements" && (allTags.includes("Placements") || allTags.includes("Best Placements") || allTags.includes("High Placement %"))) {
          score += weight;
          matched = true;
          reasons.push("Strong placements");
        } else if (priority === "Startup Culture" && allTags.includes("Startup Culture")) {
          score += weight;
          matched = true;
          reasons.push("Vibrant startup ecosystem");
        } else if (priority === "Research" && allTags.includes("Research")) {
          score += weight;
          matched = true;
          reasons.push("Excellent research output");
        } else if (priority === "Academic Excellence" && (allTags.includes("Academic Excellence") || allTags.includes("Top Ranked"))) {
          score += weight;
          matched = true;
          reasons.push("Top ranked academics");
        }
      });

      // 4. Stream Penalty
      if (stream && college.streams && !college.streams.includes(stream)) {
        score -= 50; // Heavy penalty
        excludeReasons.push(`Does not offer ${stream} programs`);
      } else if (stream && college.streams && college.streams.includes(stream)) {
        score += 20;
        reasons.push(`Strong ${stream} department`);
      }

      // Normalize score to max 99 (never perfectly 100 to feel realistic)
      const maxPossible = 100 + 10 + 10 + 30 + 20 + 10; // 180
      let normalizedScore = Math.min(99, Math.max(0, Math.round((score / maxPossible) * 100)));
      
      // Bump up baseline so it doesn't look terrible
      if (normalizedScore < 30) normalizedScore += 30;

      // Generate narrative
      let narrative = "";
      if (excludeReasons.length > 0) {
        narrative = `Not recommended. ${excludeReasons.join(". ")}.`;
      } else if (reasons.length >= 2) {
        narrative = `Strong fit for students prioritizing ${reasons[0].toLowerCase()} and ${reasons[1].toLowerCase()}.`;
      } else if (reasons.length === 1) {
        narrative = `Good fit due to ${reasons[0].toLowerCase()}.`;
      } else {
        narrative = `Meets your baseline criteria.`;
      }

      return {
        ...college,
        matchScore: normalizedScore,
        narrative,
        excludedReasons: excludeReasons,
        isExcluded: excludeReasons.length > 0
      };
    });

    // Sort by score descending
    scoredColleges.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json(scoredColleges);
  } catch (error) {
    console.error("Discover API Error:", error);
    return NextResponse.json({ error: "Failed to compute recommendations" }, { status: 500 });
  }
}
