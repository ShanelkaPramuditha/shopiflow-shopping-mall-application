import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // Allow sending cookies with requests
});

// Request interceptor to add the access token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiry and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the access token is expired, attempt to refresh it
    if (
      error.response?.status === 403 &&
      !originalRequest._retry
    ) {
      console.log('Token expired, attempting refresh');
      originalRequest._retry = true;

      try {
        const response = await axios.get(
          'http://localhost:3000/api/auth',
          {
            withCredentials: true,
          },
        );
        localStorage.setItem(
          'accessToken',
          response.data.accessToken,
        );
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
