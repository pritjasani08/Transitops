import * as React from "react"
import { Input } from "../../../shared/components/ui/input"
import { cn } from "../../../shared/utils/cn"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId

    return (
      <div className={cn("grid gap-2", className)}>
        <label className="text-sm font-medium text-text-primary" htmlFor={inputId}>
          {label}
        </label>
        <Input
          id={inputId}
          ref={ref}
          error={!!error}
          className="h-11 rounded-xl"
          {...props}
        />
        {error && (
          <p className="text-xs font-medium text-danger-500 animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FormInput.displayName = "FormInput"
