import axios from "axios";

const api = axios.create({
  baseURL: "https://criticai.onrender.com",
  withCredentials: true,
});

let onSessionExpired = () => {};
export const registerSessionExpiredHandler = (fn) => {
  onSessionExpired = fn;
};

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh" &&
        originalRequest.url !== "/users/me"
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