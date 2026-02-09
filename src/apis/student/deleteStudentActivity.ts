import axiosInstance from "@/apis/utils/axiosInterceptor";

const deleteStudentActivity = async (submitId: number) => {
  const response = await axiosInstance.post(`/student/submits/delete/${submitId}`);
  return response.data;
};

export default deleteStudentActivity;

