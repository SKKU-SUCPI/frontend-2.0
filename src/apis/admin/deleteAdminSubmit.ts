import axiosInstance from "@/apis/utils/axiosInterceptor";

const deleteAdminSubmit = async (submitId: number) => {
  const response = await axiosInstance.post(`/admin/submit/delete/${submitId}`);
  return response.data;
};

export default deleteAdminSubmit;

