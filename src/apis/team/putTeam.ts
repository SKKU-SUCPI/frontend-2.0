import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface UpdateTeamRequest {
    teamName: string;
    members: {
        userId: number;
        memberRole: "LEADER" | "MEMBER";
    }[];
}

const putTeam = async (teamId: number, data: UpdateTeamRequest) => {
    const response = await axiosInstance.put(`/team/${teamId}`, data);
    return response.data;
};

export default putTeam;