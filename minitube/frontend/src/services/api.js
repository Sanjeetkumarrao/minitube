import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5173/api/v1",
  baseURL: "https://minitube-l2w7.onrender.com/api/v1",
  withCredentials: true,
});

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const hasToken = localStorage.getItem("accessToken");

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
