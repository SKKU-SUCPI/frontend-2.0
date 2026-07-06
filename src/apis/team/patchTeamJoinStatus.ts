import axiosInstance from "@/apis/utils/axiosInterceptor";

export interface PatchJoinStatusRequest {
  teamId: number;
<<<<<<< HEAD
  joinStatus: number; // (0 = JOINED, 1 = PENDING, 2 = REJECTED)
=======
  joinStatus: "JOINED" | "REJECTED";
>>>>>>> 1af930c19b5a359afa26ee417dea5f8ccaae3b0b
}

const patchTeamJoinStatus = async (data: PatchJoinStatusRequest) => {
  const response = await axiosInstance.post("/team/join-status/patch", data);
  return response.data;
};

export default patchTeamJoinStatus;