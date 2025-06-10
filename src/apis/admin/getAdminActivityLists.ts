import axiosInstance from "@/apis/utils/axiosInterceptor";

interface pageable {
  name: string | null;
  page: number;
  size: number;
  sort: string;
}

const getAdminActivityLists = async (pageable: pageable) => {
  const response = await axiosInstance.get("/admin/submits", {
    params: pageable,
  });
  return response.data.data;
};

export default getAdminActivityLists;
