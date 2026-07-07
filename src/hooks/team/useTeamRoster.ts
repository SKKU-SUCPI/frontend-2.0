import { useQuery } from "@tanstack/react-query";
import { getTeamRoster } from "@/apis/team/getTeamRoster";

// query the member roster of specific team
export const useTeamRoster = (teamId: number) => {
    return useQuery({
        queryKey: ["teamRoster", teamId],
        queryFn: () => getTeamRoster(teamId),
        enabled: !!teamId,
        staleTime: 1000 + 60 * 2,
    });
};