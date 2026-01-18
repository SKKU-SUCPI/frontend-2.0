import { useMutation, useQueryClient } from "@tanstack/react-query";
import putRatio, { PutRatioRequest } from "@/apis/superAdmin/putRatio";
import { RATIO_QUERY_KEY } from "@/hooks/admin/useGetRatio";

export default function usePutRatio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PutRatioRequest) => putRatio(data),
    onSuccess: () => {
      // 비율 데이터 다시 불러오기
      queryClient.invalidateQueries({ queryKey: RATIO_QUERY_KEY });
    },
  });
}

