import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

let onSessionExpired = () => {};
export const registerSessionExpiredHandler = (fn) => {
  onSessionExpired = fn;
};

// interceptor for Refresh Token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      try {
        originalRequest._retry = true;
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        onSessionExpired();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;