import axiosInstance from "@/apis/utils/axiosInterceptor";

const getStudent3qAverage = async () => {
  const response = await axiosInstance.get("/student/3q-averages");
  return response.data.data;
};

export default getStudent3qAverage;
