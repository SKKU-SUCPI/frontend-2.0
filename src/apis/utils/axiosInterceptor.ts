import useAuthStore from "@/stores/auth/authStore";
import getRefresh from "@/apis/auth/getRefresh";
import getProfile from "@/apis/auth/getProfile";
import axios, { AxiosInstance } from "axios";

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

// 리프레시 토큰 함수 (useRefresh 훅 로직을 일반 함수로 변환)
const refreshTokenAndProfile = async () => {
  try {
    const { accessToken } = await getRefresh();
    useAuthStore.getState().setAccessToken(accessToken);
    const profile = await getProfile();
    useAuthStore.getState().setUserProfile(profile);
    return accessToken;
  } catch (error) {
    // 리프레시 실패 시 인증 정보 클리어
    useAuthStore.getState().clearAuth();
    throw error;
  }
};

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await refreshTokenAndProfile();
        // 원래 요청 재시도
        return axiosInstance(originalRequest);
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
