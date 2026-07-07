import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface TeamMember {
  userId: number;
  userName: string;
  memberRole: "LEADER" | "MEMBER";
  joinStatus: number;
}

export const getTeamRoster = async (teamId: number): Promise<TeamMember[]> => {
  const response = await axiosInstance.get(`/team/${teamId}/roster`);
  return response.data.data;
};