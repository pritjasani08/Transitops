import { axiosInstance } from '../api/axios';
import { Driver, PaginatedResponse, GetDriversParams } from '../types/driver';

export const driverService = {
  getDrivers: async (params?: GetDriversParams): Promise<PaginatedResponse<Driver>> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDriversResponse), 500);
      });
    }
    const response = await axiosInstance.get('/drivers', { params });
    return response.data;
  },

  getDriverById: async (id: string): Promise<Driver> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve, reject) => {
        const driver = mockDrivers.find(d => d.id === id);
        if (driver) setTimeout(() => resolve(driver), 500);
        else setTimeout(() => reject(new Error('Driver not found')), 500);
      });
    }
    const response = await axiosInstance.get(`/drivers/${id}`);
    return response.data;
  },

  createDriver: async (data: Partial<Driver>): Promise<Driver> => {
    const response = await axiosInstance.post('/drivers', data);
    return response.data;
  },

  updateDriver: async (id: string, data: Partial<Driver>): Promise<Driver> => {
    const response = await axiosInstance.patch(`/drivers/${id}`, data);
    return response.data;
  },

  deleteDriver: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/drivers/${id}`);
  }
};

const mockDrivers: Driver[] = [
  {
    id: 'd1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+15550100',
    licenseNumber: 'CDL123456789',
    licenseClass: 'A',
    licenseExpiry: '2028-12-31',
    status: 'active',
    assignedVehicleId: 'v1',
    rating: 4.8,
    totalMiles: 125000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'd2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+15550200',
    licenseNumber: 'CDL987654321',
    licenseClass: 'A',
    licenseExpiry: '2025-05-15',
    status: 'on_leave',
    rating: 4.9,
    totalMiles: 85000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const mockDriversResponse: PaginatedResponse<Driver> = {
  data: mockDrivers,
  meta: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1
  }
};
