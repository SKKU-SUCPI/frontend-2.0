import axiosInstance from "@/apis/utils/axiosInterceptor";

const postStudentActivityFiles = async ({
  submitId,
  files,
}: {
  submitId: number;
  files: File[];
}) => {
  const response = await axiosInstance.post(
    `/student/submits/${submitId}/files`,
    {
      files,
    }
  );
  return response.data;
};

export default postStudentActivityFiles;
