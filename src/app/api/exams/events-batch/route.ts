import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { examIds } = await req.json();
    if (!examIds || !Array.isArray(examIds)) {
      return NextResponse.json({ error: "Invalid examIds array" }, { status: 400 });
    }

    if (examIds.length === 0) {
      return NextResponse.json([]);
    }

    const events = await prisma.examEvent.findMany({
      where: {
        examId: { in: examIds },
        OR: [
          { endDate: { gte: new Date() } },
          { endDate: null, startDate: { gte: new Date() } }
        ]
      },
      include: {
        exam: {
          select: { name: true, slug: true, authority: true }
        }
      },
      orderBy: { startDate: 'asc' },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Batch events fetch error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
