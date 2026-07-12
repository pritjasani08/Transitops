import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "../../../shared/components/ui/button"

export function Register() {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
          Create an account
        </h1>
        <p className="text-sm text-text-muted">
          Enter your email below to create your account
        </p>
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
