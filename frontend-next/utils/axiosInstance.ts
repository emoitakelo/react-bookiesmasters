import axios, { AxiosError, AxiosInstance } from "axios";

/**
 * Dynamically resolve the base URL
 */
const getBaseURL = (): string => {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  return process.env.NODE_ENV === "development"
    ? "http://localhost:1000/api"
    : "https://api.bookiesmasters.com/api";
};

/**
 * Create Axios instance
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: { "Content-Type": "application/json" },
});

/**
 * ✅ Request interceptor — automatically inferred config type
 */
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers ?? {};
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * ✅ Response interceptor — handle 401 globally
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch {
        // ignore
      }
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
