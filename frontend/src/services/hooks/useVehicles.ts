import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleService } from '../api/vehicles';
import { GetVehiclesParams, Vehicle } from '../types/vehicle';
import { handleApiError } from '../utils/error';
import { toast } from 'sonner';

export const vehicleKeys = {
  all: ['vehicles'] as const,
  lists: () => [...vehicleKeys.all, 'list'] as const,
  list: (filters: GetVehiclesParams) => [...vehicleKeys.lists(), filters] as const,
  details: () => [...vehicleKeys.all, 'detail'] as const,
  detail: (id: string) => [...vehicleKeys.details(), id] as const,
};

export const useVehicles = (params: GetVehiclesParams = {}) => {
  return useQuery({
    queryKey: vehicleKeys.list(params),
    queryFn: () => vehicleService.getVehicles(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useVehicle = (id: string) => {
  return useQuery({
    queryKey: vehicleKeys.detail(id),
    queryFn: () => vehicleService.getVehicleById(id),
    enabled: !!id,
  });
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehicleService.createVehicle,
    onSuccess: () => {
      toast.success('Vehicle created successfully');
      queryClient.invalidateQueries({ queryKey: vehicleKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to create vehicle'),
  });
};

export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Vehicle> }) => 
      vehicleService.updateVehicle(id, data),
    onMutate: async (newVehicle) => {
      await queryClient.cancelQueries({ queryKey: vehicleKeys.detail(newVehicle.id) });
      const previousVehicle = queryClient.getQueryData<Vehicle>(vehicleKeys.detail(newVehicle.id));
      
      if (previousVehicle) {
        queryClient.setQueryData<Vehicle>(vehicleKeys.detail(newVehicle.id), {
          ...previousVehicle,
          ...newVehicle.data,
        });
      }
      return { previousVehicle };
    },
    onSuccess: (data) => {
      toast.success('Vehicle updated successfully');
      queryClient.invalidateQueries({ queryKey: vehicleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vehicleKeys.detail(data.id) });
    },
    onError: (error, newVehicle, context) => {
      handleApiError(error, 'Failed to update vehicle');
      if (context?.previousVehicle) {
        queryClient.setQueryData(vehicleKeys.detail(newVehicle.id), context.previousVehicle);
      }
    },
  });
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehicleService.deleteVehicle,
    onSuccess: () => {
      toast.success('Vehicle deleted successfully');
      queryClient.invalidateQueries({ queryKey: vehicleKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to delete vehicle'),
  });
};
