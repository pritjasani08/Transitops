import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        success: "bg-secondary-500/10 text-secondary-500 hover:bg-secondary-500/20",
        warning: "bg-warning-500/10 text-warning-500 hover:bg-warning-500/20",
        danger: "bg-danger-500/10 text-danger-500 hover:bg-danger-500/20",
        outline: "text-text-primary border border-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | null;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
