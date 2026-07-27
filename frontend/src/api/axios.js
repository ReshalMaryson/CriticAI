import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

let onSessionExpired = () => {};
export const registerSessionExpiredHandler = (fn) => {
  onSessionExpired = fn;
};

// tracks an in-flight refresh call, shared across concurrent 401s
let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;

      try {
        // if a refresh is already in flight, reuse it instead of firing a new one
        if (!refreshPromise) {
          refreshPromise = api.post("/auth/refresh").finally(() => {
            refreshPromise = null; // reset once settled, success or fail
          });
        }

        await refreshPromise;
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