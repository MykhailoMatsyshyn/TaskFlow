import axios from "axios";
import { API_BASE_URL } from "../constants/api";

/**
 * Retrieves the authentication token from localStorage.
 * @returns {string | null} - The authentication token, or null if not found.
 */
const getToken = () => localStorage.getItem("token");

/**
 * Axios instance with a predefined base URL and default headers.
 * Automatically includes the authentication token in requests.
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Request Interceptor:
 * - Automatically adds the `Authorization` header with the Bearer token if available.
 */
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Response Interceptor:
 * - Passes successful responses as-is.
 * - Catches errors, extracts meaningful messages, and rejects the promise with a readable error.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
