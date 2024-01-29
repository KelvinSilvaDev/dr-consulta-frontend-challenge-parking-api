import { removeTokenFromStorage, isTokenExpired, getTokenFromStorage } from '@/utils/token';
import axios from 'axios';

const axiosBaseConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

export const axiosPublic = axios.create(axiosBaseConfig);
export const axiosPrivate = axios.create(axiosBaseConfig);

const redirectToLogin = () => {
  removeTokenFromStorage();
  window.location.href = '/login';

};

axiosPrivate.interceptors.request.use(
  async (axiosRequestConfig) => {
    const config = axiosRequestConfig;
    config.headers = config.headers ?? {};
    const token = isTokenExpired() ? redirectToLogin() : getTokenFromStorage();
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error),
);