import { useMutation, useQueryClient } from "@tanstack/react-query";
import postStudentActivityFiles from "@/apis/student/postStudentActivityfiles";

const useStudentActivityReSubmit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      submitId,
      files,
    }: {
      submitId: number;
      files: File[];
    }) => {
      const submitResponse = await postStudentActivityFiles({
        submitId,
        files,
      });
      return submitResponse;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["studentActivityList"] });
      queryClient.invalidateQueries({
        queryKey: ["studentActivityItem", String(variables.submitId)],
      });
      // URL에서 id 쿼리 파라미터 제거
      const url = new URL(window.location.href);
      url.searchParams.delete("id");
      window.history.replaceState({}, "", url.toString());
      alert("추가 증빙 자료 제출에 성공했습니다.");
    },
    onError: (error) => {
      console.error(error);
      alert("추가 증빙 자료 제출에 실패했습니다.");
    },
  });
};

export default useStudentActivityReSubmit;
