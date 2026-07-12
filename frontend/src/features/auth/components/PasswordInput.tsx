import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "../../../shared/components/ui/input"
import { cn } from "../../../shared/utils/cn"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  forgotPasswordLink?: React.ReactNode
  showStrength?: boolean
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, id, className, forgotPasswordLink, showStrength, value, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    const [showPassword, setShowPassword] = React.useState(false)

    // Basic strength calculation
    const calculateStrength = (pass: string) => {
      if (!pass) return 0
      let score = 0
      if (pass.length >= 8) score += 25
      if (pass.match(/[A-Z]/)) score += 25
      if (pass.match(/[0-9]/)) score += 25
      if (pass.match(/[^A-Za-z0-9]/)) score += 25
      return score
    }

    const strength = calculateStrength(String(value || ""))
    const getStrengthColor = (s: number) => {
      if (s === 0) return "bg-gray-200"
      if (s <= 25) return "bg-danger-500"
      if (s <= 50) return "bg-warning-500"
      if (s <= 75) return "bg-primary-500"
      return "bg-success-500"
    }

    return (
      <div className={cn("grid gap-2", className)}>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text-primary" htmlFor={inputId}>
            {label}
          </label>
          {forgotPasswordLink}
        </div>
        <div className="relative">
          <Input
            id={inputId}
            ref={ref}
            type={showPassword ? "text" : "password"}
            error={!!error}
            className="h-11 rounded-xl pr-10"
            value={value}
            {...props}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {showStrength && (
          <div className="mt-1 flex items-center gap-1.5">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={cn(
                  "h-1 w-full flex-1 rounded-full transition-colors duration-300",
                  strength >= step * 25 ? getStrengthColor(strength) : "bg-gray-200 dark:bg-gray-800"
                )}
              />
            ))}
          </div>
        )}
        {error && (
          <p className="text-xs font-medium text-danger-500 animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"
