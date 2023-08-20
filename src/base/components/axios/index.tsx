import axios, { InternalAxiosRequestConfig } from "axios";

const baseUrl = "http://192.168.2.11:8084/";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": baseUrl,
    // "Access-Control-Request-Headers": "Content-Type, Authorization",
  },
});

const baseFormUrl = "http://192.168.2.11:8086/";
export const axoisFormInstance = axios.create({
  baseURL: baseFormUrl,
  timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": baseFormUrl,
    // "Access-Control-Request-Headers": "Content-Type, Authorization",
  },
});

axoisFormInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Lấy token từ AsyncStorage
      const token = `ADMIN_TOKEN`;

      if (token) {
        // Gắn token vào header của request
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export default instance;
