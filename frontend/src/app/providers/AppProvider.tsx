import * as React from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "../../shared/contexts/AuthContext"
import { BrowserRouter } from "react-router-dom"
import { queryClient } from "../../services/config/queryClient"
import { DevelopmentRoleProvider } from "../../features/auth/dev/DevelopmentRoleProvider"

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <DevelopmentRoleProvider>
              {children}
              <Toaster 
                position="bottom-right" 
                toastOptions={{
                  className: 'rounded-xl shadow-lg border border-gray-100',
                  style: {
                    background: 'var(--bg-surface-100, #fff)',
                    color: 'var(--text-primary, #111827)',
                  },
                }} 
              />
            </DevelopmentRoleProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.Suspense>
  )
}
