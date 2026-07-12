import { axiosInstance } from '../api/axios';
import { AuthResponse, LoginCredentials, User } from '../types/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: '1',
              email: credentials.email,
              name: 'Demo User',
              role: (credentials.role as any) || 'fleet_manager',
              createdAt: new Date().toISOString(),
            },
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
          });
        }, 500);
      });
    }
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve) => setTimeout(resolve, 300));
    }
    await axiosInstance.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: '1',
            email: 'demo@transithub.com',
            name: 'Demo User',
            role: (localStorage.getItem('th_role') as any) || 'fleet_manager',
            createdAt: new Date().toISOString(),
          });
        }, 500);
      });
    }
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  }
};
