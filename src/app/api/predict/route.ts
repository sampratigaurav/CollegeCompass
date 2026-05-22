import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { PredictBodySchema } from "@/lib/validations";
import { successResponse, errorResponse } from "@/lib/api-response";
import { rateLimit } from "@/lib/rate-limit";

export type AdmissionChance = "High" | "Medium" | "Low";

export function calculateMatchScore(
  rank: number,
  minRank: number,
  maxRank: number,
  feesMin: number,
  state: string,
  userBudget?: number,
  userLocation?: string
): { chance: AdmissionChance; match_score: number } {
  let score = 0;
  
  // Rank Match (40 points)
  if (rank <= minRank) {
    score += 40;
  } else if (rank <= maxRank) {
    const range = maxRank - minRank;
    const pos = rank - minRank;
    score += 40 * (1 - (pos / range));
  } else {
    const overflow = rank - maxRank;
    if (overflow < maxRank * 0.1) score += 10;
  }

  // Budget Match (30 points)
  if (!userBudget) {
    score += 30;
  } else {
    if (feesMin <= userBudget) score += 30;
    else if (feesMin <= userBudget * 1.2) score += 15;
  }

  // Location Match (30 points)
  if (!userLocation) {
    score += 30;
  } else {
    if (state.toLowerCase() === userLocation.toLowerCase()) score += 30;
  }

  const match_score = Math.round(score);
  
  let chance: AdmissionChance = "Low";
  if (match_score >= 80) chance = "High";
  else if (match_score >= 50) chance = "Medium";

  return { chance, match_score };
}

export async function POST(request: NextRequest) {
  // Rate limiting — 15 predict requests per minute per IP
  const rl = rateLimit(request, { limit: 15 });
  if (!rl.success) {
    return errorResponse("Too many requests. Please wait before trying again.", 429);
  }

  try {
    const body = await request.json();
    const parsed = PredictBodySchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    }

    const { exam, rank, budget, location } = parsed.data;

    // Find colleges where this rank falls within the accepted range
    const colleges = await prisma.college.findMany({
      where: {
        exam: { has: exam },
        // Instead of hard filtering min_rank/max_rank, we allow slightly above bounds to calculate score
        min_rank: { not: null },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        location: true,
        state: true,
        city: true,
        fees_min: true,
        fees_max: true,
        rating: true,
        nirf_rank: true,
        placement_percentage: true,
        avg_salary: true,
        image_url: true,
        type: true,
        accreditation: true,
        exam: true,
        established: true,
        min_rank: true,
        max_rank: true,
        tags: true,
        best_for: true,
        ai_summary: true,
        _count: { select: { reviews: true, courses: true } },
        courses: {
          where: { name: { contains: "B.", mode: "insensitive" } },
          take: 3,
          select: { name: true, fees: true, duration: true },
        },
      },
    });

    // Annotate each college with admission chance and match score
    const results = colleges
      .map((college) => {
        const { chance, match_score } = calculateMatchScore(
          rank,
          college.min_rank!,
          college.max_rank!,
          college.fees_min,
          college.state,
          budget,
          location
        );
        return { ...college, chance, match_score };
      })
      .filter((c) => c.match_score > 0); // Remove zero matches

    // Sort: Highest Match Score first
    results.sort((a, b) => b.match_score - a.match_score);

    return successResponse({
      results,
      meta: {
        exam,
        rank,
        totalMatches: results.length,
        highChance: results.filter((r) => r.chance === "High").length,
        mediumChance: results.filter((r) => r.chance === "Medium").length,
        lowChance: results.filter((r) => r.chance === "Low").length,
      },
    });
  } catch (error) {
    console.error("[POST /api/predict]", error);
    return errorResponse("Failed to run prediction", 500);
  }
}
