import axios from 'axios';

const todoApi = axios.create({
  baseURL: import.meta.env.VITE_TODO_API_URL,
});

const authApi = axios.create({
  baseURL: import.meta.env.VITE_TODO_AUTH_API_URL,
});

todoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { todoApi, authApi };
