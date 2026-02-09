import axiosInstance from "@/apis/utils/axiosInterceptor";

const deleteSubmitComment = async (commentId: number) => {
  const response = await axiosInstance.post(
    `/admin/submit/comment/delete/${commentId}`
  );
  return response.data;
};

export default deleteSubmitComment;

