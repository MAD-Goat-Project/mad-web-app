import axios, { AxiosInstance } from 'axios';
import { setupInterceptors } from './axiosInterceptors';

export function api(): AxiosInstance {
  const baseURL: string = import.meta.env.VITE_BASE_URL as string;
  const axiosInstance = axios.create({
    baseURL,
  });

  return setupInterceptors(axiosInstance);
}
