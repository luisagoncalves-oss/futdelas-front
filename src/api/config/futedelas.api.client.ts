import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Capacitor, CapacitorHttp, HttpResponse, HttpHeaders } from '@capacitor/core';
import { API_CONFIG } from './futdelas.api.config';

class ApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      headers: API_CONFIG.headers,
    });
  }

  private normalizeHeaders(headers?: any): HttpHeaders {
    if (!headers) return {};
    
    const normalized: HttpHeaders = {};
    
    Object.keys(headers).forEach(key => {
      const value = headers[key];
      if (value !== undefined && value !== null) {
        normalized[key] = String(value);
      }
    });
    
    return normalized;
  }

  private async nativeRequest<T>(
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const fullUrl = url.startsWith('http') ? url : `${API_CONFIG.baseURL}${url}`;
    
    const response: HttpResponse = await CapacitorHttp.request({
      method: method.toUpperCase(),
      url: fullUrl,
      headers: {
        ...this.normalizeHeaders(API_CONFIG.headers),
        ...this.normalizeHeaders(config?.headers),
      },
      data: data,
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.status >= 200 && response.status < 300 ? 'OK' : 'Error',
      headers: response.headers,
      config: config as any,
    } as AxiosResponse<T>;
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    if (Capacitor.isNativePlatform()) {
      return this.nativeRequest<T>('GET', url, undefined, config);
    }
    return this.client.get<T>(url, config);
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    if (Capacitor.isNativePlatform()) {
      return this.nativeRequest<T>('POST', url, data, config);
    }
    return this.client.post<T>(url, data, config);
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    if (Capacitor.isNativePlatform()) {
      return this.nativeRequest<T>('PUT', url, data, config);
    }
    return this.client.put<T>(url, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    if (Capacitor.isNativePlatform()) {
      return this.nativeRequest<T>('DELETE', url, undefined, config);
    }
    return this.client.delete<T>(url, config);
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    if (Capacitor.isNativePlatform()) {
      return this.nativeRequest<T>('PATCH', url, data, config);
    }
    return this.client.patch<T>(url, data, config);
  }
}

export const apiClient = new ApiClient();