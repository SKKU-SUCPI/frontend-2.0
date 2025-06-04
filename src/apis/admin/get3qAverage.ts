import axiosInstance from "@/apis/utils/axiosInterceptor";

const get3qTotalAverage = async () => {
  const response = await axiosInstance.get("/admin/3q-average");
  return response.data.data;
};

const get3qDepartmentAverage = async () => {
  const response = await axiosInstance.get("/admin/3q-average/department");
  return response.data.data;
};

export { get3qTotalAverage, get3qDepartmentAverage };
