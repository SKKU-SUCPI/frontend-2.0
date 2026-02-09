import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface PutRatioRequest {
  lq: number;
  rq: number;
  cq: number;
}

export interface PutRatioResponse {
  success: boolean;
  message: string;
  data: any;
  path: string;
}

const putRatio = async (data: PutRatioRequest): Promise<PutRatioResponse> => {
  const response = await axiosInstance.post<PutRatioResponse>(
    "/super-admin/ratio",
    data
  );
  return response.data;
};

export default putRatio;
