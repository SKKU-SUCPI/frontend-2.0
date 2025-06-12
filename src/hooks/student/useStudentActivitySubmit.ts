import { useMutation, useQueryClient } from "@tanstack/react-query";
import postStudentActivity from "@/apis/student/postStudentActivity";
import postStudentActivityFiles from "@/apis/student/postStudentActivityfiles";

const useStudentActivitySubmit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      activityId,
      content,
      files,
    }: {
      activityId: number;
      content: string;
      files?: File[];
    }) => {
      const submitResponse = await postStudentActivity({
        activityId,
        content,
      });
      if (files && files.length > 0) {
        const filesResponse = await postStudentActivityFiles({
          submitId: submitResponse.data.id,
          files,
        });
        console.log(filesResponse);
      }
      return submitResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentActivityList"] });
      // URL에서 id 쿼리 파라미터 제거
      const url = new URL(window.location.href);
      url.searchParams.delete("id");
      window.history.replaceState({}, "", url.toString());
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useStudentActivitySubmit;
