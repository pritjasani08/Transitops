import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../api/notifications';
import { handleApiError } from '../utils/error';

export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
};

export const useNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: notificationService.getNotifications,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to mark notification as read'),
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to mark all notifications as read'),
  });
};
