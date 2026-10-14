import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface PatchProjectRuleItem {
    activityId: number;
    customWeight: number;
}

export interface PatchProjectRulesRequest {
    projectId: number;
    rules: PatchProjectRuleItem[];
}

const patchProjectActivityRules = async (data: PatchProjectRulesRequest) => {
    const response = await axiosInstance.post("/admin/project/rules/patch", data);
    return response.data;
};

export default patchProjectActivityRules;