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

ApiAuth.interceptors.request.use(async (config) => {
  try {
    // First get the CSRF cookie
    await axios.get(`${import.meta.env.VITE_API_AUTH_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });

    // Then extract the XSRF token from cookies
    const xsrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (xsrfToken) {
      // Set the decoded token in the request headers
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
    }

    return config;
  } catch (error) {
    console.error('CSRF token fetch failed:', error);
    return Promise.reject(error);
  }
});

export default ApiAuth;
