import { AxiosInstance } from 'axios';

export interface IAPIClient {
  getAxiosInstance(): AxiosInstance;
}
