import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const REQUEST_TIME = 21000;

const API_ENDPOINT = '';

export const client = axios.create({
  baseURL: API_ENDPOINT,
  timeout: REQUEST_TIME,
});

client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) => client.get<T>(url, { ...config }),
  post: <T, U>(url: string, data: U, config?: AxiosRequestConfig) =>
    client.post<T, AxiosResponse<T>, U>(url, data, { ...config }),
  patch: <T>(url: string, data: unknown) => client.patch<T>(url, data),
  delete: <T>(url: string) => client.delete<T>(url),
};
