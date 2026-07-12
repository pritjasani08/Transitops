import * as React from "react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../../services/api/axios"
import { setStoredToken, removeStoredToken } from "../../services/utils/token"

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
  login: (credentials: any) => Promise<void>
  registerUser: (data: any) => Promise<void>
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const navigate = useNavigate()

  React.useEffect(() => {
    // Check if user exists in local storage to persist session
    const storedUser = localStorage.getItem("th_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse stored user", e)
      }
    }
    setIsLoading(false)
  }, [])

  const handleAuthSuccess = (userData: any, token: string) => {
    setStoredToken(token);
    
    // Convert role from backend if necessary
    const roleMap: Record<string, Role> = {
      "Admin": "fleet_manager", // Default fallback if admin
      "Fleet Manager": "fleet_manager",
      "Dispatcher": "dispatcher",
      "Safety Officer": "safety_officer",
      "Financial Analyst": "financial_analyst",
      "fleet_manager": "fleet_manager",
      "dispatcher": "dispatcher",
      "safety_officer": "safety_officer",
      "financial_analyst": "financial_analyst"
    };

    const userRole = roleMap[userData.role] || "fleet_manager";

    const userObj: User = {
      id: userData.id,
      email: userData.email,
      name: userData.name || userData.first_name + " " + userData.last_name,
      role: userRole
    };

    setUser(userObj);
    localStorage.setItem("th_user", JSON.stringify(userObj));
    
    // Route based on role
    switch(userRole) {
      case "fleet_manager": navigate("/fleet"); break;
      case "dispatcher": navigate("/dispatch"); break;
      case "safety_officer": navigate("/safety"); break;
      case "financial_analyst": navigate("/finance"); break;
      default: navigate("/"); break;
    }
  }

  const login = async (credentials: any) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      const { data } = response.data;
      handleAuthSuccess(data.user, data.token);
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  }

  const registerUser = async (data: any) => {
    try {
      const response = await axiosInstance.post('/auth/register', data);
      const resData = response.data.data;
      handleAuthSuccess(resData.user, resData.token);
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  }

  const logout = () => {
    removeStoredToken();
    localStorage.removeItem("th_user");
    setUser(null);
    navigate("/auth/login");
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, registerUser, logout }}>
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
