import { AxiosError, AxiosInstance } from 'axios';

const logOnDevelopment = (error: AxiosError): void => {
  if (import.meta.env.MODE === 'development') {
    console.error(error);
  }
};

function errorHandler(error: AxiosError): Promise<AxiosError> {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    logOnDevelopment(error);
    throw error;
  }

  return Promise.reject(error);
}
export const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.response.use((response) => response, errorHandler);
  return instance;
};
