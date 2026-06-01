import axiosInstance from "@/apis/utils/axiosInterceptor";

const getStudent3qInfo = async (projectId?: number) => {
  const response = await axiosInstance.get("/student/3q-info", {
    params: projectId ? { projectId } : {},
  });
  return response.data.data;
};

export default getStudent3qInfo;
