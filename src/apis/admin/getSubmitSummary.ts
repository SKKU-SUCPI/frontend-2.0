import axiosInstance from "@/apis/utils/axiosInterceptor";

const getSubmitSummary = async () => {
  const response = await axiosInstance.get("/admin/submit/summary");
  return response.data.data;
};

export default getSubmitSummary;
