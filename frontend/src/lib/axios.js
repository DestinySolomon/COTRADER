import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',           //  relies on the Vite proxy you configured
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,     // must be true for Sanctum (cookies / CSRF)
});

export default apiClient;