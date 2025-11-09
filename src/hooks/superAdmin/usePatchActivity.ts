import { useMutation, useQueryClient } from "@tanstack/react-query";
import patchActivity, { PatchActivityRequest } from "@/apis/superAdmin/patchActivity";
import { ACTIVITIES_QUERY_KEY } from "@/hooks/common/useActivities";

export default function usePatchActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PatchActivityRequest) => patchActivity(data),
    onSuccess: () => {
      // 활동 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
    },
  });
}

