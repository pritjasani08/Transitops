import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService } from '../api/trips';
import { GetTripsParams, Trip } from '../types/trip';
import { handleApiError } from '../utils/error';
import { toast } from 'sonner';

export const tripKeys = {
  all: ['trips'] as const,
  lists: () => [...tripKeys.all, 'list'] as const,
  list: (filters: GetTripsParams) => [...tripKeys.lists(), filters] as const,
  details: () => [...tripKeys.all, 'detail'] as const,
  detail: (id: string) => [...tripKeys.details(), id] as const,
};

export const useTrips = (params: GetTripsParams = {}) => {
  return useQuery({
    queryKey: tripKeys.list(params),
    queryFn: () => tripService.getTrips(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useTrip = (id: string) => {
  return useQuery({
    queryKey: tripKeys.detail(id),
    queryFn: () => tripService.getTripById(id),
    enabled: !!id,
  });
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tripService.createTrip,
    onSuccess: () => {
      toast.success('Trip created successfully');
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to create trip'),
  });
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Trip> }) => 
      tripService.updateTrip(id, data),
    onMutate: async (newTrip) => {
      await queryClient.cancelQueries({ queryKey: tripKeys.detail(newTrip.id) });
      const previousTrip = queryClient.getQueryData<Trip>(tripKeys.detail(newTrip.id));
      
      if (previousTrip) {
        queryClient.setQueryData<Trip>(tripKeys.detail(newTrip.id), {
          ...previousTrip,
          ...newTrip.data,
        });
      }
      return { previousTrip };
    },
    onSuccess: (data) => {
      toast.success('Trip updated successfully');
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(data.id) });
    },
    onError: (error, newTrip, context) => {
      handleApiError(error, 'Failed to update trip');
      if (context?.previousTrip) {
        queryClient.setQueryData(tripKeys.detail(newTrip.id), context.previousTrip);
      }
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tripService.deleteTrip,
    onSuccess: () => {
      toast.success('Trip deleted successfully');
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to delete trip'),
  });
};
