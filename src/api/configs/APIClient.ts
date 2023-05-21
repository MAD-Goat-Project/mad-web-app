import axios, { AxiosInstance } from 'axios';
import { setupInterceptors } from './axiosInterceptors';
import { IAPIClient } from './IAPIClient';

export class APIClient implements IAPIClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });

    this.axiosInstance = setupInterceptors(this.axiosInstance);
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
