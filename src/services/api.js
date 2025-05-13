import config from '../config';
import { authHeader, refreshToken, clearToken } from './auth';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || 'Request failed');
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  return response.json();
};

let refreshPromise = null;

const apiClient = {
  get: async (endpoint, options = {}) => {
    const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
      ...options,
      headers: { ...authHeader(), ...options.headers },
      credentials: 'include' // For cookie-based auth
    });
    
    // Auto-refresh token on 401
    if (response.status === 401 && !refreshPromise) {
      refreshPromise = refreshToken()
        .then(() => {
          return fetch(`${config.api.baseUrl}${endpoint}`, {
            ...options,
            headers: { ...authHeader(), ...options.headers }
          });
        })
        .finally(() => {
          refreshPromise = null;
        });
      
      return handleResponse(await refreshPromise);
    }
    
    return handleResponse(response);
  },

  post: async (endpoint, body, options = {}) => {
    const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { ...authHeader(), ...options.headers },
      body: JSON.stringify(body),
      credentials: 'include'
    });
    
    if (response.status === 401 && !refreshPromise) {
      refreshPromise = refreshToken()
        .then(() => {
          return fetch(`${config.api.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: { ...authHeader(), ...options.headers },
            body: JSON.stringify(body)
          });
        })
        .finally(() => {
          refreshPromise = null;
        });
      
      return handleResponse(await refreshPromise);
    }
    
    return handleResponse(response);
  },

  // Similarly implement put, patch, delete
};

export default apiClient;