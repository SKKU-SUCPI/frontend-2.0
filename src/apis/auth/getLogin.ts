import axiosInstance from "@/apis/utils/axiosInterceptor";
import useAuthStore from "@/stores/auth/authStore";
import useUserStore from "@/stores/auth/userStore";

export const getStudentLogin = async () => {
  const response = await axiosInstance.get<string>("/auth/login/student");
  const accessToken = response.headers["authorization"];
  console.log(response.data);

  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
  }

  // 유저 정보 호출까지 완료 - api 제작 완료 시 수정 바람

  useUserStore.getState().setUser({
    user_id: 1,
    user_role: 0,
    user_name: "김학생",
    user_hakbun: "12345678",
    user_hakgwa_cd: "12345678",
    user_year: 2024,
  });

  return response.data;
};

export const getAdminLogin = async () => {
  const response = await axiosInstance.get("/auth/login/admin");
  const accessToken = response.headers["authorization"];
  console.log(response.data);
  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
  }

  useUserStore.getState().setUser({
    user_id: 1,
    user_role: 1,
    user_name: "김관리자",
    user_hakbun: "12345678",
    user_hakgwa_cd: "12345678",
    user_year: 2024,
  });
  return response.data;
};

export const getSuperAdminLogin = async () => {
  const response = await axiosInstance.get("/auth/login/super-admin");
  const accessToken = response.headers["authorization"];
  console.log(response.data);
  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
  }

  useUserStore.getState().setUser({
    user_id: 1,
    user_role: 2,
    user_name: "김슈퍼관리자",
    user_hakbun: "12345678",
    user_hakgwa_cd: "12345678",
    user_year: 2024,
  });

  return response.data;
};
