import { useMutation, useQueryClient } from "@tanstack/react-query";
import postSubmitState from "@/apis/admin/postSubmitState";

export const useUpdateSubmitState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      state,
      comment,
    }: {
      id: string;
      state: string;
      comment: string;
    }) => postSubmitState(id, state, comment),
    onSuccess: (response) => {
      console.log("onSuccess", String(response.data.id));
      queryClient.invalidateQueries({ queryKey: ["adminActivityLists"] });
      queryClient.invalidateQueries({
        queryKey: ["adminActivityItem", String(response.data.id)],
      });
    },
  });
};
