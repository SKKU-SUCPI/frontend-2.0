import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface PatchJoinStatusRequest {
  teamId: number;
  joinStatus: number; // (0 = JOINED, 1 = PENDING, 2 = REJECTED)
}

const patchTeamJoinStatus = async (data: PatchJoinStatusRequest) => {
  const response = await axiosInstance.post("/team/join-status/patch", data);
  return response.data;
};

export default patchTeamJoinStatus;