import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface GetAdminStudentsParams {
  name?: string;
  department?: string;
  studentId?: string;
  grade?: number;
  page: number;
  size: number;
  sort?: string[];
}

export const getAdminStudents = async ({
  name,
  department,
  studentId,
  grade,
  page,
  size,
  sort,
}: GetAdminStudentsParams) => {
  const params: any = {
    page,
    size,
  };
  if (name) params.name = name;
  if (department) params.department = department;
  if (studentId) params.studentId = studentId;
  if (grade !== undefined) params.grade = grade;
  if (sort) params.sort = sort;

  const response = await axiosInstance.get("/admin/students", { params });
  return response.data;
};
