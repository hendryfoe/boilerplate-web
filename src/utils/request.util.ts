import axios, { AxiosRequestConfig } from 'axios';
import { stringify, parse } from 'query-string';

import { EndpointConstant } from 'constants/endpoint.constant';

export const axiosInstance = axios.create({
  baseURL: EndpointConstant.AUTH_URL
});

export function toQueryString(queryStringObject?: { [key: string]: any }) {
  return queryStringObject ? `?${stringify(queryStringObject)}` : '';
}

export function parseQueryString(queryString: string): { [key: string]: any } {
  return parse(queryString);
}

export const Request = {
  get: (endpoint: string, params?: Record<string, any>) => {
    return axiosInstance.get(endpoint, { params }).then(({ data }) => data);
  },
  post: (endpoint: string, body?: Record<string, any>, config?: AxiosRequestConfig) => {
    return axiosInstance.post(endpoint, body, config).then(({ data }) => data);
  },
  put: (endpoint: string, body?: Record<string, any>, config?: AxiosRequestConfig) => {
    return axiosInstance.put(endpoint, body, config).then(({ data }) => data);
  },
  delete: (endpoint: string, body?: Record<string, any>, config?: AxiosRequestConfig) => {
    return axiosInstance.delete(endpoint, { ...config, data: body }).then(({ data }) => data);
  }
};
