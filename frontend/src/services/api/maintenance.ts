import { axiosInstance } from '../api/axios';
import { MaintenanceRecord, PaginatedResponse, GetMaintenanceParams } from '../types/maintenance';

export const maintenanceService = {
  getMaintenanceRecords: async (params?: GetMaintenanceParams): Promise<PaginatedResponse<MaintenanceRecord>> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockMaintenanceResponse), 500);
      });
    }
    const response = await axiosInstance.get('/maintenance', { params });
    return response.data;
  },

  getMaintenanceById: async (id: string): Promise<MaintenanceRecord> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve, reject) => {
        const record = mockMaintenance.find(m => m.id === id);
        if (record) setTimeout(() => resolve(record), 500);
        else setTimeout(() => reject(new Error('Maintenance record not found')), 500);
      });
    }
    const response = await axiosInstance.get(`/maintenance/${id}`);
    return response.data;
  },

  createMaintenance: async (data: Partial<MaintenanceRecord>): Promise<MaintenanceRecord> => {
    const response = await axiosInstance.post('/maintenance', data);
    return response.data;
  },

  updateMaintenance: async (id: string, data: Partial<MaintenanceRecord>): Promise<MaintenanceRecord> => {
    const response = await axiosInstance.patch(`/maintenance/${id}`, data);
    return response.data;
  },

  deleteMaintenance: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/maintenance/${id}`);
  }
};

const mockMaintenance: MaintenanceRecord[] = [
  {
    id: 'm1',
    vehicleId: 'v1',
    type: 'preventive',
    status: 'completed',
    description: 'Regular oil change and tire rotation',
    cost: 350.00,
    scheduledDate: new Date(Date.now() - 604800000).toISOString(),
    completedDate: new Date(Date.now() - 518400000).toISOString(),
    technicianNotes: 'All systems normal.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'm2',
    vehicleId: 'v2',
    type: 'repair',
    status: 'scheduled',
    description: 'Replace brake pads',
    cost: 850.00,
    scheduledDate: new Date(Date.now() + 172800000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const mockMaintenanceResponse: PaginatedResponse<MaintenanceRecord> = {
  data: mockMaintenance,
  meta: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1
  }
};
