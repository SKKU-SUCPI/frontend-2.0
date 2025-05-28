import axiosInstance from "@/apis/utils/axiosInterceptor";
import useAuthStore from "@/stores/auth/authStore";
import useUserStore from "@/stores/auth/userStore";

export const getStudentLogin = async () => {
  const response = await axiosInstance.get<string>("/auth/login/student");
  const accessToken = response.headers["authorization"];

  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
  }

  // 유저 정보 호출까지 완료 - api 제작 완료 시 수정 바람

  // useUserStore.getState().setUser({
  //   id: 1,
  //   role: "student",
  //   name: "김학생",
  //   studentId: "12345678",
  //   department: "소프트웨어학과",
  // });

  return response.data;
};

export const getAdminLogin = async () => {
  const response = await axiosInstance.get("/auth/login/admin");
  const accessToken = response.headers["authorization"];
  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
  }

  // useUserStore.getState().setUser({
  //   id: 2,
  //   role: "admin",
  //   name: "김관리자",
  //   studentId: "12345678",
  //   department: "소프트웨어학과",
  // });
  return response.data;
};

export const getSuperAdminLogin = async () => {
  const response = await axiosInstance.get("/auth/login/super-admin");
  const accessToken = response.headers["authorization"];
  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
  }

  // useUserStore.getState().setUser({
  //   id: 3,
  //   role: "super-admin",
  //   name: "김슈퍼관리자",
  //   studentId: "12345678",
  //   department: "소프트웨어학과",
  // });

  return response.data;
};
