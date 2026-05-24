import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { successResponse, errorResponse } from "@/lib/api-response";

const ReviewSchema = z.object({
  collegeId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5),
  batch: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return errorResponse("Unauthorized. Please log in to submit a review.", 401);
    }

    // Verify user actually exists in DB (handles stale JWTs after DB resets)
    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!dbUser) {
      return errorResponse("User session invalid. Please log out and log back in.", 401);
    }

    const body = await request.json();
    const parsed = ReviewSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("Invalid input data", 400);
    }

    const { collegeId, rating, comment, batch } = parsed.data;

    // Check if college exists
    const college = await prisma.college.findUnique({
      where: { id: collegeId }
    });

    if (!college) {
      return errorResponse("College not found", 404);
    }

    // Optional: Check if user already reviewed this college
    const existingReview = await prisma.review.findFirst({
      where: {
        collegeId,
        userId: session.user.id
      }
    });

    if (existingReview) {
      return errorResponse("You have already reviewed this college.", 400);
    }

    const review = await prisma.review.create({
      data: {
        collegeId,
        userId: session.user.id,
        rating,
        comment,
        batch: batch || null,
        verified: false // Admins could flip this later
      }
    });

    return successResponse(review, { status: 201 });
  } catch (error) {
    console.error("[POST /api/colleges/review]", error);
    return errorResponse("Internal server error", 500);
  }
}
