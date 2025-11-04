import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteAdminSubmit from "@/apis/admin/deleteAdminSubmit";
import useAuthStore from "@/stores/auth/authStore";

const useDeleteAdminSubmit = () => {
  const queryClient = useQueryClient();
  const { userProfile } = useAuthStore();

  return useMutation({
    mutationFn: deleteAdminSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminActivityList"] });
      queryClient.invalidateQueries({ queryKey: ["adminActivityItem"] });
      alert("제출내역이 삭제되었습니다.");
      // 완전히 새로고침하면서 목록 페이지로 이동
      window.location.href = userProfile?.role === "super-admin" ? "/superGod/activity/list" : "/god/activity/list";
    },
    onError: (error) => {
      alert("제출내역 삭제에 실패했습니다.");
      console.error(error);
    },
  });
};

export default useDeleteAdminSubmit;

