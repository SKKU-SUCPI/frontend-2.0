import axiosInstance from "@/apis/utils/axiosInterceptor";

export const getAdminActivityCount = async (
  activityId: number,
  startDate: string | null,
  endDate: string | null
) => {
  const response = await axiosInstance.get(
    `/admin/submit-count/activity/${activityId}`,
    {
      params: {
        start: startDate,
        end: endDate,
      },
    }
  );
  return response.data.data;
};
