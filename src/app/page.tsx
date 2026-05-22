import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Play } from "lucide-react";

export default function HomePage() {
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
          <div className="flex flex-col sm:flex-row items-center bg-[#1a1a20] border border-white/10 rounded-full p-2 pl-6 shadow-2xl focus-within:border-primary/50 transition-colors gap-3 sm:gap-0">
            <div className="flex w-full items-center">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input 
                type="text" 
                placeholder="Search IITs, NITs, B-Schools..." 
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground text-sm ml-3 w-full"
              />
            </div>
            <Link 
              href="/predictor"
              className="bg-[#c084fc] hover:bg-[#a855f7] text-white rounded-full px-6 py-2.5 text-sm font-medium transition-transform active:scale-[0.98] shadow-[0_0_15px_rgba(192,132,252,0.3)] shrink-0 whitespace-nowrap w-full sm:w-auto text-center"
            >
              Predict My<br className="hidden sm:block" />Chances
            </Link>
          </div>
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

              {/* Targets */}
              <div className="flex-1 space-y-3 w-full">
                <div className="bg-[#1a1a20] border border-white/5 rounded-lg p-4">
                  <p className="text-[10px] font-bold text-muted-foreground tracking-wider mb-1">TARGET</p>
                  <p className="text-sm font-medium">IIT Bombay – Computer Science</p>
                </div>
                <div className="bg-[#1a1a20] border border-white/5 rounded-lg p-4">
                  <p className="text-[10px] font-bold text-muted-foreground tracking-wider mb-1">HISTORIC CUTOFF</p>
                  <p className="text-sm font-medium">AIR 402 - 612 (General)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right: Top NIRF Trends */}
          <div className="md:col-span-5 surface-bento rounded-2xl p-6 border border-white/5 flex flex-col justify-between bg-[#121217]">
            <h3 className="text-[10px] font-bold text-muted-foreground tracking-widest mb-6 uppercase">Top NIRF Trends</h3>
            <div className="space-y-4 mb-6">
              {[
                { rank: "01", name: "IIT Madras", status: "RANK 1 (CONSISTENT)" },
                { rank: "02", name: "IIT Delhi", status: "RANK 2 (UP 1%)", highlight: true },
                { rank: "03", name: "IIT Bombay", status: "RANK 3 (STABLE)" }
              ].map((item) => (
                <div key={item.rank} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded border flex items-center justify-center text-xs font-bold shrink-0 ${item.highlight ? 'text-[#34d399] border-[#34d399]/30 bg-[#064e3b]/10' : 'text-muted-foreground border-white/10 bg-[#1a1a20]'}`}>
                    {item.rank}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/colleges" className="block w-full py-3 text-center border border-white/10 rounded-lg text-xs font-bold tracking-wider hover:bg-white/5 transition-colors">
              VIEW FULL LIST
            </Link>
          </div>

          {/* Bottom Left: Featured Image */}
          <div className="md:col-span-4 relative surface-bento rounded-2xl overflow-hidden border border-white/5 h-[240px] group cursor-pointer bg-[#121217]">
            <Image 
              src="/images/fallback-college.jpg" 
              alt="Campus" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-[#0891b2] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg">
                #5 NIRF RANK
              </span>
            </div>
            <div className="absolute bottom-4 left-4">
              <h4 className="text-lg font-bold font-heading mb-0.5">BITS Pilani</h4>
              <p className="text-xs text-gray-300">Goa Campus • Private Inst.</p>
            </div>
          </div>

          {/* Bottom Right: Exam Calendar */}
          <div className="md:col-span-8 surface-bento rounded-2xl p-6 border border-white/5 flex flex-col justify-between bg-[#121217]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Exam Calendar</h3>
              <Calendar className="h-4 w-4 text-[#c084fc]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 h-full">
              {[
                { name: "JEE ADVANCED", date: "JUN 02", sub: "24 Days Left", color: "text-[#eab308]" },
                { name: "BITSAT 2024", date: "MAY 20", sub: "Reg. Closing Soon", color: "text-[#22d3ee]" },
                { name: "CUET-UG", date: "MAY 15", sub: "Phase 1 Starts", color: "text-[#4ade80]" },
              ].map((exam) => (
                <div key={exam.name} className="flex flex-col justify-between bg-[#1a1a20] border border-white/5 rounded-xl p-4 hover:bg-white/5 transition-colors cursor-pointer">
                  <div>
                    <h4 className={`text-[10px] font-bold tracking-wider mb-1 ${exam.color}`}>{exam.name}</h4>
                    <p className="text-sm font-bold">{exam.date}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-[10px] text-muted-foreground font-medium">{exam.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Smart Compare */}
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

        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5 bg-[#121217]">
                <th className="py-4 px-6 text-[10px] font-bold text-muted-foreground tracking-wider uppercase w-1/4">Criteria</th>
                <th className="py-4 px-6 text-[10px] font-bold text-[#c084fc] tracking-wider uppercase w-1/4">IIT Kanpur</th>
                <th className="py-4 px-6 text-[10px] font-bold text-[#2dd4bf] tracking-wider uppercase w-1/4">BITS Pilani</th>
                <th className="py-4 px-6 text-[10px] font-bold text-[#a3e635] tracking-wider uppercase w-1/4">NIT Trichy</th>
              </tr>
            </thead>
            <tbody className="bg-[#121217]/50">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 text-[13px] text-muted-foreground">Median Package</td>
                <td className="py-4 px-6 text-[13px] font-medium">₹22.5 LPA</td>
                <td className="py-4 px-6 text-[13px] font-medium">₹18.2 LPA</td>
                <td className="py-4 px-6 text-[13px] font-medium">₹15.8 LPA</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 text-[13px] text-muted-foreground">NIRF Engineering</td>
                <td className="py-4 px-6 text-[13px] font-medium">Rank 4</td>
                <td className="py-4 px-6 text-[13px] font-medium">Rank 20</td>
                <td className="py-4 px-6 text-[13px] font-medium">Rank 9</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 text-[13px] text-muted-foreground">Admission Type</td>
                <td className="py-4 px-6 text-[13px] font-medium">JEE Advanced</td>
                <td className="py-4 px-6 text-[13px] font-medium">BITSAT</td>
                <td className="py-4 px-6 text-[13px] font-medium">JEE Main</td>
              </tr>
            </tbody>
          </table>
        </div>
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
