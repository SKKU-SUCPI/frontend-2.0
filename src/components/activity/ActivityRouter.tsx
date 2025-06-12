import useAuthStore from "@/stores/auth/authStore";
import useAdminActivityItem from "@/hooks/admin/useAdminActivityItem";
import Loading from "@/components/layouts/Loading";
import ActivityView from "./ActivityView";
import ActivityReview from "./ActivityReview";
import ActivitySubmit from "./ActivitySubmit";
const ActivityRouter = ({ id }: { id: string | null }) => {
  const { userProfile } = useAuthStore();

  if (!id) {
    return <div>활동 상세 정보가 없습니다.</div>;
  }

  // 학생
  if (userProfile?.role === "student") {
    if (id === "new") {
    }
  }

  // 관리자
  if (userProfile?.role === "admin" || userProfile?.role === "super-admin") {
    const { data, isLoading } = useAdminActivityItem(id);
    console.log(data);

    if (isLoading) {
      return <Loading />;
    }

    console.log(`state: ${data.basicInfo.state}`);

    if (data.basicInfo.state === 0) {
      return (
        <ActivityReview key={`review-${id}-${data.basicInfo.state}`} id={id} />
      );
    }

    if (data.basicInfo.state === 1 || data.basicInfo.state === 2) {
      return (
        <ActivityView key={`view-${id}-${data.basicInfo.state}`} id={id} />
      );
    }
  }
  if (userProfile?.role === "student") {
    if (id === "new") {
      return <ActivitySubmit />;
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
