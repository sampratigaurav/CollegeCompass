import { prisma } from "@/lib/db";
import { HomePageClientView } from "@/components/home/HomePageClientView";

export default async function HomePage() {
  // Fetch live data from database
  const topColleges = await prisma.college.findMany({
    where: { nirf_rank: { not: null } },
    orderBy: { nirf_rank: "asc" },
    take: 10,
    include: { courses: { take: 1 } }
  });

  const rank1 = topColleges[0];
  const trends = topColleges.slice(0, 3);
  const featured = topColleges.find((c) => c.nirf_rank === 5) || topColleges[4] || topColleges[0];
  
  // Pick 3 colleges for the compare matrix
  const compareColleges = topColleges.slice(3, 6); // Ranks 4, 5, 6

  // Dashboard Stats
  const totalColleges = await prisma.college.count();
  const avgFeesAgg = await prisma.college.aggregate({ _avg: { fees_min: true } });
  const avgFees = avgFeesAgg._avg.fees_min || 0;
  const topPlacementAgg = await prisma.college.aggregate({ _max: { placement_percentage: true } });
  const topPlacement = topPlacementAgg._max.placement_percentage || 0;
  const uniqueStates = await prisma.college.groupBy({ by: ['state'] });
  const statesCovered = uniqueStates.length;

  // Exams
  const exams = await prisma.exam.findMany({ take: 3 });

  const initialData = {
    topColleges,
    rank1,
    trends,
    featured,
    compareColleges,
    stats: {
      totalColleges,
      avgFees,
      topPlacement,
      statesCovered
    },
    exams
  };

  return <HomePageClientView initialData={initialData} />;
}
