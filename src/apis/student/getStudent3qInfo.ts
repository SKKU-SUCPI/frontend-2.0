import axiosInstance from "@/apis/utils/axiosInterceptor";

const getStudent3qInfo = async () => {
  const response = await axiosInstance.get("/student/3q-info");
  return response.data.data;
};

export default getStudent3qInfo;
