import axiosInstance from "@/apis/utils/axiosInterceptor";

const deleteStudentActivity = async (submitId: number) => {
  const response = await axiosInstance.delete(`/student/submits/${submitId}`);
  return response.data;
};

export default deleteStudentActivity;

