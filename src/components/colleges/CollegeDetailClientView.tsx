"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  MapPin, Star, TrendingUp, Trophy, Globe, Calendar,
  BookOpen, Users, ArrowLeft, CheckCircle2, Building2, Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CollegeDetail } from "@/types";

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

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function CollegeDetailClientView({
  college,
  avgReviewRating,
}: {
  college: CollegeDetail;
  avgReviewRating: number;
}) {
  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Premium Cinematic Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={college.image_url || "/images/fallback-college.jpg"}
          alt={`${college.name} campus`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Radial + Linear Gradients for maximum premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15),transparent_50%)] mix-blend-screen" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        {/* Hero Content Animated */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 pb-8 z-20">
          <motion.div 
            className="mx-auto max-w-7xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {college.nirf_rank && (
              <motion.div variants={fadeIn} className="inline-flex items-center gap-1.5 rounded-md bg-yellow-500/20 border border-yellow-500/30 px-3 py-1 text-xs font-bold text-yellow-400 mb-3 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <Trophy className="h-3.5 w-3.5" />
                NIRF Rank #{college.nirf_rank}
              </motion.div>
            )}
            <motion.h1 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-white leading-tight font-heading tracking-tight drop-shadow-xl">
              {college.name}
            </motion.h1>
            <motion.div variants={fadeIn} className="flex items-center gap-2 mt-2 text-white/70 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              {college.location}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          {/* AI Summary Banner */}
          {college.ai_summary && (
            <motion.div variants={fadeIn} className="relative bg-[#111113] p-6 rounded-2xl mb-8 -mt-6 z-30 border border-primary/20 shadow-[0_10px_40px_rgba(124,58,237,0.15)] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(124,58,237,0.1),transparent_70%)] pointer-events-none" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-primary/20 p-2.5 rounded-xl border border-primary/30 shrink-0 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold text-primary tracking-widest uppercase mb-1.5 flex items-center gap-2">
                    AI Insights
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed font-medium">
                    {college.ai_summary.replace("**AI Summary**: ", "")}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stats Grid */}
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              {
                label: "Rating",
                value: college.rating.toFixed(1),
                icon: Star,
                sub: `${college._count.reviews} reviews`,
                color: "text-yellow-500",
                bg: "bg-yellow-500/10",
                border: "border-yellow-500/20"
              },
              {
                label: "Placements",
                value: `${college.placement_percentage}%`,
                icon: TrendingUp,
                sub: `Avg ${formatSalary(college.avg_salary)}`,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20"
              },
              {
                label: "Annual Fees",
                value: formatFees(college.fees_min),
                icon: BookOpen,
                sub: college.accreditation ?? "Accredited",
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
              },
              {
                label: "Established",
                value: college.established ?? "N/A",
                icon: Calendar,
                sub: college.type.charAt(0) + college.type.slice(1).toLowerCase(),
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20"
              },
            ].map(({ label, value, icon: Icon, sub, color, bg, border }) => (
              <motion.div
                variants={fadeIn}
                key={label}
                className="bg-[#111113] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.02] transition-colors group"
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${bg} ${border} border mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">{label}</p>
                <p className="text-2xl font-bold text-white font-heading">{value}</p>
                <p className="text-xs text-muted-foreground/70 mt-1 font-medium">{sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div variants={fadeIn} className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-8">
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
                <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {college.best_for.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        Best For
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {college.best_for.map(tag => (
                          <Badge key={tag} variant="neon-primary" className="text-xs px-3 py-1.5 font-bold uppercase tracking-wider">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h2 className="text-lg font-bold text-white mb-3">About</h2>
                    <p className="text-muted-foreground leading-relaxed text-[15px] font-medium">{college.description}</p>
                  </div>
                  
                  <div className="h-px w-full bg-white/5 my-8" />
                  
                  <div>
                    <h2 className="text-lg font-bold text-white mb-4">Key Details</h2>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        ["Location", college.location],
                        ["College Type", college.type.charAt(0) + college.type.slice(1).toLowerCase()],
                        ["Established", college.established ?? "N/A"],
                        ["Accreditation", college.accreditation ?? "N/A"],
                        ["NIRF Rank", college.nirf_rank ? `#${college.nirf_rank}` : "Unranked"],
                        ["Admission Exams", college.exam.join(", ") || "N/A"],
                      ].map(([key, val]) => (
                        <div key={key} className="rounded-xl bg-[#111113] border border-white/5 px-5 py-4 hover:border-white/10 transition-colors">
                          <dt className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{key}</dt>
                          <dd className="text-sm font-semibold text-white">{val}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </TabsContent>

                {/* Courses Tab */}
                <TabsContent value="courses" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h2 className="text-lg font-bold text-white mb-4">Offered Courses</h2>
                  <div className="space-y-3">
                    {college.courses.length === 0 ? (
                      <p className="text-muted-foreground text-sm font-medium">No courses listed.</p>
                    ) : (
                      college.courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between bg-[#111113] border border-white/5 rounded-xl px-6 py-5 hover:bg-white/[0.02] hover:border-white/15 transition-all group"
                        >
                          <div>
                            <p className="font-bold text-[15px] text-white group-hover:text-primary transition-colors">{course.name}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{course.duration}</Badge>
                              {course.seats && <span className="text-xs font-medium text-muted-foreground">{course.seats} seats</span>}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-base text-white">
                              {formatFees(course.fees)}
                            </p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">per year</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                {/* Placements Tab */}
                <TabsContent value="placements" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-4">Placement Statistics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        {
                          label: "Placement Rate",
                          value: `${college.placement_percentage}%`,
                          icon: TrendingUp,
                          color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                        },
                        {
                          label: "Average Salary",
                          value: formatSalary(college.avg_salary),
                          icon: Building2,
                          color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                        },
                        {
                          label: "Students Placed",
                          value: "800+",
                          icon: Users,
                          color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                        },
                      ].map(({ label, value, icon: Icon, color }) => (
                        <div key={label} className={`rounded-2xl border p-6 flex flex-col items-center justify-center text-center ${color}`}>
                          <Icon className="h-6 w-6 mb-3" />
                          <p className="text-3xl font-bold font-heading">{value}</p>
                          <p className="text-xs font-bold uppercase tracking-wider mt-2 opacity-80">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="rounded-2xl border border-white/5 bg-[#111113] p-6">
                    <h3 className="font-bold text-sm text-white mb-4">Top Recruiters</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Google", "Microsoft", "Amazon", "Goldman Sachs", "McKinsey", "Deloitte", "Infosys", "TCS", "Wipro", "Flipkart"].map((co) => (
                        <Badge key={co} variant="secondary" className="px-3 py-1 font-semibold text-xs">
                          {co}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center justify-between bg-[#111113] border border-white/5 rounded-2xl p-6">
                    <div>
                      <h2 className="text-lg font-bold text-white">Student Reviews</h2>
                      <p className="text-sm font-medium text-muted-foreground mt-1">Based on verified student feedback</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-3xl font-bold text-white font-heading">{avgReviewRating.toFixed(1)}</span>
                      <StarRating rating={avgReviewRating} />
                    </div>
                  </div>

                  {college.reviews.length === 0 ? (
                    <p className="text-muted-foreground text-sm font-medium">No reviews yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {college.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-[#111113] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{review.author}</span>
                                {review.verified && (
                                  <Badge variant="glass" className="text-[9px] uppercase tracking-wider text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
                                    <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                                  </Badge>
                                )}
                              </div>
                              {review.batch && (
                                <span className="text-xs font-medium text-muted-foreground mt-1 block">
                                  Class of {review.batch}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-bold text-white">
                                {review.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <p className="text-[15px] font-medium text-white/80 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={fadeIn} className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-[#111113] border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl">
                <h3 className="font-bold text-base text-white mb-5 flex items-center gap-2">
                  Quick Actions
                </h3>
                <Link
                  href={`/compare?ids=${college.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/10 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors active:scale-[0.98]"
                >
                  Compare College
                </Link>
                {college.min_rank && (
                  <Link
                    href={`/predictor?exam=${encodeURIComponent(college.exam[0] ?? "")}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground shadow-[0_0_20px_rgba(124,58,237,0.3)] px-5 py-3.5 text-sm font-bold hover:bg-primary/90 transition-transform active:scale-[0.98]"
                  >
                    Check My Chances
                  </Link>
                )}
                {college.website && (
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-transparent border border-white/5 px-5 py-3.5 text-sm font-bold text-muted-foreground hover:bg-white/5 hover:text-white transition-colors active:scale-[0.98]"
                  >
                    <Globe className="h-4 w-4" />
                    Official Website
                  </a>
                )}
              </div>

              {/* Admission Info */}
              {(college.min_rank || college.max_rank) && (
                <div className="bg-[#111113] border border-white/5 rounded-2xl p-6 shadow-xl">
                  <h3 className="font-bold text-base text-white mb-5">Admission Range</h3>
                  <div className="space-y-3">
                    {college.min_rank && (
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-medium text-muted-foreground">Min Rank</span>
                        <span className="text-sm font-bold text-white">{college.min_rank.toLocaleString()}</span>
                      </div>
                    )}
                    {college.max_rank && (
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-medium text-muted-foreground">Max Rank</span>
                        <span className="text-sm font-bold text-white">{college.max_rank.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="h-px w-full bg-white/5 my-4" />
                    <div className="flex gap-2 flex-wrap">
                      {college.exam.map((e) => (
                        <Badge key={e} variant="secondary" className="text-[10px] font-bold uppercase tracking-wider">
                          {e}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
