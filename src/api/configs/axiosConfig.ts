import axios, { AxiosInstance } from 'axios';
import { setupInterceptors } from './axiosInterceptors';

// TODO: Env vars
export function api(): AxiosInstance {
  const axiosInstance = axios.create({
    //withCredentials: true,
    baseURL: 'http://localhost:3000',
  });

  return setupInterceptors(axiosInstance);
}
