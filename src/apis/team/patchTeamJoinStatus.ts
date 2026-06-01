import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface PatchJoinStatusRequest {
  teamId: number;
  joinStatus: "JOINED" | "REJECTED";
}

const patchTeamJoinStatus = async (data: PatchJoinStatusRequest) => {
  const response = await axiosInstance.post("/team/join-status/patch", data);
  return response.data;
};

export default patchTeamJoinStatus;