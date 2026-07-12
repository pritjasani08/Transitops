import { Outlet } from "react-router-dom"
import { BrandPanel } from "../../features/auth/components/BrandPanel"

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-surface-100 text-text-primary">
      {/* Left Panel: Branding (Hidden on mobile, 45% on md, 40% on lg) */}
      <div className="hidden md:block md:w-[45%] lg:w-[40%]">
        <BrandPanel />
      </div>
      
      {/* Right Panel: Authentication Form */}
      <div className="flex w-full flex-1 flex-col justify-center px-8 sm:px-12 md:w-[55%] lg:w-[60%] lg:px-24 xl:px-32">
        <div className="mx-auto w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
