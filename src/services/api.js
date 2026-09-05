import axios from 'axios';
import { getStoredAuth, clearStoredAuth } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const auth = getStoredAuth(); // already parses JSON and returns null safely
  if (auth?.token) {
    config.headers.Authorization = `Token ${auth.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredAuth();
    }
    return Promise.reject(error);
  }
);

export default api;