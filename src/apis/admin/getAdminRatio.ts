import axiosInstance from "@/apis/utils/axiosInterceptor";

export const getAdminRatio = async () => {
  const response = await axiosInstance.get("/admin/ratio");
  return response.data;
};
