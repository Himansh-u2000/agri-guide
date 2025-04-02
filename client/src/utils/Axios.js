import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1" || "/api/v1",
  timeout: 10000,
});

// Request Interceptor
Axios.interceptors.request.use(
  (config) => {
    // Add Authorization token before every request
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
let isRefreshing = false;
  Axios.interceptors.response.use(
    (response) => response, // Return the response if successful
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
              throw new Error("No refresh token found");
            }

            const response = await Axios.post("/auth/refresh-token", {
              refreshToken,
            });

            if (!response.data?.success) {
              throw new Error("Refresh token expired or invalid");
            }

            const { accessToken, refreshToken: newRefreshToken } = response.data.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            Axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            onRefreshed(accessToken);
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.replace("/login");
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return new Promise((resolve, reject) => {
          addRefreshSubscriber((accessToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            resolve(Axios(originalRequest));
          });
        });
      }

      return Promise.reject(error);
    }
  );


export default Axios;
