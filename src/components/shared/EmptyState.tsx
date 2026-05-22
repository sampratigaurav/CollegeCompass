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
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-5">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 mb-5">
        <ServerCrash className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">
        {message ?? "We couldn't load this content. Please try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
