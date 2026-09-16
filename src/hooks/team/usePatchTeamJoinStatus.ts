import { useMutation, useQueryClient } from "@tanstack/react-query";
import patchTeamJoinStatus from "@/apis/team/patchTeamJoinStatus";

export const usePatchTeamJoinStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchTeamJoinStatus,
        onSuccess: (_, variables) => {
            // automatically refresh relevant rosters when a member status modification clears
            queryClient.invalidateQueries({ queryKey: ["teamRoster", variables.teamId]});
        },
    });
};