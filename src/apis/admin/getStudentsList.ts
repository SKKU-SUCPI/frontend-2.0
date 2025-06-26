import axiosInstance from "@/apis/utils/axiosInterceptor";

interface pageable {
  name: string | null;
  department: string | null;
  page: number;
  size: number;
  sort: string;
}

export const getStudentsList = async (pageable: pageable) => {
  const response = await axiosInstance.get("/admin/students", {
    params: pageable,
  });
  return response.data.data;
};

export default getStudentsList;
