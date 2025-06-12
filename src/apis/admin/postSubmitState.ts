import axiosInstance from "@/apis/utils/axiosInterceptor";

const postSubmitState = async (id: string, state: string, comment: string) => {
  const response = await axiosInstance.post(`/admin/submit/state`, {
    id: id,
    state: state,
    comment: comment,
  });
  return response.data;
};

export default postSubmitState;
