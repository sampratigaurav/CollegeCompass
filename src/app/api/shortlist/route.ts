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

    const { collegeId } = await req.json();
    if (!collegeId) {
      return NextResponse.json({ error: "Missing collegeId" }, { status: 400 });
    }

    // Upsert to handle unique constraint safely
    const shortlist = await prisma.shortlist.upsert({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        collegeId,
      },
    });

    return NextResponse.json(shortlist);
  } catch (error) {
    console.error("Shortlist POST error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { collegeId } = await req.json();
    if (!collegeId) {
      return NextResponse.json({ error: "Missing collegeId" }, { status: 400 });
    }

    await prisma.shortlist.delete({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Shortlist DELETE error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
