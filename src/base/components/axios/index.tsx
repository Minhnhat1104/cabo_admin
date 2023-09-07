import { KEY_LOCAL_STORAGE_ACCESS_TOKEN } from "@base/config/constants";
import axios, { InternalAxiosRequestConfig } from "axios";

const baseUrl = "http://tops-endless-imp.ngrok-free.app/";
const baseTimeOut = 10000;

const instance = axios.create({
  baseURL: baseUrl,
  timeout: baseTimeOut,
  headers: {
    // "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": "6024",
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

const baseFormUrl = "https://tops-endless-imp.ngrok-free.app/";
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

const baseListDrivesUrl = "https://tops-endless-imp.ngrok-free.app/";
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
