import { setToken } from '@/actions';
import { store } from '@/redux';
import axios from 'axios';

export const ApiAuth = axios.create({
  timeout: 60000,
  baseURL: import.meta.env.VITE_API_AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

ApiAuth.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiAuth.interceptors.response.use(
  (config) => {
    const token = config.data?.token;
    if (token) {
      store.dispatch(setToken(token));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiAuth;
