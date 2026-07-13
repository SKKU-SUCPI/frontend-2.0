import axiosInstance from "@/apis/utils/axiosInterceptor";

const deleteTeam = async (teamId: number) => {
    const response = await axiosInstance.delete(`/team/${teamId}`);
    return response.data;
};

export default deleteTeam;