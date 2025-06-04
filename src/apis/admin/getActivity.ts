import axiosInstance from "@/apis/utils/axiosInterceptor";

const getActivity = async (id: string) => {
  const response = await axiosInstance.get(`/admin/submit/${id}`);
  return response.data.data;
};

export default getActivity;
