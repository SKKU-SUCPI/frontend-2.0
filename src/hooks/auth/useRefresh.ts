// hooks/auth/useRefresh.ts
import { useState } from "react";
import getRefresh from "@/apis/auth/getRefresh";
import getProfile from "@/apis/auth/getProfile";
import useAuthStore from "@/stores/auth/authStore";

const useRefresh = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUserProfile = useAuthStore((s) => s.setUserProfile);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const run = async () => {
    try {
      const { accessToken } = await getRefresh();
      setAccessToken(accessToken);
      const profile = await getProfile();
      // ✅ accessToken + 유저 정보 한꺼번에 저장
      setUserProfile(profile);
    } catch (error) {
      console.warn("리프레시 실패", error);
      clearAuth(); // 토큰/프로필 제거
    } finally {
      setIsLoading(false);
    }
  };

  return { run, isLoading };
};

export default useRefresh;
