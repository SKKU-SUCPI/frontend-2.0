import { useMutation, useQueryClient } from "@tanstack/react-query";
import patchSubmitComment from "@/apis/admin/patchSubmitComment";

const usePatchSubmitComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchSubmitComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminActivityItem"] });
    },
    onError: (error) => {
      alert("댓글 수정에 실패했습니다.");
      console.error(error);
    },
  });
};

export default usePatchSubmitComment;

