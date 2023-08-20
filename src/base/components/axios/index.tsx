import axios from "axios";

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

export default instance;
