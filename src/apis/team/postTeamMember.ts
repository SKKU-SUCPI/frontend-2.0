import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface AddTeamMemberRequest {
    userId: number;
    memberRole: "LEADER" | "MEMBER";
}

const postTeamMember = async (teamId: number, data: AddTeamMemberRequest) => {
    const response = await axiosInstance.post(`/team/${teamId}/members`, data);
    return response.data;
};

export default postTeamMember;