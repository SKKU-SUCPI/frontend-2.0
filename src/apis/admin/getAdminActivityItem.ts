import axiosInstance from "@/apis/utils/axiosInterceptor";

const getAdminActivityItem = async (id: string) => {
  const response = await axiosInstance.get(`/admin/submit/${id}`);
  return response.data.data;
};

export default getAdminActivityItem;
