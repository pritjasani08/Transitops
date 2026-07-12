import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 border border-transparent",
  {
    variants: {
      variant: {
        default: "bg-primary-50 text-primary-700 hover:bg-primary-100 border-primary-200",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200",
        success: "bg-success-50 text-success-700 hover:bg-success-100 border-success-200",
        warning: "bg-warning-50 text-warning-700 hover:bg-warning-100 border-warning-200",
        danger: "bg-danger-50 text-danger-700 hover:bg-danger-100 border-danger-200",
        outline: "text-text-primary border-gray-200 bg-transparent hover:bg-gray-50",
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
