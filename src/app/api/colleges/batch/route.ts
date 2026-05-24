import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ids } = await req.json();
    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid ids array" }, { status: 400 });
    }

    const colleges = await prisma.college.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        name: true,
        city: true,
        state: true,
        type: true,
        image_url: true,
        rating: true,
        fees_max: true,
        placement_percentage: true,
        avg_salary: true,
        slug: true,
      },
    });

    return NextResponse.json(colleges);
  } catch (error) {
    console.error("Batch fetch error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
