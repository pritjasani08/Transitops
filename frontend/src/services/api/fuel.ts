import { axiosInstance } from '../api/axios';
import { FuelLog, PaginatedResponse, GetFuelLogsParams } from '../types/fuel';

export const fuelService = {
  getFuelLogs: async (params?: GetFuelLogsParams): Promise<PaginatedResponse<FuelLog>> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockFuelResponse), 500);
      });
    }
    const response = await axiosInstance.get('/fuel', { params });
    return response.data;
  },

  getFuelLogById: async (id: string): Promise<FuelLog> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve, reject) => {
        const log = mockFuelLogs.find(f => f.id === id);
        if (log) setTimeout(() => resolve(log), 500);
        else setTimeout(() => reject(new Error('Fuel log not found')), 500);
      });
    }
    const response = await axiosInstance.get(`/fuel/${id}`);
    return response.data;
  },

  createFuelLog: async (data: Partial<FuelLog>): Promise<FuelLog> => {
    const response = await axiosInstance.post('/fuel', data);
    return response.data;
  },

  updateFuelLog: async (id: string, data: Partial<FuelLog>): Promise<FuelLog> => {
    const response = await axiosInstance.patch(`/fuel/${id}`, data);
    return response.data;
  },

  deleteFuelLog: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/fuel/${id}`);
  }
};

const mockFuelLogs: FuelLog[] = [
  {
    id: 'f1',
    vehicleId: 'v1',
    driverId: 'd1',
    gallons: 120.5,
    cost: 450.25,
    pricePerGallon: 3.73,
    odometer: 45200,
    location: 'Pilot Travel Center, Dallas TX',
    date: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'f2',
    vehicleId: 'v2',
    driverId: 'd2',
    gallons: 85.0,
    cost: 325.50,
    pricePerGallon: 3.82,
    odometer: 120150,
    location: 'Love\'s Travel Stop, Phoenix AZ',
    date: new Date(Date.now() - 172800000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const mockFuelResponse: PaginatedResponse<FuelLog> = {
  data: mockFuelLogs,
  meta: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1
  }
};
