"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground opacity-50">
        <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 absolute transition-all dark:-rotate-90 dark:scale-0 scale-100 rotate-0" />
      <Moon className="h-4 w-4 absolute transition-all dark:rotate-0 dark:scale-100 scale-0 rotate-90" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
