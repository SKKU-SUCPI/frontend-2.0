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
  const raw = response.data.data as StudentMeResponse;

  const safeNumber = (value: unknown): number => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
      const parsed = parseFloat(value);
      if (Number.isFinite(parsed)) return parsed;
    }
    return 0;
  };

  return {
    ...raw,
    tlq: safeNumber(raw.tlq),
    trq: safeNumber(raw.trq),
    tcq: safeNumber(raw.tcq),
  };
};

export default getStudentMe;
export type { StudentMeResponse };

