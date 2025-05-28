import axiosInstance from "@/apis/utils/axiosInterceptor";

const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  console.log(response.data);
  return response.data;
};

export default getProfile;
