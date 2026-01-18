import axiosInstance from "@/apis/utils/axiosInterceptor";

interface StudentMeResponse {
  id: number;
  name: string;
  department: string;
  studentId: string;
  grade: number;
  lq: number;
  rq: number;
  cq: number;
  totalScore: number;
  tlq: number;
  tcq: number;
  trq: number;
}

const getStudentMe = async (): Promise<StudentMeResponse> => {
  const response = await axiosInstance.get("/student/me");
  return response.data.data;
};

export default getStudentMe;
export type { StudentMeResponse };

