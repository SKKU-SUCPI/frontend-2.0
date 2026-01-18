import axiosInstance from "@/apis/utils/axiosInterceptor";

const postSubmitState = async (id: string, state: string) => {
  const response = await axiosInstance.post(`/admin/submit/state`, {
    id,
    state,
  });
  return response.data;
};

export default postSubmitState;
