import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface CreateTeamRequest {
    projectId: number;
    teamName: string;
}

const postTeam = async (data: CreateTeamRequest) => {
    const response = await axiosInstance.post(`/team`, data);
    return response.data;
};

export default postTeam;