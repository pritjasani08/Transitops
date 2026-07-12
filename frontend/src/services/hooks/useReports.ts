import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportService } from '../api/reports';
import { GetReportsParams, Report } from '../types/report';
import { handleApiError } from '../utils/error';
import { toast } from 'sonner';

export const reportKeys = {
  all: ['reports'] as const,
  lists: () => [...reportKeys.all, 'list'] as const,
  list: (filters: GetReportsParams) => [...reportKeys.lists(), filters] as const,
  details: () => [...reportKeys.all, 'detail'] as const,
  detail: (id: string) => [...reportKeys.details(), id] as const,
};

export const useReports = (params: GetReportsParams = {}) => {
  return useQuery({
    queryKey: reportKeys.list(params),
    queryFn: () => reportService.getReports(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useReport = (id: string) => {
  return useQuery({
    queryKey: reportKeys.detail(id),
    queryFn: () => reportService.getReportById(id),
    enabled: !!id,
  });
};

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reportService.createReport,
    onSuccess: () => {
      toast.success('Report generation started');
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to start report generation'),
  });
};

export const useDeleteReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reportService.deleteReport,
    onSuccess: () => {
      toast.success('Report deleted successfully');
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to delete report'),
  });
};
