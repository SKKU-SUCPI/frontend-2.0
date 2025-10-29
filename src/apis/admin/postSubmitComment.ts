import axiosInstance from "@/apis/utils/axiosInterceptor";

const postSubmitComment = async (id: string, content: string) => {
  const response = await axiosInstance.post(`/admin/submit/comment`, {
    id,
    content,
  });
  return response.data;
};

export default postSubmitComment;


