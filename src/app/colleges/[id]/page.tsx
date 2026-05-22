import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CollegeDetail } from "@/types";
import { CollegeDetailClientView } from "@/components/colleges/CollegeDetailClientView";

import { prisma } from "@/lib/db";

async function getCollege(id: string): Promise<CollegeDetail | null> {
  try {
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
    return college as unknown as CollegeDetail;
  } catch (error) {
    console.error("[getCollege Server]", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const college = await getCollege(id);

  if (!college) return { title: "College Not Found" };

  return {
    title: college.name,
    description: `${college.name} — ${college.location}. NIRF Rank: ${college.nirf_rank ?? "N/A"}. Placement: ${college.placement_percentage}%. Fees: ₹${(college.fees_min / 100000).toFixed(1)}L/yr.`,
    openGraph: {
      title: college.name,
      description: college.description.slice(0, 200),
      images: college.image_url ? [{ url: college.image_url }] : [],
    },
  };
}



export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const college = await getCollege(id);

  if (!college) notFound();

  const avgReviewRating =
    college.reviews.length > 0
      ? college.reviews.reduce((sum, r) => sum + r.rating, 0) / college.reviews.length
      : college.rating;

  return (
    <CollegeDetailClientView college={college} avgReviewRating={avgReviewRating} />
  );
}
