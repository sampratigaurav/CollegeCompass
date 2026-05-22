import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-white text-black border-transparent hover:bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.1)]",
        secondary:
          "bg-white/5 text-white border-white/10 hover:bg-white/10",
        destructive:
          "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20",
        outline:
          "border-white/20 text-white hover:bg-white/5",
        ghost:
          "hover:bg-white/5 text-muted-foreground hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-black/40 backdrop-blur-md border-white/10 text-white",
        "neon-primary": "bg-primary/10 border-primary/30 text-primary shadow-[0_0_10px_rgba(124,58,237,0.2)]",
        "neon-secondary": "bg-secondary/10 border-secondary/30 text-secondary shadow-[0_0_10px_rgba(236,72,153,0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
