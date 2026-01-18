import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteStudentActivity from "@/apis/student/deleteStudentActivity";

const useDeleteStudentActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudentActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentActivityList"] });
      queryClient.invalidateQueries({ queryKey: ["studentActivityItem"] });
      // 완전히 새로고침하면서 목록 페이지로 이동 (400 에러 방지)
      window.location.href = "/student/activity";
    },
    onError: (error) => {
      alert("활동 삭제에 실패했습니다.");
      console.error(error);
    },
  });
};

export default useDeleteStudentActivity;

