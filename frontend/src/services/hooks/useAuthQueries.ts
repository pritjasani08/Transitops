import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/auth';
import { LoginCredentials } from '../types/auth';
import { setStoredToken, removeStoredToken } from '../utils/token';
import { handleApiError } from '../utils/error';

export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
};

export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: authService.getCurrentUser,
    enabled,
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setStoredToken(data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
      queryClient.setQueryData(authKeys.currentUser(), data.user);
    },
    onError: (error) => handleApiError(error, 'Login failed'),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      removeStoredToken();
      localStorage.removeItem('refresh_token');
      queryClient.clear();
    },
  });
};
