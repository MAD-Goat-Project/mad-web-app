import { AxiosError, AxiosInstance } from 'axios';
import keycloak from '../../configurations/keycloak';

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

function tokenInterceptor(config: any): any {
  const token = keycloak.token;
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
}

export const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.response.use((response) => response, errorHandler);
  instance.interceptors.request.use(tokenInterceptor);
  return instance;
};
