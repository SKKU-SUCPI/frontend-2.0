import { useMutation, useQueryClient } from "@tanstack/react-query";
import patchStudentActivity from "@/apis/student/patchStudentActivity";

const usePatchStudentActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchStudentActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentActivityList"] });
      queryClient.invalidateQueries({ queryKey: ["studentActivityItem"] });
      alert("활동이 수정되었습니다.");
    },
    onError: (error) => {
      alert("활동 수정에 실패했습니다.");
      console.error(error);
    },
  });
};

export default usePatchStudentActivity;

