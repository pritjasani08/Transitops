import { axiosInstance } from '../api/axios';
import { Trip, PaginatedResponse, GetTripsParams } from '../types/trip';

export const tripService = {
  getTrips: async (params?: GetTripsParams): Promise<PaginatedResponse<Trip>> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockTripsResponse), 500);
      });
    }
    const response = await axiosInstance.get('/trips', { params });
    return response.data;
  },

  getTripById: async (id: string): Promise<Trip> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve, reject) => {
        const trip = mockTrips.find(t => t.id === id);
        if (trip) setTimeout(() => resolve(trip), 500);
        else setTimeout(() => reject(new Error('Trip not found')), 500);
      });
    }
    const response = await axiosInstance.get(`/trips/${id}`);
    return response.data;
  },

  createTrip: async (data: Partial<Trip>): Promise<Trip> => {
    const response = await axiosInstance.post('/trips', data);
    return response.data;
  },

  updateTrip: async (id: string, data: Partial<Trip>): Promise<Trip> => {
    const response = await axiosInstance.patch(`/trips/${id}`, data);
    return response.data;
  },

  deleteTrip: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/trips/${id}`);
  }
};

const mockTrips: Trip[] = [
  {
    id: 't1',
    vehicleId: 'v1',
    driverId: 'd1',
    origin: 'Los Angeles, CA',
    destination: 'Seattle, WA',
    status: 'in_progress',
    startTime: new Date(Date.now() - 172800000).toISOString(),
    distance: 1135,
    cargo: 'Electronics',
    weight: 12000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 't2',
    vehicleId: 'v2',
    driverId: 'd2',
    origin: 'Dallas, TX',
    destination: 'Chicago, IL',
    status: 'planned',
    startTime: new Date(Date.now() + 86400000).toISOString(),
    distance: 925,
    cargo: 'Auto Parts',
    weight: 18500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const mockTripsResponse: PaginatedResponse<Trip> = {
  data: mockTrips,
  meta: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1
  }
};
