import useAuthStore from "@/stores/auth/authStore";
import axios, { AxiosInstance } from "axios";
import getRefresh from "../auth/getRefresh";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

export const axiosRawInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      // 이미 Bearer가 포함되어 있는지 확인
      const token = accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`;
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    console.error("API 요청 오류:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await getRefresh();
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    console.error("API 응답 오류:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
