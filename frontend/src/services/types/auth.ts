export interface User {
  id: string;
  email: string;
  name: string;
  role: 'fleet_manager' | 'dispatcher' | 'safety_officer' | 'financial_analyst';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  role?: string; // For mock login
}
