import axios from 'axios';

/**
 * Co-Trader API client
 *
 * baseURL '/api' is proxied to http://localhost:8000 by Vite
 * (configured in vite.config.js — already done)
 *
 * withCredentials: true — sends the Laravel Sanctum session cookie
 * on every request so the backend knows who is logged in
 */
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
  withCredentials: true,
});

/* ============================================================
   Request interceptor
   — Reads the auth token from localStorage (set on login)
   — Injects it into every outgoing request as a Bearer token
   ============================================================ */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ct_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================================================
   Response interceptor
   — On 401 (Unauthorized): clear stored token and redirect to login
   — On any other error: pass it through so components can handle it
   ============================================================ */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear everything and send to login
      localStorage.removeItem('ct_token');
      localStorage.removeItem('ct_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;