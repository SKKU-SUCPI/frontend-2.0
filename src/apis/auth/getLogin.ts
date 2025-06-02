import axiosInstance from "@/apis/utils/axiosInterceptor";

// 개발용 테스트 로그인입니다
export const getStudentLogin = async () => {
  const response = await axiosInstance.get<string>("/auth/login/student");
  return response.data;
};

export const getAdminLogin = async () => {
  const response = await axiosInstance.get("/auth/login/admin");
  return response.data;
};

export const getSuperAdminLogin = async () => {
  const response = await axiosInstance.get("/auth/login/super-admin");

  return response.data;
};
