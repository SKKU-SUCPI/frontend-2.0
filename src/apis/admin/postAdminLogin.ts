import axiosInstance from "@/apis/utils/axiosInterceptor";

export const postAdminLogin = async () => {
  const response = await axiosInstance.get("/auth/login/admin");
  return response.data;
};
