import Link from "next/link";
import Image from "next/image";
import { Calendar, Play, Building2, Map, Wallet, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/db";
import { SearchBar } from "@/components/shared/SearchBar";

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

  const formatLPA = (val: number | null) => val ? `₹${(val / 100000).toFixed(1)} LPA` : "N/A";

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white selection:bg-primary/30 font-sans">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-block rounded-full bg-primary/10 border border-primary/20 px-3 py-1 mb-6 text-[10px] font-bold text-primary tracking-widest uppercase">
          AI-Powered Admissions 2.0
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 font-heading">
          Navigate Your Future with <span className="text-[#a78bfa]">Precision</span><br className="hidden sm:block" /> <span className="text-[#34d399]">Data.</span>
        </h1>
        
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-10">
          Stop guessing your chances. Use real-time NIRF rankings and historic admission trends to predict your dream college placement.
        </p>

        {/* Search Bar with Predict Button */}
        <div className="relative max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center bg-[#1a1a20] border border-white/10 rounded-full p-2 pl-6 shadow-2xl focus-within:border-primary/50 transition-colors gap-3 sm:gap-0 relative z-50">
            <SearchBar />
            <Link 
              href="/predictor"
              className="bg-[#c084fc] hover:bg-[#a855f7] text-white rounded-full px-6 py-2.5 text-sm font-medium transition-transform active:scale-[0.98] shadow-[0_0_15px_rgba(192,132,252,0.3)] shrink-0 whitespace-nowrap w-full sm:w-auto text-center z-10"
            >
              Predict My<br className="hidden sm:block" />Chances
            </Link>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: "Total Colleges", value: totalColleges.toLocaleString(), icon: Building2 },
            { label: "Average Fees", value: `₹${(avgFees / 100000).toFixed(1)}L/yr`, icon: Wallet },
            { label: "Top Placement", value: `${topPlacement}%`, icon: TrendingUp },
            { label: "States Covered", value: statesCovered.toLocaleString(), icon: Map },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="surface-bento rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center bg-[#121217]">
              <div className="bg-white/5 p-2 rounded-lg mb-2">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xl font-bold">{value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Top Left: Admission Gauge */}
          <div className="md:col-span-7 surface-bento rounded-2xl p-6 border border-white/5 flex flex-col justify-between relative overflow-hidden bg-[#121217]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-[10px] font-bold text-muted-foreground tracking-widest mb-1 uppercase">Admission Gauge</h3>
                <p className="text-sm font-semibold">Your Real-time Probability</p>
              </div>
              <div className="flex items-center gap-1.5 bg-[#064e3b]/30 border border-[#059669]/30 text-[#34d399] px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-pulse" />
                Live Data
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Circular Gauge */}
              <div className="relative h-32 w-32 shrink-0">
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#2a2a35" strokeWidth="6" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#c084fc" strokeWidth="6" strokeDasharray="283" strokeDashoffset="70" className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold font-heading">75%</span>
                  <span className="text-[10px] text-muted-foreground">Match</span>
                </div>
              </div>

              {/* Targets (Wired to Top College) */}
              {rank1 && (
                <div className="flex-1 space-y-3 w-full">
                  <div className="bg-[#1a1a20] border border-white/5 rounded-lg p-4">
                    <p className="text-[10px] font-bold text-muted-foreground tracking-wider mb-1">TARGET</p>
                    <p className="text-sm font-medium">{rank1.name} – {rank1.courses[0]?.name || "Computer Science"}</p>
                  </div>
                  <div className="bg-[#1a1a20] border border-white/5 rounded-lg p-4">
                    <p className="text-[10px] font-bold text-muted-foreground tracking-wider mb-1">HISTORIC CUTOFF</p>
                    <p className="text-sm font-medium">AIR {rank1.min_rank ?? 100} - {rank1.max_rank ?? 500} (General)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Top Right: Top NIRF Trends */}
          <div className="md:col-span-5 surface-bento rounded-2xl p-6 border border-white/5 flex flex-col justify-between bg-[#121217]">
            <h3 className="text-[10px] font-bold text-muted-foreground tracking-widest mb-6 uppercase">Top NIRF Trends</h3>
            <div className="space-y-4 mb-6">
              {trends.map((item, index) => {
                const isHighlight = index === 1;
                return (
                  <Link href={`/colleges/${item.slug}`} key={item.id} className="flex items-center gap-4 group cursor-pointer">
                    <div className={`w-10 h-10 rounded border flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${isHighlight ? 'text-[#34d399] border-[#34d399]/30 bg-[#064e3b]/10 group-hover:bg-[#064e3b]/20' : 'text-muted-foreground border-white/10 bg-[#1a1a20] group-hover:bg-[#1a1a20]/80'}`}>
                      0{index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase">
                        Rank {item.nirf_rank} {index === 0 ? "(CONSISTENT)" : index === 1 ? "(UP 1%)" : "(STABLE)"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link href="/colleges" className="block w-full py-3 text-center border border-white/10 rounded-lg text-xs font-bold tracking-wider hover:bg-white/5 transition-colors">
              VIEW FULL LIST
            </Link>
          </div>

          {/* Bottom Left: Featured Image */}
          {featured && (
            <Link href={`/colleges/${featured.slug}`} className="md:col-span-4 relative surface-bento rounded-2xl overflow-hidden border border-white/5 h-[240px] group cursor-pointer bg-[#121217] block">
              <Image 
                src={featured.image_url || "/images/fallback-college.jpg"} 
                alt={featured.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-[#0891b2] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  #{featured.nirf_rank} NIRF RANK
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <h4 className="text-lg font-bold font-heading mb-0.5 line-clamp-1">{featured.name}</h4>
                <p className="text-xs text-gray-300">{featured.city} • {featured.type.charAt(0) + featured.type.slice(1).toLowerCase()} Inst.</p>
              </div>
            </Link>
          )}

          {/* Bottom Right: Exam Calendar (Wired to DB) */}
          <div className="md:col-span-8 surface-bento rounded-2xl p-6 border border-white/5 flex flex-col justify-between bg-[#121217]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Admission Timeline</h3>
              <Calendar className="h-4 w-4 text-[#c084fc]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 h-full">
              {exams.map((exam, i) => {
                const colors = ["text-[#eab308]", "text-[#22d3ee]", "text-[#4ade80]"];
                const color = colors[i % colors.length];
                return (
                  <div key={exam.id} className="flex flex-col justify-between bg-[#1a1a20] border border-white/5 rounded-xl p-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <div>
                      <h4 className={`text-[10px] font-bold tracking-wider mb-1 uppercase ${color}`}>{exam.name}</h4>
                      <p className="text-sm font-bold">{exam.exam_date || "TBD"}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-[10px] text-muted-foreground font-medium uppercase">Counselling: {exam.counselling_starts || "TBD"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Smart Compare (Wired) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-base font-bold font-heading mb-1">Smart Compare</h2>
            <p className="text-[13px] text-muted-foreground">Side-by-side technical breakdown of top institutions.</p>
          </div>
          <Link href="/compare" className="px-5 py-2 rounded-full border border-white/20 text-xs font-medium hover:bg-white/5 transition-colors shrink-0">
            Launch Matrix
          </Link>
        </div>

        {compareColleges.length === 3 && (
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5 bg-[#121217]">
                  <th className="py-4 px-6 text-[10px] font-bold text-muted-foreground tracking-wider uppercase w-1/4">Criteria</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-[#c084fc] tracking-wider uppercase w-1/4 line-clamp-1">{compareColleges[0].name}</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-[#2dd4bf] tracking-wider uppercase w-1/4 line-clamp-1">{compareColleges[1].name}</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-[#a3e635] tracking-wider uppercase w-1/4 line-clamp-1">{compareColleges[2].name}</th>
                </tr>
              </thead>
              <tbody className="bg-[#121217]/50">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-[13px] text-muted-foreground">Median Package</td>
                  <td className="py-4 px-6 text-[13px] font-medium">{formatLPA(compareColleges[0].avg_salary)}</td>
                  <td className="py-4 px-6 text-[13px] font-medium">{formatLPA(compareColleges[1].avg_salary)}</td>
                  <td className="py-4 px-6 text-[13px] font-medium">{formatLPA(compareColleges[2].avg_salary)}</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-[13px] text-muted-foreground">NIRF Rank</td>
                  <td className="py-4 px-6 text-[13px] font-medium">Rank {compareColleges[0].nirf_rank ?? "N/A"}</td>
                  <td className="py-4 px-6 text-[13px] font-medium">Rank {compareColleges[1].nirf_rank ?? "N/A"}</td>
                  <td className="py-4 px-6 text-[13px] font-medium">Rank {compareColleges[2].nirf_rank ?? "N/A"}</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-[13px] text-muted-foreground">Main Exam</td>
                  <td className="py-4 px-6 text-[13px] font-medium">{compareColleges[0].exam[0] ?? "N/A"}</td>
                  <td className="py-4 px-6 text-[13px] font-medium">{compareColleges[1].exam[0] ?? "N/A"}</td>
                  <td className="py-4 px-6 text-[13px] font-medium">{compareColleges[2].exam[0] ?? "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0c0c0e] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-sm tracking-tight font-heading mb-3">
              <span className="text-white">CollegeCompass</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed pr-4">
              Empowering the class of 2028 with next-gen data tools.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold text-white tracking-widest uppercase mb-4">Resources</h4>
            <ul className="space-y-2 text-[11px] text-muted-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">AI Methodology</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">College Directory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-white tracking-widest uppercase mb-4">Legal</h4>
            <ul className="space-y-2 text-[11px] text-muted-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-white tracking-widest uppercase mb-4">Newsletter</h4>
            <div className="flex items-center bg-[#1a1a20] border border-white/10 rounded">
              <input type="email" placeholder="Email" className="bg-transparent border-none outline-none text-[11px] px-3 py-2 text-white w-full" />
              <button className="bg-[#c084fc] hover:bg-[#a855f7] px-3 py-2 transition-colors rounded-r flex items-center justify-center">
                <Play className="h-3 w-3 text-white fill-white" />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
          <p className="text-[10px] text-muted-foreground">© 2024 CollegeCompass. Built for the Next Gen.</p>
        </div>
      </footer>
    </div>
  );
}
