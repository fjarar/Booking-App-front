export default {
  env: import.meta.env.MODE,
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL  || 'http://localhost:8000/',
    timeout: 10000
  }
};