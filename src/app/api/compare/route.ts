import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { CompareBodySchema } from "@/lib/validations";
import { successResponse, errorResponse } from "@/lib/api-response";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limiting — 30 compare requests per minute per IP
  const rl = rateLimit(request, { limit: 30 });
  if (!rl.success) {
    return errorResponse("Too many requests. Please wait before comparing again.", 429);
  }

  try {
    const body = await request.json();
    const parsed = CompareBodySchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message ?? "Invalid input", 422);
    }

    const { ids } = parsed.data;

    // Support both cuid and slug lookup
    const colleges = await prisma.college.findMany({
      where: {
        OR: [
          ...ids.map((id) => ({ id })),
          ...ids.map((id) => ({ slug: id })),
        ],
      },
      include: {
        courses: { orderBy: { fees: "asc" } },
        _count: { select: { reviews: true, courses: true } },
      },
    });

    if (colleges.length < 2) {
      return errorResponse(
        "Could not find enough colleges to compare. Please check the IDs.",
        404
      );
    }

    // Return in the requested order
    const ordered = ids
      .map((id) => colleges.find((c) => c.id === id || c.slug === id))
      .filter((c): c is NonNullable<typeof c> => c != null);

    return successResponse(ordered);
  } catch (error) {
    console.error("[POST /api/compare]", error);
    return errorResponse("Failed to compare colleges", 500);
  }
}
