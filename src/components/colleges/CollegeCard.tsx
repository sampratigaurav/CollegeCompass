import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, TrendingUp, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CollegeCard as CollegeCardType } from "@/types";
import { motion } from "framer-motion";

interface CollegeCardProps {
  college: CollegeCardType;
  onCompareToggle?: (college: CollegeCardType) => void;
  isInCompare?: boolean;
}

function formatFees(min: number, max: number): string {
  const fmt = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
    return `₹${n}`;
  };
  if (min === max) return fmt(min);
  return `${fmt(min)} – ${fmt(max)}`;
}

const typeColors: Record<string, string> = {
  GOVERNMENT: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PRIVATE: "bg-blue-50 text-blue-700 border-blue-200",
  DEEMED: "bg-purple-50 text-purple-700 border-purple-200",
  AUTONOMOUS: "bg-orange-50 text-orange-700 border-orange-200",
};

export function CollegeCard({ college, onCompareToggle, isInCompare }: CollegeCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group overflow-hidden bg-card border border-border rounded-2xl hover:border-foreground/15 transition-colors relative shadow-subtle hover:shadow-elevated"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-muted">
        <Image
          src={college.image_url || "/images/fallback-college.jpg"}
          alt={`${college.name} campus`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* NIRF Badge */}
        {college.nirf_rank && (
          <Badge variant="glass" className="absolute top-3 left-3 text-cyan-400 font-bold border-cyan-400/30">
            <Trophy className="h-3 w-3 text-cyan-400 mr-1" />
            NIRF #{college.nirf_rank}
          </Badge>
        )}
        {/* Type Badge */}
        <div
          className={`absolute top-3 right-3 rounded-full border px-2 py-0.5 text-xs font-medium ${typeColors[college.type] ?? ""}`}
        >
          {college.type.charAt(0) + college.type.slice(1).toLowerCase()}
        </div>
      </div>

      <div className="p-4">
        {/* College Name */}
        <Link href={`/colleges/${college.slug}`}>
          <h3 className="font-semibold text-base leading-tight mb-1.5 line-clamp-2 hover:text-primary transition-colors">
            {college.name}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{college.location}</span>
        </div>

        {/* Tags */}
        {college.tags && college.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {college.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[9px] font-bold uppercase tracking-wider bg-muted border border-border rounded px-1.5 py-0.5 text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="rounded-lg bg-muted/60 px-2 py-1.5 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{college.rating.toFixed(1)}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Rating</p>
          </div>
          <div className="rounded-lg bg-muted/60 px-2 py-1.5 text-center">
            <div className="text-sm font-semibold mb-0.5 flex items-center justify-center gap-0.5">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              {college.placement_percentage}%
            </div>
            <p className="text-[10px] text-muted-foreground">Placed</p>
          </div>
          <div className="rounded-lg bg-muted/60 px-2 py-1.5 text-center">
            <div className="text-sm font-semibold mb-0.5">
              {formatFees(college.fees_min, college.fees_max).split(" ")[0]}
            </div>
            <p className="text-[10px] text-muted-foreground">Fees/yr</p>
          </div>
        </div>

        {/* Exams */}
        {college.exam.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-3">
            {college.exam.slice(0, 2).map((exam) => (
              <Badge
                key={exam}
                variant="secondary"
                className="text-[10px] px-1.5 py-0"
              >
                {exam}
              </Badge>
            ))}
            {college.exam.length > 2 && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                +{college.exam.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
          <Link
            href={`/colleges/${college.slug}`}
            className="flex-1 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary px-3 py-2 text-xs font-bold hover:bg-primary/20 interactive-glow transition-transform active:scale-[0.98]"
          >
            View Details
          </Link>
          {onCompareToggle && (
            <button
              onClick={() => onCompareToggle(college)}
              className={`flex-1 inline-flex items-center justify-center rounded-full border px-3 py-2 text-xs font-bold transition-transform active:scale-[0.98] ${
                isInCompare
                  ? "border-destructive/50 bg-destructive/10 text-destructive hover:bg-destructive/20 interactive-glow"
                  : "border-border hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {isInCompare ? "Remove" : "Compare"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
