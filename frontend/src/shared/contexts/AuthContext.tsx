import * as React from "react"
import { useNavigate } from "react-router-dom"

type Role = "fleet_manager" | "dispatcher" | "safety_officer" | "financial_analyst" | null;

interface User {
  id: string
  email: string
  name: string
  role: Role
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (role: Role) => void
  logout: () => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const navigate = useNavigate()

  React.useEffect(() => {
    // Simulate initial check
    const storedRole = localStorage.getItem("th_role") as Role
    if (storedRole) {
      setUser({
        id: "1",
        email: "demo@transithub.com",
        name: "Demo User",
        role: storedRole
      })
    }
    setIsLoading(false)
  }, [])

  const login = (role: Role) => {
    localStorage.setItem("th_role", role || "")
    setUser({
      id: "1",
      email: "demo@transithub.com",
      name: "Demo User",
      role
    })
    
    // Route based on role
    switch(role) {
      case "fleet_manager": navigate("/fleet"); break;
      case "dispatcher": navigate("/dispatch"); break;
      case "safety_officer": navigate("/safety"); break;
      case "financial_analyst": navigate("/finance"); break;
      default: navigate("/"); break;
    }
  }

  const logout = () => {
    localStorage.removeItem("th_role")
    setUser(null)
    navigate("/auth/login")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
