import useAuthStore from "@/stores/auth/authStore";
// import useAdminActivityItem from "@/hooks/admin/useAdminActivityItem";
// import useStudentActivityItem from "@/hooks/student/useStudentActivityItem";
// import Loading from "@/components/layouts/Loading";
import AdminActivityDetail from "./AdminActivityDetail";
import ActivitySubmit from "./ActivitySubmit";
import StudentActivityDetail from "./StudentActivityDetail";
const ActivityRouter = ({ id }: { id: string | null }) => {
  const { userProfile } = useAuthStore();

  if (!id) {
    return <div>활동 상세 정보가 없습니다.</div>;
  }

  // 관리자
  if (userProfile?.role === "admin" || userProfile?.role === "super-admin") {
    // 단일 상세 뷰로 통합
    return <AdminActivityDetail id={id} />;
  }

  // 학생
  if (userProfile?.role === "student") {
    if (id === "new") {
      return <ActivitySubmit />;
    } else {
      return <StudentActivityDetail id={id} />;
    }
  }
  return (
    <div>
      <div>활동 상세 정보 (ID: {id})</div>
      {/* 여기에 활동 상세 내용을 추가할 수 있습니다 */}
    </div>
  );
};

export default ActivityRouter;
