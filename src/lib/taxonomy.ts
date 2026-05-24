import { Cpu, Stethoscope, Briefcase, Scale, FlaskConical, BookOpen } from "lucide-react";
import { ReactNode } from "react";

export type StreamDef = {
  id: string;
  label: string;
  colorClass: string;
  bgClass: string;
  icon: any; // Lucide icon
};

export const STREAMS: Record<string, StreamDef> = {
  "Engineering": {
    id: "Engineering",
    label: "Engineering",
    colorClass: "text-blue-500",
    bgClass: "bg-blue-500/10",
    icon: Cpu,
  },
  "Medical": {
    id: "Medical",
    label: "Medical",
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
    icon: Stethoscope,
  },
  "Management": {
    id: "Management",
    label: "Management",
    colorClass: "text-purple-500",
    bgClass: "bg-purple-500/10",
    icon: Briefcase,
  },
  "Law": {
    id: "Law",
    label: "Law",
    colorClass: "text-amber-500",
    bgClass: "bg-amber-500/10",
    icon: Scale,
  },
  "Science": {
    id: "Science",
    label: "Science",
    colorClass: "text-cyan-500",
    bgClass: "bg-cyan-500/10",
    icon: FlaskConical,
  },
  "Arts": {
    id: "Arts",
    label: "Arts & Humanities",
    colorClass: "text-rose-500",
    bgClass: "bg-rose-500/10",
    icon: BookOpen,
  }
};
