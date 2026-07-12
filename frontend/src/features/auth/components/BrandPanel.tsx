import * as React from "react"

export function BrandPanel() {
  return (
    <div className="relative hidden h-full w-full flex-col justify-between overflow-hidden bg-[#0a0a0b] p-8 text-white md:flex lg:p-12 xl:p-16">
      {/* Background operational atmosphere (Subtle grid + abstract routes) */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />
      {/* Abstract map contour / radar sweeps */}
      <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-[150%] w-[150%] rounded-full border border-white/5 opacity-20" />
      <div className="pointer-events-none absolute -left-1/3 -top-1/3 h-[180%] w-[180%] rounded-full border border-white/5 opacity-10" />

      {/* Top: Logo */}
      <div className="relative z-10 flex items-center gap-3 font-semibold text-lg tracking-tight">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/20 ring-1 ring-primary/50">
          <span className="text-sm font-bold text-white">TH</span>
        </div>
        TransitOps
        <span className="ml-2 rounded-full border border-gray-800 bg-gray-900/50 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-gray-400">
          OPERATIONS PLATFORM
        </span>
      </div>

      {/* Center: Hero Content */}
      <div className="relative z-10 my-auto max-w-md xl:max-w-lg">
        <h1 className="mb-6 text-4xl font-medium leading-[1.15] tracking-tight text-white lg:text-5xl xl:text-6xl">
          Move Logistics<br />
          <span className="text-gray-400">Without Friction.</span>
        </h1>
        <p className="text-base leading-relaxed text-gray-400 lg:text-lg">
          Monitor fleets. Dispatch faster. Reduce downtime. Maintain compliance. Everything from one operational workspace.
        </p>
      </div>

      {/* Bottom: Version & Copyright */}
      <div className="relative z-10 flex items-center justify-between text-xs text-gray-500">
        <p>© {new Date().getFullYear()} TransitOps Inc.</p>
        <p>v2.4.0-enterprise</p>
      </div>
    </div>
  )
}
