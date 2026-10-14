import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface DeleteActivityResponse {
  success: boolean;
  message: string;
  data: any;
  path: string;
}

const deleteActivity = async (activityId: number): Promise<DeleteActivityResponse> => {
  const response = await axiosInstance.post<DeleteActivityResponse>(
    `/super-admin/activity/delete/${activityId}`
  );
  return response.data;
};

export default deleteActivity;
