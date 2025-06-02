import { axiosRawInstance } from "@/apis/utils/axiosInterceptor";
import useAuthStore from "@/stores/auth/authStore";

const getLogout = async () => {
  const response = await axiosRawInstance.get("/auth/logout");
  useAuthStore.getState().clearAuth();
  return response.data;
};

export default getLogout;
