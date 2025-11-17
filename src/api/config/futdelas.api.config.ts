export interface ApiConfig {
  baseURL: string;
  headers: Record<string, string>;
}

export const getApiConfig = (): ApiConfig => {
  const baseURL = 'https://futdelas-api-sqmz.onrender.com/api';
  return {
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, */*',
      'Cache-Control': 'no-cache',
    },
  };
};

export const API_CONFIG = getApiConfig();