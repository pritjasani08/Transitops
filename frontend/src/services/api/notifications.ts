import { axiosInstance } from '../api/axios';
import { Notification, PaginatedResponse } from '../types/notification';

export const notificationService = {
  getNotifications: async (): Promise<PaginatedResponse<Notification>> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockNotificationResponse), 500);
      });
    }
    const response = await axiosInstance.get('/notifications');
    return response.data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await axiosInstance.patch(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async (): Promise<void> => {
    await axiosInstance.post('/notifications/read-all');
  }
};

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    title: 'New Trip Assigned',
    message: 'You have been assigned a new trip to Chicago, IL.',
    type: 'info',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'n2',
    userId: '1',
    title: 'Vehicle Maintenance Due',
    message: 'Vehicle VNL 860 is due for preventive maintenance.',
    type: 'warning',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

const mockNotificationResponse: PaginatedResponse<Notification> = {
  data: mockNotifications,
  meta: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1
  }
};
