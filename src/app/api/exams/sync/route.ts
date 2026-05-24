import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { examIds } = await req.json();
    if (!examIds || !Array.isArray(examIds)) {
      return NextResponse.json({ error: "Invalid examIds array" }, { status: 400 });
    }

    if (examIds.length === 0) {
      return NextResponse.json({ success: true, count: 0 });
    }

    // Prepare data array for createMany
    const data = examIds.map((examId) => ({
      userId: session.user.id,
      examId,
    }));

    // createMany with skipDuplicates ensures we don't throw 500 errors on unique constraint violations
    const result = await prisma.trackedExam.createMany({
      data,
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    console.error("Sync TrackedExams POST error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
