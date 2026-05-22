import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q || q.length < 2) {
      return successResponse([]);
    }

    const suggestions = await prisma.college.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { location: { contains: q, mode: "insensitive" } },
          { slug: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        location: true,
        image_url: true,
        type: true,
      },
      take: 5,
    });

    return successResponse(suggestions);
  } catch (error) {
    console.error("[GET /api/search/suggestions]", error);
    return errorResponse("Failed to fetch suggestions", 500);
  }
}
