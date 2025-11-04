import { useMutation, useQueryClient } from "@tanstack/react-query";
import postActivity, { PostActivityRequest } from "@/apis/superAdmin/postActivity";
import { ACTIVITIES_QUERY_KEY } from "@/hooks/common/useActivities";

export default function usePostActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostActivityRequest) => postActivity(data),
    onSuccess: () => {
      // 활동 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
    },
  });
}

