import axiosInstance from "@/apis/utils/axiosInterceptor";

const postStudentActivityFiles = async ({
  submitId,
  files,
}: {
  submitId: number;
  files: File[];
}) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axiosInstance.post(
    `/student/submits/${submitId}/file`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export default postStudentActivityFiles;
