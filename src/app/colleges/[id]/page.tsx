import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Star, TrendingUp, Trophy, Globe, Calendar,
  BookOpen, Users, ArrowLeft, CheckCircle2, Building2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CollegeDetail } from "@/types";

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

function formatSalary(sal: number | null): string {
  if (!sal) return "N/A";
  return `${(sal / 100000).toFixed(1)} LPA`;
}

function formatFees(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L/yr`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K/yr`;
  return `₹${n}/yr`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
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
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={college.image_url || "/images/fallback-college.jpg"}
          alt={`${college.name} campus`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-transform active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        {/* College Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-6">
          <div className="mx-auto max-w-7xl">
            {college.nirf_rank && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/90 px-3 py-1 text-xs font-semibold text-white mb-2">
                <Trophy className="h-3.5 w-3.5" />
                NIRF Rank #{college.nirf_rank}
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {college.name}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-white/80 text-sm">
              <MapPin className="h-4 w-4" />
              {college.location}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 -mt-4 relative z-10">
          {[
            {
              label: "Rating",
              value: college.rating.toFixed(1),
              icon: Star,
              sub: `${college._count.reviews} reviews`,
              color: "text-yellow-500",
            },
            {
              label: "Placements",
              value: `${college.placement_percentage}%`,
              icon: TrendingUp,
              sub: `Avg ${formatSalary(college.avg_salary)}`,
              color: "text-emerald-500",
            },
            {
              label: "Annual Fees",
              value: formatFees(college.fees_min),
              icon: BookOpen,
              sub: college.accreditation ?? "Accredited",
              color: "text-blue-500",
            },
            {
              label: "Established",
              value: college.established ?? "N/A",
              icon: Calendar,
              sub: college.type.charAt(0) + college.type.slice(1).toLowerCase(),
              color: "text-purple-500",
            },
          ].map(({ label, value, icon: Icon, sub, color }) => (
            <div
              key={label}
              className="surface-bento p-5"
            >
              <div className={`flex items-center gap-2 mb-1 ${color}`}>
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
              </div>
              <p className="text-xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="mb-6 h-10">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">
                  Courses ({college._count.courses})
                </TabsTrigger>
                <TabsTrigger value="placements">Placements</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({college._count.reviews})
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-3">About</h2>
                  <p className="text-muted-foreground leading-relaxed">{college.description}</p>
                </div>
                <Separator />
                <div>
                  <h2 className="text-lg font-semibold mb-3">Key Details</h2>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      ["Location", college.location],
                      ["College Type", college.type.charAt(0) + college.type.slice(1).toLowerCase()],
                      ["Established", college.established ?? "N/A"],
                      ["Accreditation", college.accreditation ?? "N/A"],
                      ["NIRF Rank", college.nirf_rank ? `#${college.nirf_rank}` : "Unranked"],
                      ["Admission Exams", college.exam.join(", ") || "N/A"],
                    ].map(([key, val]) => (
                      <div key={key} className="rounded-lg bg-muted/40 px-4 py-3">
                        <dt className="text-xs text-muted-foreground mb-0.5">{key}</dt>
                        <dd className="text-sm font-medium">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses">
                <h2 className="text-lg font-semibold mb-4">Offered Courses</h2>
                <div className="space-y-3">
                  {college.courses.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No courses listed.</p>
                  ) : (
                    college.courses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between surface-bento px-5 py-4 gradient-border-hover transition-transform hover:-translate-y-0.5"
                      >
                        <div>
                          <p className="font-semibold text-sm">{course.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {course.duration}
                            {course.seats ? ` · ${course.seats} seats` : ""}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            {formatFees(course.fees)}
                          </p>
                          <p className="text-xs text-muted-foreground">per year</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Placements Tab */}
              <TabsContent value="placements" className="space-y-5">
                <h2 className="text-lg font-semibold">Placement Statistics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Placement Rate",
                      value: `${college.placement_percentage}%`,
                      icon: TrendingUp,
                      color: "bg-emerald-50 text-emerald-600",
                    },
                    {
                      label: "Average Salary",
                      value: formatSalary(college.avg_salary),
                      icon: Building2,
                      color: "bg-blue-50 text-blue-600",
                    },
                    {
                      label: "Students Placed",
                      value: "800+",
                      icon: Users,
                      color: "bg-purple-50 text-purple-600",
                    },
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div
                      key={label}
                      className={`surface-bento p-5`}
                    >
                      <Icon className={`h-6 w-6 mb-2 ${color.split(" ")[1]}`} />
                      <p className="text-2xl font-bold">{value}</p>
                      <p className="text-sm mt-0.5 opacity-80">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-border p-4">
                  <h3 className="font-medium mb-3">Top Recruiters</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Google", "Microsoft", "Amazon", "Goldman Sachs", "McKinsey", "Deloitte", "Infosys", "TCS", "Wipro", "Flipkart"].map((co) => (
                      <Badge key={co} variant="secondary" className="text-xs">
                        {co}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Student Reviews</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{avgReviewRating.toFixed(1)}</span>
                    <StarRating rating={avgReviewRating} />
                  </div>
                </div>

                {college.reviews.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No reviews yet.</p>
                ) : (
                  <div className="space-y-4">
                    {college.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="surface-bento p-5"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{review.author}</span>
                              {review.verified && (
                                <div className="flex items-center gap-1 text-emerald-600 text-xs">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Verified
                                </div>
                              )}
                            </div>
                            {review.batch && (
                              <span className="text-xs text-muted-foreground">
                                Batch of {review.batch}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">
                              {review.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick Actions */}
            <div className="surface-bento p-6 space-y-4">
              <h3 className="font-bold text-lg font-heading">Quick Actions</h3>
              <Link
                href={`/compare?ids=${college.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold hover:bg-muted transition-transform active:scale-[0.98]"
              >
                Compare with others
              </Link>
              {college.min_rank && (
                <Link
                  href={`/predictor?exam=${encodeURIComponent(college.exam[0] ?? "")}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 text-primary px-5 py-3 text-sm font-bold hover:bg-primary/20 transition-transform active:scale-[0.98] interactive-glow"
                >
                  Check My Chances
                </Link>
              )}
              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold hover:bg-muted transition-transform active:scale-[0.98] text-muted-foreground"
                >
                  <Globe className="h-4 w-4" />
                  Official Website
                </a>
              )}
            </div>

            {/* Admission Info */}
            {(college.min_rank || college.max_rank) && (
              <div className="surface-bento p-6 mt-6">
                <h3 className="font-bold text-lg font-heading mb-4">Admission Range</h3>
                <div className="space-y-2 text-sm">
                  {college.min_rank && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min Rank</span>
                      <span className="font-medium">{college.min_rank.toLocaleString()}</span>
                    </div>
                  )}
                  {college.max_rank && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Rank</span>
                      <span className="font-medium">{college.max_rank.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex gap-1.5 flex-wrap mt-2 pt-2 border-t border-border">
                    {college.exam.map((e) => (
                      <Badge key={e} variant="secondary" className="text-xs">
                        {e}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
