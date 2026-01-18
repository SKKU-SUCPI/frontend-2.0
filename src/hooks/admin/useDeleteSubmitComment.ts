import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteSubmitComment from "@/apis/admin/deleteSubmitComment";

const useDeleteSubmitComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubmitComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminActivityItem"] });
      alert("댓글이 삭제되었습니다.");
    },
    onError: (error) => {
      alert("댓글 삭제에 실패했습니다.");
      console.error(error);
    },
  });
};

export default useDeleteSubmitComment;

