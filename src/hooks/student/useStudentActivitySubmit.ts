import { useMutation, useQueryClient } from "@tanstack/react-query";
import postStudentActivity from "@/apis/student/postStudentActivity";
import postStudentActivityFiles from "@/apis/student/postStudentActivityfiles";

const useStudentActivitySubmit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      activityId,
      title,
      content,
      files,
    }: {
      activityId: number;
      title: string;
      content: string;
      files?: File[];
    }) => {
      const submitResponse = await postStudentActivity({
        activityId,
        title,
        content,
      });
      if (files && files.length > 0) {
        await postStudentActivityFiles({
          submitId: submitResponse.data.id,
          files,
        });
      }
      return submitResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentActivityList"] });
      // URL에서 id 쿼리 파라미터 제거
      const url = new URL(window.location.href);
      url.searchParams.delete("id");
      window.history.replaceState({}, "", url.toString());
      alert("활동 제출에 성공했습니다.");
    },
    onError: (error) => {
      alert("활동 제출에 실패했습니다.");
      console.error(error);
    },
  });
};

export default useStudentActivitySubmit;
