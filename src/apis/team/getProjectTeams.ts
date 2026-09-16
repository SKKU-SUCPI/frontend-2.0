import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface ProjectTeam {
  teamId: number;
  teamName: string;
  projectId: number;
  memberCount: number;
}

export interface GetProjectTeamsResponse {
  success: boolean;
  data: ProjectTeam[];
}

const getProjectTeams = async (projectId: number): Promise<ProjectTeam[]> => {
  const response = await axiosInstance.get(`/team/project/${projectId}`);
  return response.data.data;
};

export default getProjectTeams;