import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return errorResponse("College ID is required", 400);
    }

    // Support lookup by either cuid OR slug
    const college = await prisma.college.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        courses: { orderBy: { fees: "asc" } },
        reviews: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        _count: { select: { reviews: true, courses: true } },
      },
    });

    if (!college) {
      return errorResponse("College not found", 404);
    }

    return successResponse(college);
  } catch (error) {
    console.error("[GET /api/colleges/:id]", error);
    return errorResponse("Failed to fetch college details", 500);
  }
}
