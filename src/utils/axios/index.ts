import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const response = await axios.post(
      "/api/auth/token",
      {},
      { withCredentials: true },
    );
    const { accessToken } = response.data;

    Cookies.set("access_token", accessToken);
    return accessToken;
  } catch (error) {
    console.error("토큰 재발급 실패:", error);
    throw error;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
