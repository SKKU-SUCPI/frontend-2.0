import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getProjectTeams from "@/apis/team/getProjectTeams";
import { getTeamRoster } from "@/apis/team/getTeamRoster";
import patchTeamJoinStatus from "@/apis/team/patchTeamJoinStatus";

// query all active teams for project
export const useProjectTeams = (projectId: number) => {
    return useQuery({
        queryKey: ["projectTeams", projectId],
        queryFn: () => getProjectTeams(projectId),
        // only execute if a valid projectId is specified
        enabled: !!projectId,
        // cache data cleanly for 3 minutes
        staleTime: 1000 * 60 * 3,
    });
};

// query the member roster of specific team
export const useTeamRoster = (teamId: number) => {
    return useQuery({
        queryKey: ["teamRoster", teamId],
        queryFn: () => getTeamRoster(teamId),
        enabled: !!teamId,
        staleTime: 1000 + 60 * 2,
    });
};

// patch user's join status
export const useUpdateTeamJoinStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchTeamJoinStatus,
        onSuccess: (_, variables)
    })
}