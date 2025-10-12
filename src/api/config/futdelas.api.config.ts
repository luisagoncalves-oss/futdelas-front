export interface ApiConfig {
  baseURL: string;
  headers: Record<string, string>;
}

export const getApiConfig = (): ApiConfig => {
  const baseURL = 'https://futdelas-api.onrender.com/api';
  return {
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, image/*, */*',
      'Cache-Control': 'no-cache',
    },
  };
};

export const getImageApiConfig = (): Partial<ApiConfig> => ({
  headers: {
    'Accept': 'image/png, image/jpeg, image/webp, image/*, */*',
  },
});

export const API_CONFIG = getApiConfig();