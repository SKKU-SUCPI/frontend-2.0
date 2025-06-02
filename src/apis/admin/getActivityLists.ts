import axiosInstance from "@/apis/utils/axiosInterceptor";

interface pageable {
  page: number;
  size: number;
  sort: string;
}

const getActivityLists = async (pageable: pageable) => {
  const response = await axiosInstance.get("/admin/submits", {
    params: pageable,
  });
  return response.data.data;
};

export default getActivityLists;
