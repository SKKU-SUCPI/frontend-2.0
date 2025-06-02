import { axiosRawInstance } from "@/apis/utils/axiosInterceptor";

const getRefresh = async () => {
  const response = await axiosRawInstance.get("/auth/reissue");
  const accessToken = response.headers["authorization"];

  return { accessToken };
};

export default getRefresh;
