import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface ProjectActivityRule {
    activityId: number;
    activityName: string;
    customWeight: number;
}

export const getProjectActivityRules = async (projectId: number): Promise<ProjectActivityRule[]> => {
    const response = await axiosInstance.get(`/admin/project/${projectId}/rules`);
    return response.data.data;
}