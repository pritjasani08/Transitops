import { Outlet } from "react-router-dom"
import { ShieldCheck } from "lucide-react"

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-bg-base">
      <div className="hidden w-1/2 flex-col justify-between bg-gray-900 p-12 text-white lg:flex">
        <div className="flex items-center gap-3 font-semibold text-xl">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-bold text-lg">TH</span>
          </div>
          TransitHub
        </div>
        
        <div className="mb-12 max-w-md">
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-white">
            Enterprise Fleet &amp; Transport Management
          </h1>
          <p className="text-lg text-gray-400">
            A unified platform for fleet managers, dispatchers, safety officers, and financial analysts to optimize operations.
          </p>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          Enterprise Grade Security
        </div>
      </div>
      
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
