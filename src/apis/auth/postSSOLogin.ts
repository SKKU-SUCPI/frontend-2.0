import axiosInstance from "@/apis/utils/axiosInterceptor";

const postSSOLogin = async () => {
  const response = await axiosInstance.post("/auth/login");
  return response.data;
};

export default postSSOLogin;
