import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface ActivityCriterion {
  activityId: number;
  activityClass: string; // 평가항목 대분류
  activityDetail: string; // 기준 설명
  activityWeight: number; // 점수
  activityDomain: number;
  categoryId: number;
  categoryName: string; // LQ | RQ | CQ
  categoryRatio: number; // 카테고리 비율
}

export interface GetActivitiesResponse {
  success: boolean;
  message: string;
  data: ActivityCriterion[];
  path: string;
}

const getActivities = async (): Promise<ActivityCriterion[]> => {
  const { data } = await axiosInstance.get<GetActivitiesResponse>(
    "/common/activities"
  );
  return data.data;
};

export default getActivities;


