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
  const raw = response.data.data as StudentsListResponse;

  const safeNumberOrNull = (value: unknown): number | null => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
      const parsed = parseFloat(value);
      if (Number.isFinite(parsed)) return parsed;
    }
    return 0;
  };

  return {
    ...raw,
    content: raw.content.map((student) => ({
      ...student,
      tlq: safeNumberOrNull(student.tlq ?? null),
      trq: safeNumberOrNull(student.trq ?? null),
      tcq: safeNumberOrNull(student.tcq ?? null),
    })),
  };
};

export default getStudentsList;
