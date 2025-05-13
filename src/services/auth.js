// Helper functions for token management
const TOKEN_KEY = 'authToken';

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};

// Creates headers with authorization if token exists
export const authHeader = () => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Handles token refresh
export const refreshToken = async () => {
  try {
    const response = await fetch(`${config.api.baseUrl}/refresh`, {
      method: 'POST',
      headers: authHeader(),
      credentials: 'include' // Needed if using HTTP-only cookies
    });
    
    if (!response.ok) throw new Error('Refresh failed');
    
    const { token } = await response.json();
    setToken(token);
    return token;
  } catch (error) {
    clearToken();
    throw error;
  }
};