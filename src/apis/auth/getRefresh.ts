import { axiosRawInstance } from "@/apis/utils/axiosInterceptor";
import useAuthStore from "@/stores/auth/authStore";

const getRefresh = async () => {
  const response = await axiosRawInstance.get("/auth/reissue");
  const accessToken = response.headers["authorization"];

  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
  }

  return response.data;
};

export default getRefresh;
