import axiosInstance from "@/apis/utils/axiosInterceptor";

const deleteSubmitComment = async (commentId: number) => {
  const response = await axiosInstance.delete(
    `/admin/submit/comment/${commentId}`
  );
  return response.data;
};

export default deleteSubmitComment;

