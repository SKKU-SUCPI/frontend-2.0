import axiosInstance from "@/apis/utils/axiosInterceptor";

const getActivityItem = async (id: string) => {
  const response = await axiosInstance.get(`/admin/activity/${id}`);
  return response.data.data;
};

export default getActivityItem;
