import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
import { ROLE_CONFIGURATION, RoleId } from "../../../shared/config/roles/roleConfiguration"

import { Button } from "../../../shared/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../../shared/components/ui/select"

import { FormInput } from "../components/FormInput"
import { PasswordInput } from "../components/PasswordInput"
import { SocialLogin } from "../components/SocialLogin"
import { AuthFooter } from "../components/AuthFooter"

const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Full Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  role: z.enum(["fleet_manager", "dispatcher", "safety_officer", "financial_analyst"], {
    errorMap: () => ({ message: "Please select a role" }),
  }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function Register() {
  const navigate = useNavigate()
  
  const { register, watch, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  // Watch values
  const passwordValue = watch("password")
  const selectedRoleId = watch("role")
  const selectedRole = selectedRoleId ? ROLE_CONFIGURATION[selectedRoleId as RoleId] : null

  const onSubmit = async (data: RegisterFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Navigate back to login on success
    navigate("/auth/login")
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 my-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
          Create Account
        </h1>
        <p className="text-sm text-text-muted">
          Create your TransitOps workspace.
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5">
            <FormInput
              label="Full Name"
              type="text"
              placeholder="John Doe"
              error={errors.fullName?.message}
              {...register("fullName")}
            />

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

            <div className="grid gap-2">
              <label className="text-sm font-medium text-text-primary">
                Role
              </label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-11 rounded-xl" error={!!errors.role}>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ROLE_CONFIGURATION)
                        .filter(role => role.id !== 'driver')
                        .map((role) => (
                        <SelectItem key={role.id} value={role.id} className="py-3">
                          <div className="flex items-center gap-3">
                            <role.icon className="h-5 w-5 text-text-muted" />
                            <div className="flex flex-col">
                              <span className="font-medium text-text-primary">{role.label}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {/* Descriptions & Helpers */}
              <div className="flex flex-col gap-1 mt-1">
                {selectedRole && (
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400 animate-in fade-in slide-in-from-top-1">
                    {selectedRole.description}
                  </p>
                )}
                <p className="text-xs text-text-muted">
                  Your role determines the modules available after sign in.
                </p>
                {errors.role && (
                  <p className="text-xs font-medium text-danger-500">{errors.role.message}</p>
                )}
              </div>
            </div>

            <PasswordInput
              label="Password"
              autoComplete="new-password"
              showStrength
              value={passwordValue}
              error={errors.password?.message}
              {...register("password")}
            />

            <PasswordInput
              label="Confirm Password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <div className="flex items-start space-x-3 pt-2">
              <input
                type="checkbox"
                id="acceptTerms"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/50"
                {...register("acceptTerms")}
              />
              <div className="grid gap-1 leading-none">
                <label
                  htmlFor="acceptTerms"
                  className="text-sm font-medium text-text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept Terms & Conditions
                </label>
                <p className="text-xs text-text-muted">
                  By creating an account, you agree to our Terms of Service and Privacy Policy.
                </p>
                {errors.acceptTerms && (
                  <p className="text-xs text-danger-500">{errors.acceptTerms.message}</p>
                )}
              </div>
            </div>

            <Button disabled={isSubmitting} isLoading={isSubmitting} type="submit" className="mt-4 h-11 text-base">
              Create Account
            </Button>
          </div>
        </form>

        <SocialLogin disabled={isSubmitting} />
      </div>

      <AuthFooter 
        text="Already have an account?"
        linkText="Sign In"
        href="/auth/login"
      />
    </div>
  )
}
