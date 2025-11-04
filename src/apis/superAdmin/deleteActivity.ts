import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface DeleteActivityResponse {
  success: boolean;
  message: string;
  data: any;
  path: string;
}

const deleteActivity = async (activityId: number): Promise<DeleteActivityResponse> => {
  const response = await axiosInstance.delete<DeleteActivityResponse>(
    `/super-admin/activity/${activityId}`
  );
  return response.data;
};

export default deleteActivity;
