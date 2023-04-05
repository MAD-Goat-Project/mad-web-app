import { AxiosError, AxiosInstance } from 'axios';

// TODO: Add log on DEV nd improve this
/*const logOnDevelopment = (error: AxiosError): void => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
};*/

function errorHandler(error: AxiosError): Promise<AxiosError> {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    console.error(error);
    throw error;
  }

  return Promise.reject(error);
}
export const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.response.use((response) => response, errorHandler);
  return instance;
};
