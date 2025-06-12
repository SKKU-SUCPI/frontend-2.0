import axiosInstance from "@/apis/utils/axiosInterceptor";

const getStudentActivityItem = async (id: string) => {
  const response = await axiosInstance.get(`/student/submit/${id}`);
  return response.data.data;
};

export default getStudentActivityItem;
