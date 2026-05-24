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

    const { examId } = await req.json();
    if (!examId) {
      return NextResponse.json({ error: "Missing examId" }, { status: 400 });
    }

    // Upsert to handle unique constraint safely
    const trackedExam = await prisma.trackedExam.upsert({
      where: {
        userId_examId: {
          userId: session.user.id,
          examId,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        examId,
      },
    });

    return NextResponse.json(trackedExam);
  } catch (error) {
    console.error("TrackExam POST error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { examId } = await req.json();
    if (!examId) {
      return NextResponse.json({ error: "Missing examId" }, { status: 400 });
    }

    await prisma.trackedExam.delete({
      where: {
        userId_examId: {
          userId: session.user.id,
          examId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // If it doesn't exist, deleting might throw P2025, which is fine
    console.error("TrackExam DELETE error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
