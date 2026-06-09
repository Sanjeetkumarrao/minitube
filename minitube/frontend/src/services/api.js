import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - auto refresh token
// ONLY retry if we actually have a token stored (user was logged in)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const hasToken = localStorage.getItem("accessToken");

    // Only attempt refresh if:
    // 1. It's a 401 error
    // 2. We haven't already retried
    // 3. We actually have a token (user was logged in before)
    // 4. It's not the current-user check itself (to avoid loops)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      hasToken &&
      !originalRequest.url.includes("current-user")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "/api/v1/users/refresh-token",
          {},
          { withCredentials: true }
        );
        const { accessToken } = res.data.data;
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
