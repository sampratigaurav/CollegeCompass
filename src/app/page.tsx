import Link from "next/link";
import { Search, BarChart3, Zap, TrendingUp, Trophy, BookOpen, ArrowRight } from "lucide-react";

const stats = [
  { value: "25+", label: "Top Colleges", icon: BookOpen },
  { value: "NIRF", label: "2023 Rankings", icon: Trophy },
  { value: "4", label: "Entrance Exams", icon: TrendingUp },
  { value: "100%", label: "Real Data", icon: Zap },
];

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Search by college name, city, state, or course. Filter by fees, exam type, and college type with instant results.",
    href: "/colleges",
    cta: "Explore Colleges",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: BarChart3,
    title: "Side-by-Side Compare",
    description:
      "Compare 2–3 colleges across fees, NIRF rank, placements, and ratings. The better metric is highlighted automatically.",
    href: "/compare",
    cta: "Compare Now",
    color: "text-purple-500 bg-purple-50",
  },
  {
    icon: Zap,
    title: "Admission Predictor",
    description:
      "Enter your exam and rank to get High/Medium/Low admission chance predictions across top colleges.",
    href: "/predictor",
    cta: "Check Chances",
    color: "text-emerald-500 bg-emerald-50",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
            <Trophy className="h-3.5 w-3.5" />
            Based on NIRF 2023 Rankings
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Find Your{" "}
            <span className="text-primary">Perfect College</span> in India
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Search, compare, and predict admission chances for top Indian colleges —
            IITs, NITs, IIMs, and more. Real data. Zero guesswork.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/colleges"
              id="hero-explore-btn"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-primary/25 transition-all"
            >
              <Search className="h-5 w-5" />
              Explore Colleges
            </Link>
            <Link
              href="/predictor"
              id="hero-predictor-btn"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 text-base font-semibold hover:bg-muted transition-colors"
            >
              <Zap className="h-5 w-5" />
              Predict My Chances
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{value}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Everything You Need to Decide
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three powerful tools to help you discover the right college for your future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, href, cta, color }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4 ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {description}
              </p>
              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
              >
                {cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-2xl bg-primary/5 border border-primary/20 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to find your college?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of students who use CollegeCompass to make smarter admission decisions.
          </p>
          <Link
            href="/predictor"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Zap className="h-4 w-4" />
            Start Predicting — It's Free
          </Link>
        </div>
      </section>
    </div>
  );
}
