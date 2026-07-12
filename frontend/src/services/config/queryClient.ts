import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      retry: 1, // default: 3
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
