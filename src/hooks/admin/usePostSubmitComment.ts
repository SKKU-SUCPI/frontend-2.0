import { useMutation, useQueryClient } from "@tanstack/react-query";
import postSubmitComment from "@/apis/admin/postSubmitComment";

const usePostSubmitComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      postSubmitComment(id, content),
    onSuccess: (_response, variables) => {
      // 목록과 상세 둘 다 새로 고침
      queryClient.invalidateQueries({ queryKey: ["adminActivityLists"] });
      queryClient.invalidateQueries({
        queryKey: ["adminActivityItem", variables.id],
      });
      queryClient.refetchQueries({
        queryKey: ["adminActivityItem", variables.id],
      });
    },
  });
};

export default usePostSubmitComment;


