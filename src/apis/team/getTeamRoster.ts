import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface TeamMember {
  userId: number;
  userName: string;
  memberRole: "LEADER" | "MEMBER";
  joinStatus: number;
}

export interface TeamRosterResponse {
  teamId: number;
  roster: TeamMember[];
}

export const getTeamRoster = async (teamId: number) => {
  const response = await axiosInstance.get(`/team/${teamId}/roster`);
  
  const responseData = response.data.data;

  return responseData.members || responseData.roster || [];
};