import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../../shared/contexts/AuthContext"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import toast from "react-hot-toast"
import { axiosInstance } from "../../../services/api/axios"

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
  
  const [showOtp, setShowOtp] = React.useState(false)
  const [otp, setOtp] = React.useState("")
  const [tempData, setTempData] = React.useState<RegisterFormValues | null>(null)
  const [sendingOtp, setSendingOtp] = React.useState(false)
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "fleet_manager"
    }
  })

  const onInitialSubmit = async (data: RegisterFormValues) => {
    try {
      setSendingOtp(true)
      await axiosInstance.post('/auth/send-otp', { email: data.email })
      setTempData(data)
      setShowOtp(true)
      toast.success("OTP sent to your email!")
    } catch (error: any) {
      console.error("Failed to send OTP", error)
      toast.error(error.response?.data?.message || "Failed to send OTP. Please check your email/SMTP settings.")
    } finally {
      setSendingOtp(false)
    }
  }

  const onVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tempData || !otp) return;
    try {
      await registerUser({ ...tempData, otp })
      toast.success("Account created successfully!")
    } catch (error: any) {
      console.error("Registration failed", error)
      const errorMsg = error.response?.data?.message || "Failed to verify OTP or register.";
      toast.error(errorMsg)
    }
  }

  if (showOtp) {
    return (
      <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 my-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
            Verify Email
          </h1>
          <p className="text-sm text-text-muted">
            We sent a 6-digit OTP to <strong>{tempData?.email}</strong>
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={onVerifySubmit}>
             <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-text-primary">Enter OTP</label>
                  <Input 
                    required 
                    value={otp} 
                    onChange={e => setOtp(e.target.value)} 
                    placeholder="123456" 
                    maxLength={6}
                    autoComplete="off"
                  />
                </div>
                <Button type="submit" className="mt-2" isLoading={isSubmitting} disabled={isSubmitting}>
                  Verify & Register
                </Button>
                <Button variant="ghost" type="button" onClick={() => setShowOtp(false)} disabled={isSubmitting}>
                  Back
                </Button>
             </div>
          </form>
        </div>
      </div>
    )
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
        <form onSubmit={handleSubmit(onInitialSubmit)}>
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

            <Button disabled={sendingOtp} isLoading={sendingOtp} type="submit" className="mt-2">
              Sign Up
            </Button>
          </div>
        </form>
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
