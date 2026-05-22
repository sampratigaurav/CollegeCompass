import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { PredictBodySchema } from "@/lib/validations";
import { successResponse, errorResponse } from "@/lib/api-response";
import { rateLimit } from "@/lib/rate-limit";

export type AdmissionChance = "High" | "Medium" | "Low";

export function calculateChance(
  rank: number,
  minRank: number,
  maxRank: number
): AdmissionChance {
  const range = maxRank - minRank;
  if (range <= 0) return "High";

  const position = rank - minRank;
  const ratio = position / range;

  if (ratio <= 0.2) return "High";
  if (ratio <= 0.6) return "Medium";
  return "Low";
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

    const { exam, rank } = parsed.data;

    // Find colleges where this rank falls within the accepted range
    const colleges = await prisma.college.findMany({
      where: {
        exam: { has: exam },
        min_rank: { not: null, lte: rank },
        max_rank: { gte: rank },
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
        _count: { select: { reviews: true, courses: true } },
        courses: {
          where: { name: { contains: "B.", mode: "insensitive" } },
          take: 3,
          select: { name: true, fees: true, duration: true },
        },
      },
      orderBy: [
        { nirf_rank: { sort: "asc", nulls: "last" } },
        { rating: "desc" },
      ],
    });

    // Annotate each college with admission chance
    const results = colleges.map((college) => ({
      ...college,
      chance: calculateChance(rank, college.min_rank!, college.max_rank!),
    }));

    // Sort: High > Medium > Low, then by NIRF rank
    const chanceOrder: Record<AdmissionChance, number> = {
      High: 0,
      Medium: 1,
      Low: 2,
    };
    results.sort((a, b) => chanceOrder[a.chance] - chanceOrder[b.chance]);

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
