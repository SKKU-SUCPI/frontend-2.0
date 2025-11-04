import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface RatioData {
  lq: number;
  rq: number;
  cq: number;
}

export interface GetRatioResponse {
  success: boolean;
  message: string;
  data: RatioData;
  path: string;
}

const getRatio = async (): Promise<RatioData> => {
  const response = await axiosInstance.get<GetRatioResponse>("/admin/ratio");
  return response.data.data;
};

export default getRatio;

