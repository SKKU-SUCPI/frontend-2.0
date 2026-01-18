import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface PostActivityRequest {
  categoryId: number; // 1=LQ, 2=RQ, 3=CQ
  activityClass: string;
  activityDetail: string;
  activityWeight: number;
}

export interface PostActivityResponse {
  success: boolean;
  message: string;
  data: any;
  path: string;
}

const postActivity = async (data: PostActivityRequest): Promise<PostActivityResponse> => {
  const response = await axiosInstance.post<PostActivityResponse>(
    "/super-admin/activity",
    data
  );
  return response.data;
};

export default postActivity;

