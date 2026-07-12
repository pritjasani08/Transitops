import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../../shared/contexts/AuthContext"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import toast from "react-hot-toast"

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["fleet_manager", "dispatcher", "safety_officer", "financial_analyst"], {
    message: "Please select a role",
  }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function Register() {
  const { registerUser } = useAuth()
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "fleet_manager"
    }
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data)
      toast.success("Account created successfully!")
    } catch (error: any) {
      console.error("Registration failed", error)
      toast.error(error.response?.data?.message || "Registration failed. Email might already exist.")
    }
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 my-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
          Create Account
        </h1>
        <p className="text-sm text-text-muted">
          Enter your details below to create your account
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-text-primary" htmlFor="name">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="John Doe"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                error={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-danger-500">{errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-text-primary" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                error={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-danger-500">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-text-primary" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                error={!!errors.password}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-danger-500">{errors.password.message}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium text-text-primary" htmlFor="role">
                Select Role
              </label>
              <select 
                id="role" 
                className="flex h-10 w-full rounded-xl border border-gray-300 bg-surface-100 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
                {...register("role")}
              >
                <option value="fleet_manager">Fleet Manager</option>
                <option value="dispatcher">Dispatcher</option>
                <option value="safety_officer">Safety Officer</option>
                <option value="financial_analyst">Financial Analyst</option>
              </select>
              {errors.role && (
                <p className="text-xs text-danger-500">{errors.role.message}</p>
              )}
            </div>

            <Button disabled={isSubmitting} isLoading={isSubmitting} type="submit" className="mt-2">
              Sign Up
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-bg-base px-2 text-text-muted">
              Or continue with
            </span>
          </div>
        </div>

        <Button variant="secondary" type="button" disabled={isSubmitting}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Google
        </Button>
      </div>

      <p className="px-8 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
