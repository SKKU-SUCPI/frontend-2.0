import useAuthStore from "@/stores/auth/authStore";
import useAdminActivityItem from "@/hooks/admin/useAdminActivityItem";
import useStudentActivityItem from "@/hooks/student/useStudentActivityItem";
import Loading from "@/components/layouts/Loading";
import AdminActivityView from "./AdminActivityView";
import ActivityReview from "./ActivityReview";
import ActivitySubmit from "./ActivitySubmit";
import StudentActivityView from "./StudentActivityView";
const ActivityRouter = ({ id }: { id: string | null }) => {
  const { userProfile } = useAuthStore();

  if (!id) {
    return <div>활동 상세 정보가 없습니다.</div>;
  }

  // 관리자
  if (userProfile?.role === "admin" || userProfile?.role === "super-admin") {
    const { data, isLoading } = useAdminActivityItem(id);

    if (isLoading) {
      return <Loading />;
    }

    if (data.basicInfo.state === 0) {
      return (
        <ActivityReview key={`review-${id}-${data.basicInfo.state}`} id={id} />
      );
    }

    if (data.basicInfo.state === 1 || data.basicInfo.state === 2) {
      return (
        <AdminActivityView key={`view-${id}-${data.basicInfo.state}`} id={id} />
      );
    }
  }

  // 학생
  if (userProfile?.role === "student") {
    if (id === "new") {
      return <ActivitySubmit />;
    } else {
      const { data, isLoading } = useStudentActivityItem(id);
      if (isLoading) {
        return <Loading />;
      }
      return <StudentActivityView key={`view-${id}-${data.state}`} id={id} />;
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
