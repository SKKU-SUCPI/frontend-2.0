import axiosInstance from "@/apis/utils/axiosInterceptor";

interface pageable {
  state: number | null;
  page: number;
  size: number;
  sort: string;
}

const getStudentActivityList = async (pageable: pageable) => {
  const response = await axiosInstance.get(`/student/submits`, {
    params: pageable,
  });
  return response.data;
};

export default getStudentActivityList;
