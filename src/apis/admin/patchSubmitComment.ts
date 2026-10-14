import axiosInstance from "@/apis/utils/axiosInterceptor";

const patchSubmitComment = async ({
  id,
  content,
}: {
  id: number;
  content: string;
}) => {
  const response = await axiosInstance.post("/admin/submit/comment/patch", {
    id,
    content,
  });
  return response.data;
};

export default patchSubmitComment;

