import axiosInstance from "@/apis/utils/axiosInterceptor";

interface Pageable {
  name: string | null;
  department: string | null;
  page: number;
  size: number;
  sort: string;
}

export interface AdminStudentResponseItem {
  id: number;
  name: string;
  department: string;
  studentId: string;
  grade: number;
  lq: number;
  rq: number;
  cq: number;
  totalScore: number;
  tlq?: number | string | null;
  trq?: number | string | null;
  tcq?: number | string | null;
}

export interface StudentsListResponse {
  content: AdminStudentResponseItem[];
  totalPage: number;
  totalElements?: number;
}

export const getStudentsList = async (
  pageable: Pageable
): Promise<StudentsListResponse> => {
  const response = await axiosInstance.get("/admin/students", {
    params: pageable,
  });
  return response.data.data;
};

export default getStudentsList;
