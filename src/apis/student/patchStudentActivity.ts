import axiosInstance from "@/apis/utils/axiosInterceptor";

const patchStudentActivity = async ({
  submitId,
  title,
  content,
}: {
  submitId: number;
  title: string;
  content: string;
}) => {
  const response = await axiosInstance.patch(`/student/submits/${submitId}`, {
    title,
    content,
  });
  return response.data;
};

export default patchStudentActivity;

