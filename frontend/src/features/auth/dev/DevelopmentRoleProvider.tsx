import * as React from "react"
import { AuthContext, useAuth } from "../../../shared/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { getDefaultRoute } from "../../../shared/config/roles/defaultRoutes"
import { RoleId } from "../../../shared/config/roles/roleConfiguration"

export function DevelopmentRoleProvider({ children }: { children: React.ReactNode }) {
  // If not in development, don't do anything
  if (!import.meta.env.DEV) {
    return <>{children}</>
  }

  // We are inside the original AuthProvider, so we can use its hook
  const auth = useAuth()
  const navigate = useNavigate()
  
  // Track our overriding role
  const [devRole, setDevRole] = React.useState<RoleId | null>(null)

  // Hydrate dev role from local storage on mount
  React.useEffect(() => {
    const storedDevRole = localStorage.getItem("transitops-dev-role") as RoleId
    if (storedDevRole) {
      setDevRole(storedDevRole)
    }
  }, [])

  // The custom login function for dev mode that intercepts the original
  const devLogin = React.useCallback((role: RoleId | null) => {
    if (role) {
      localStorage.setItem("transitops-dev-role", role)
      setDevRole(role)
      // We also update the base auth so standard persistence works for demo purposes
      auth.login(role)
    } else {
      localStorage.removeItem("transitops-dev-role")
      setDevRole(null)
      auth.logout()
    }
  }, [auth])

  const devLogout = React.useCallback(() => {
    localStorage.removeItem("transitops-dev-role")
    setDevRole(null)
    auth.logout()
  }, [auth])

  // If we have an overriding dev role, replace the context's user role
  const overridenAuth = React.useMemo(() => {
    if (devRole && auth.user) {
      return {
        ...auth,
        login: devLogin,
        logout: devLogout,
        user: {
          ...auth.user,
          role: devRole
        }
      }
    }
    return { ...auth, login: devLogin, logout: devLogout }
  }, [auth, devRole, devLogin, devLogout])

  return (
    <AuthContext.Provider value={overridenAuth}>
      {children}
    </AuthContext.Provider>
  )
}
