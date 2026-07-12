import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../../shared/contexts/AuthContext"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import toast from "react-hot-toast"
import { FormInput } from "../components/FormInput"
import { PasswordInput } from "../components/PasswordInput"
import { SocialLogin } from "../components/SocialLogin"
import { AuthFooter } from "../components/AuthFooter"

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data)
      toast.success("Welcome back!")
    } catch (error: any) {
      console.error("Login failed", error)
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.")
    }
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
          Welcome Back
        </h1>
        <p className="text-sm text-text-muted">
          Sign in to continue managing your fleet operations.
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5">
            <FormInput
              label="Email"
              type="email"
              placeholder="m@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              error={errors.email?.message}
              {...register("email")}
            />

            <PasswordInput
              label="Password"
              autoComplete="current-password"
              error={errors.password?.message}
              forgotPasswordLink={
                <Link to="/auth/forgot-password" className="text-xs font-medium text-primary hover:text-primary-600 hover:underline transition-colors">
                  Forgot Password
                </Link>
              }
              {...register("password")}
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/50"
                {...register("rememberMe")}
              />
              {errors.password && (
                <p className="text-xs text-danger-500">{errors.password.message}</p>
              )}
            </div>
            
            <Button disabled={isSubmitting} isLoading={isSubmitting} type="submit" className="mt-6">
              Sign In
            </Button>
          </div>
        </form>

        <SocialLogin disabled={isSubmitting} />
      </div>

      <AuthFooter 
        text="Don't have an account?"
        linkText="Create Account"
        href="/auth/register"
      />
    </div>
  )
}
