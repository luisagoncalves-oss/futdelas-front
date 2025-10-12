import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG, getImageApiConfig } from './futdelas.api.config';

class ApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      headers: API_CONFIG.headers,
      maxRedirects: 5,
      validateStatus: (status) => status < 500,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, {
      ...config,
      headers: {
        ...config?.headers,
      }
    });
  }

  async getImage(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ArrayBuffer>> {
    const imageConfig = getImageApiConfig();
    
    return this.client.get<ArrayBuffer>(url, {
      ...config,
      headers: {
        ...imageConfig.headers,
        ...config?.headers,
      },
      responseType: 'arraybuffer',
      maxContentLength: 10 * 1024 * 1024,
      maxBodyLength: 10 * 1024 * 1024,
    });
  }

  async getBlob(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Blob>> {
    const imageConfig = getImageApiConfig();
    
    return this.client.get<Blob>(url, {
      ...config,
      headers: {
        ...imageConfig.headers,
        ...config?.headers,
      },
      responseType: 'blob',
    });
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }
}

export const apiClient = new ApiClient();