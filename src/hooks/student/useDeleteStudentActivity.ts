import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteStudentActivity from "@/apis/student/deleteStudentActivity";
import { useNavigate } from "react-router-dom";

const useDeleteStudentActivity = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteStudentActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentActivityList"] });
      queryClient.invalidateQueries({ queryKey: ["studentActivityItem"] });
      alert("활동이 삭제되었습니다.");
      navigate("/student/activity");
    },
    onError: (error) => {
      alert("활동 삭제에 실패했습니다.");
      console.error(error);
    },
  });
};

export default useDeleteStudentActivity;

