import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import WorkspaceClient from "./WorkspaceClient";

export default async function WorkspacePage() {
  const session = await getServerSession(authOptions);

  // If authenticated, fetch their server-side shortlist
  let serverShortlist: string[] = [];
  let serverColleges: any[] = [];

  if (session?.user?.id) {
    const list = await prisma.shortlist.findMany({
      where: { userId: session.user.id },
      select: { collegeId: true },
    });
    serverShortlist = list.map((item) => item.collegeId);

    serverColleges = await prisma.college.findMany({
      where: { id: { in: serverShortlist } },
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
      },
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 border-b border-border/40 pb-6">
        <h1 className="font-heading text-3xl font-bold tracking-tight mb-2">Your Workspace</h1>
        <p className="text-muted-foreground text-lg">
          Manage your shortlisted colleges, track application deadlines, and monitor your progress.
        </p>
      </div>

      <WorkspaceClient 
        session={session} 
        serverShortlist={serverShortlist} 
        serverColleges={serverColleges} 
      />
    </div>
  );
}
