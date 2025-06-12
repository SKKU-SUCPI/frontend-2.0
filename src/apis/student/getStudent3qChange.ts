import axiosInstance from "@/apis/utils/axiosInterceptor";

const getStudent3qChange = async () => {
  const response = await axiosInstance.get("/student/3q-change/month");
  return response.data.data;
};

export default getStudent3qChange;
