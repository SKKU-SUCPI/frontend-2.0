import { useQuery } from "@tanstack/react-query";
import getProjectTeams from "@/apis/team/getProjectTeams";

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