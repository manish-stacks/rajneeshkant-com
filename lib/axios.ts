import axios from "axios";

/**
 * Shared axios instance used by every client component in the app.
 * - baseURL points at the Next.js API routes
 * - withCredentials keeps the admin httpOnly cookie flowing on admin calls
 * - a response interceptor unwraps errors into a consistent shape
 */
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default api;
