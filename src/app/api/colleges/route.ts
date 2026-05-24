import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { CollegesQuerySchema } from "@/lib/validations";
import { successResponse, errorResponse } from "@/lib/api-response";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawParams = Object.fromEntries(searchParams.entries());

    const parsed = CollegesQuerySchema.safeParse(rawParams);
    if (!parsed.success) {
      const messages = parsed.error.issues.map((e) => e.message).join(", ");
      return errorResponse(messages, 422);
    }

    const {
      search,
      state,
      city,
      course,
      stream,
      exam,
      type,
      fees_min,
      fees_max,
      sort,
      order,
      page,
      limit,
    } = parsed.data;

    // Build WHERE clause
    const andClauses: Prisma.CollegeWhereInput[] = [];

    if (search) {
      const tokens = search.trim().split(/\s+/);
      const searchConditions: Prisma.CollegeWhereInput[] = tokens.map((token) => ({
        OR: [
          { name: { contains: token, mode: "insensitive" } },
          { slug: { contains: token, mode: "insensitive" } },
          { city: { contains: token, mode: "insensitive" } },
          { state: { contains: token, mode: "insensitive" } },
          {
            courses: {
              some: { name: { contains: token, mode: "insensitive" } },
            },
          },
        ],
      }));
      andClauses.push({ AND: searchConditions });
    }
    if (state) andClauses.push({ state: { contains: state, mode: "insensitive" } });
    if (city) andClauses.push({ city: { contains: city, mode: "insensitive" } });
    if (type) andClauses.push({ type });
    if (stream) andClauses.push({ streams: { has: stream } });
    if (exam) andClauses.push({ exam: { has: exam } });
    if (fees_min !== undefined) andClauses.push({ fees_min: { gte: fees_min } });
    if (fees_max !== undefined) andClauses.push({ fees_max: { lte: fees_max } });
    if (course) {
      andClauses.push({
        courses: {
          some: { name: { contains: course, mode: "insensitive" } },
        },
      });
    }

    const where: Prisma.CollegeWhereInput =
      andClauses.length > 0 ? { AND: andClauses } : {};

    // Build ORDER BY — nulls last for nirf_rank
    let orderBy: Prisma.CollegeOrderByWithRelationInput[] | undefined;
    if (sort === "nirf_rank") {
      orderBy = [{ nirf_rank: { sort: order, nulls: "last" } }];
    } else if (sort !== "roi") {
      orderBy = [{ [sort]: order }];
    }

    const skip = (page - 1) * limit;

    // Run count + data queries in parallel
    const [total, rawColleges] = await Promise.all([
      prisma.college.count({ where }),
      prisma.college.findMany({
        where,
        orderBy,
        skip: sort === "roi" ? 0 : skip,
        take: sort === "roi" ? undefined : limit,
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
          streams: true,
          _count: { select: { reviews: true, courses: true } },
        },
      }),
    ]);

    let colleges = rawColleges;

    // Handle ROI Sort in memory
    if (sort === "roi") {
      colleges.sort((a, b) => {
        const roiA = (a.avg_salary && a.fees_min && a.fees_min > 0) ? a.avg_salary / a.fees_min : 0;
        const roiB = (b.avg_salary && b.fees_min && b.fees_min > 0) ? b.avg_salary / b.fees_min : 0;
        return order === "desc" ? roiB - roiA : roiA - roiB;
      });
      colleges = colleges.slice(skip, skip + limit);
    }

    return successResponse(colleges, {
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[GET /api/colleges]", error);
    return errorResponse("Failed to fetch colleges", 500);
  }
}
