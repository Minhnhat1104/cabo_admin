import { KEY_LOCAL_STORAGE_ACCESS_TOKEN } from "@base/config/constants";
import axios, { InternalAxiosRequestConfig } from "axios";

const baseUrl = "http://10.65.0.23:8084/";
const baseTimeOut = 5000;

const instance = axios.create({
  baseURL: baseUrl,
  timeout: baseTimeOut,
  headers: {
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": baseUrl,
    // "Access-Control-Request-Headers": "Content-Type, Authorization",
  },
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Lấy token từ AsyncStorage
      const token = localStorage.getItem(KEY_LOCAL_STORAGE_ACCESS_TOKEN);

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

const baseFormUrl = "http://10.65.0.23:8086/";
export const axios8086 = axios.create({
  baseURL: baseFormUrl,
  timeout: baseTimeOut,
  headers: {
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": baseFormUrl,
    // "Access-Control-Request-Headers": "Content-Type, Authorization",
  },
});

axios8086.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Lấy token từ AsyncStorage
      const token = localStorage.getItem(KEY_LOCAL_STORAGE_ACCESS_TOKEN);

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

const baseListDrivesUrl = "http://10.65.0.23:8083/";
export const axios8083 = axios.create({
  baseURL: baseListDrivesUrl,
  timeout: baseTimeOut,
  headers: {
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": baseListDrivesUrl,
    // "Access-Control-Request-Headers": "Content-Type, Authorization",
  },
});

axios8083.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Lấy token từ AsyncStorage
      const token = localStorage.getItem(KEY_LOCAL_STORAGE_ACCESS_TOKEN);

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
