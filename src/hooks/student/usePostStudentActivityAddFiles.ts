import { useMutation, useQueryClient } from "@tanstack/react-query";
import postStudentActivityFiles from "@/apis/student/postStudentActivityfiles";

const usePostStudentActivityAddFiles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStudentActivityFiles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentActivityItem"] });
      alert("파일이 추가되었습니다. (기존 파일은 삭제되었습니다.)");
    },
    onError: (error) => {
      alert("파일 추가에 실패했습니다.");
      console.error(error);
    },
  });
};

export default usePostStudentActivityAddFiles;

