import { axiosInstance } from '../api/axios';
import { Report, PaginatedResponse, GetReportsParams } from '../types/report';

export const reportService = {
  getReports: async (params?: GetReportsParams): Promise<PaginatedResponse<Report>> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockReportResponse), 500);
      });
    }
    const response = await axiosInstance.get('/reports', { params });
    return response.data;
  },

  getReportById: async (id: string): Promise<Report> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve, reject) => {
        const report = mockReports.find(r => r.id === id);
        if (report) setTimeout(() => resolve(report), 500);
        else setTimeout(() => reject(new Error('Report not found')), 500);
      });
    }
    const response = await axiosInstance.get(`/reports/${id}`);
    return response.data;
  },

  createReport: async (data: Partial<Report>): Promise<Report> => {
    const response = await axiosInstance.post('/reports', data);
    return response.data;
  },

  deleteReport: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/reports/${id}`);
  }
};

const mockReports: Report[] = [
  {
    id: 'r1',
    title: 'Q2 Financial Summary',
    type: 'financial',
    format: 'pdf',
    status: 'completed',
    downloadUrl: '/mock/reports/q2-summary.pdf',
    generatedBy: '1',
    dateRange: {
      start: '2026-04-01T00:00:00Z',
      end: '2026-06-30T23:59:59Z',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'r2',
    title: 'Monthly Fleet Maintenance',
    type: 'maintenance',
    format: 'excel',
    status: 'generating',
    generatedBy: '1',
    dateRange: {
      start: '2026-06-01T00:00:00Z',
      end: '2026-06-30T23:59:59Z',
    },
    createdAt: new Date().toISOString(),
  }
];

const mockReportResponse: PaginatedResponse<Report> = {
  data: mockReports,
  meta: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1
  }
};
