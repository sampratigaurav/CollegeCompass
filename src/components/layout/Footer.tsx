import Link from "next/link";
import { Activity, Database, GitBranch } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500/50 flex items-center justify-center">
                <div className="h-1 w-1 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">All Systems Operational</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground tracking-widest uppercase">
              <Database className="h-3 w-3" /> Data Synced: 2h ago
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
            <Link href="/colleges" className="hover:text-foreground transition-colors">Directory</Link>
            <Link href="/predictor" className="hover:text-foreground transition-colors">Predictor</Link>
            <span className="text-muted-foreground/30">|</span>
            <span>NIRF 2025 Data Source</span>
            <div className="hidden md:flex items-center gap-1.5 ml-2">
              <GitBranch className="h-3 w-3" /> v2.4.1
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
