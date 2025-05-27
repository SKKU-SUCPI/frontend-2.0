import axiosInstance from "@/apis/utils/axiosInterceptor";

// 개발용 student 로그인 API
export async function postStudentLogin() {
  const response = await axiosInstance.get<string>("/auth/login/student");
  return response.data;
}
