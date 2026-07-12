import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { driverService } from '../api/drivers';
import { GetDriversParams, Driver } from '../types/driver';
import { handleApiError } from '../utils/error';
import { toast } from 'sonner';

export const driverKeys = {
  all: ['drivers'] as const,
  lists: () => [...driverKeys.all, 'list'] as const,
  list: (filters: GetDriversParams) => [...driverKeys.lists(), filters] as const,
  details: () => [...driverKeys.all, 'detail'] as const,
  detail: (id: string) => [...driverKeys.details(), id] as const,
};

export const useDrivers = (params: GetDriversParams = {}) => {
  return useQuery({
    queryKey: driverKeys.list(params),
    queryFn: () => driverService.getDrivers(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useDriver = (id: string) => {
  return useQuery({
    queryKey: driverKeys.detail(id),
    queryFn: () => driverService.getDriverById(id),
    enabled: !!id,
  });
};

export const useCreateDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: driverService.createDriver,
    onSuccess: () => {
      toast.success('Driver created successfully');
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to create driver'),
  });
};

export const useUpdateDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Driver> }) => 
      driverService.updateDriver(id, data),
    onMutate: async (newDriver) => {
      await queryClient.cancelQueries({ queryKey: driverKeys.detail(newDriver.id) });
      const previousDriver = queryClient.getQueryData<Driver>(driverKeys.detail(newDriver.id));
      
      if (previousDriver) {
        queryClient.setQueryData<Driver>(driverKeys.detail(newDriver.id), {
          ...previousDriver,
          ...newDriver.data,
        });
      }
      return { previousDriver };
    },
    onSuccess: (data) => {
      toast.success('Driver updated successfully');
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
      queryClient.invalidateQueries({ queryKey: driverKeys.detail(data.id) });
    },
    onError: (error, newDriver, context) => {
      handleApiError(error, 'Failed to update driver');
      if (context?.previousDriver) {
        queryClient.setQueryData(driverKeys.detail(newDriver.id), context.previousDriver);
      }
    },
  });
};

export const useDeleteDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: driverService.deleteDriver,
    onSuccess: () => {
      toast.success('Driver deleted successfully');
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to delete driver'),
  });
};
