import { handleError } from "./errorHandler";

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: any;
    queryParams?: Record<string, string | number | boolean>;
  }

  
const buildQueryParams = (params: Record<string, string | number | boolean>) => {
    return Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
 };

 const apiClient = async (endpoint: string, options: RequestOptions = {}) => {
    const { method = 'GET', headers = {}, body, queryParams } = options;
  
    // let url = `${API_BASE_URL}${endpoint}`;
  
    if (queryParams) {
      const queryString = buildQueryParams(queryParams);
      endpoint += `?${queryString}`;
    }
  
    const config: RequestInit = {
      method,
      headers: {
        // 'Content-Type': 'application/json',
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
    };
  
    try {
      const response = await fetch(endpoint, config);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
  
      return data;
    } catch (error) {
      console.log('error catch api clinet :', error)
        handleError(error as Error);
    }
  };

  export const get = (endpoint: string, queryParams?: Record<string, string | number | boolean>) => {
    return apiClient(endpoint, { method: 'GET', queryParams });
  };
  
  export const post = (endpoint: string, body: any) => {
    return apiClient(endpoint, { method: 'POST', body });
  };
  
  export const put = (endpoint: string, body: any, headers?: any) => {
    return apiClient(endpoint, { method: 'PUT', body, headers });
  };
  
  export const del = (endpoint: string, body?: any) => {
    return apiClient(endpoint, { method: 'DELETE', body });
  };