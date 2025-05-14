export default {
  env: import.meta.env.MODE,
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000
  }
};