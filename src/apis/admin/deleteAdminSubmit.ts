import axiosInstance from "@/apis/utils/axiosInterceptor";

const deleteAdminSubmit = async (submitId: number) => {
  const response = await axiosInstance.delete(`/admin/submit/${submitId}`);
  return response.data;
};

export default deleteAdminSubmit;

