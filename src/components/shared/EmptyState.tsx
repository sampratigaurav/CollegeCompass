import { SearchX, ServerCrash, GitCompareArrows, BookOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "search" | "server" | "compare" | "generic";
  action?: React.ReactNode;
}

const icons = {
  search: SearchX,
  server: ServerCrash,
  compare: GitCompareArrows,
  generic: BookOpen,
};

export function EmptyState({ title, description, icon = "generic", action }: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center rounded-2xl border border-border bg-background relative overflow-hidden shadow-subtle">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-muted border border-border mb-6 shadow-[0_0_30px_rgba(124,58,237,0.15)]">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-bold mb-2 tracking-tight text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-md mb-8 leading-relaxed">{description}</p>
      
      {action && (
        <div className="relative z-10">
          {action}
        </div>
      )}
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center rounded-2xl border border-red-500/10 bg-background relative overflow-hidden shadow-subtle">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 mb-6 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
        <ServerCrash className="h-8 w-8 text-red-500" />
      </div>
      
      <h3 className="text-xl font-bold mb-2 tracking-tight text-foreground">Something went wrong</h3>
      <p className="text-muted-foreground text-sm max-w-md mb-8 leading-relaxed">
        {message ?? "We couldn't load this content. Please try again."}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="relative z-10 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors active:scale-[0.98]"
        >
          Try again
        </button>
      )}
    </div>
  );
}
