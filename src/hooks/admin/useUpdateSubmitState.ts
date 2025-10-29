import { useMutation, useQueryClient } from "@tanstack/react-query";
import postSubmitState from "@/apis/admin/postSubmitState";

export const useUpdateSubmitState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, state }: { id: string; state: string }) =>
      postSubmitState(id, state),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["adminActivityLists"] });
      queryClient.invalidateQueries({
        queryKey: ["adminActivityItem", String(response.data.id)],
      });
    },
  });
};
