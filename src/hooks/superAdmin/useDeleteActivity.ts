import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteActivity from "@/apis/superAdmin/deleteActivity";
import { ACTIVITIES_QUERY_KEY } from "@/hooks/common/useActivities";

export default function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => deleteActivity(activityId),
    onSuccess: () => {
      // 활동 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
    },
  });
}

