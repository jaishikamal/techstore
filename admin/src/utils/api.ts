import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    // You can add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const adminApi = {
  // Auth
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),

  // Users
  getUsers: () => api.get('/admin/users'),
  createUser: (userData: any) => api.post('/admin/users', userData),
  updateUser: (id: string, userData: any) =>
    api.put(`/admin/users/${id}`, userData),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),

  // Dashboard
  getStats: () => api.get('/admin/stats'),
  getChartData: () => api.get('/admin/chart-data'),

  // Settings
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (settings: any) => api.put('/admin/settings', settings),
};

export default api; 