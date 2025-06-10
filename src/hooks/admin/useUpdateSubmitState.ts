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
    onSuccess: ({ data: { id } }) => {
      console.log("onSuccess", id);
      queryClient.invalidateQueries({ queryKey: ["activityItem", id] });
      queryClient.invalidateQueries({ queryKey: ["activityLists"] });
    },
  });
};
