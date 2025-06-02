import axiosInstance from "@/apis/utils/axiosInterceptor";

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
  // const accessToken = response.headers["authorization"];
  // if (accessToken) {
  //   useAuthStore.getState().setAccessToken(accessToken);
  // }

  // useUserStore.getState().setUser({
  //   user_id: 1,
  //   user_role: 2,
  //   user_name: "김슈퍼관리자",
  //   user_hakbun: "12345678",
  //   user_hakgwa_cd: "12345678",
  //   user_year: 2024,
  // });

  return response.data;
};
