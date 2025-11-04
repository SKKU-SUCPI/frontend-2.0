import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface PatchActivityItem {
  activityId: number;
  activityClass?: string;
  activityDetail?: string;
  activityWeight?: number;
}

export interface PatchActivityRequest {
  activities: PatchActivityItem[];
}

export interface PatchActivityResponse {
  success: boolean;
  message: string;
  data: any;
  path: string;
}

const patchActivity = async (data: PatchActivityRequest): Promise<PatchActivityResponse> => {
  const response = await axiosInstance.patch<PatchActivityResponse>(
    "/super-admin/activity",
    data
  );
  return response.data;
};

export default patchActivity;
