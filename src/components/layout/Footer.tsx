import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              CollegeCompass
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              India&apos;s trusted platform for college discovery, comparison, and admission
              prediction. Make informed decisions with real data.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/colleges" className="hover:text-foreground transition-colors">
                  All Colleges
                </Link>
              </li>
              <li>
                <Link
                  href="/colleges?type=GOVERNMENT"
                  className="hover:text-foreground transition-colors"
                >
                  Government Colleges
                </Link>
              </li>
              <li>
                <Link
                  href="/colleges?type=PRIVATE"
                  className="hover:text-foreground transition-colors"
                >
                  Private Colleges
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-foreground transition-colors">
                  Compare Colleges
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/predictor" className="hover:text-foreground transition-colors">
                  Admission Predictor
                </Link>
              </li>
              <li>
                <Link
                  href="/colleges?exam=JEE+Advanced"
                  className="hover:text-foreground transition-colors"
                >
                  JEE Colleges
                </Link>
              </li>
              <li>
                <Link
                  href="/colleges?exam=CAT"
                  className="hover:text-foreground transition-colors"
                >
                  CAT Colleges (MBA)
                </Link>
              </li>
              <li>
                <Link
                  href="/colleges?exam=NEET+UG"
                  className="hover:text-foreground transition-colors"
                >
                  NEET Colleges
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CollegeCompass. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Data sourced from NIRF 2023 rankings and publicly available information.
          </p>
        </div>
      </div>
    </footer>
  );
}
