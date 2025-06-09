import useAuthStore from "@/stores/auth/authStore";
import useActivityItem from "@/hooks/admin/useActivityItem";
import Loading from "@/components/layouts/Loading";
import ActivityView from "./ActivityView";
import ActivityReview from "./ActivityReview";
const ActivityRouter = ({ id }: { id: string | null }) => {
  const { userProfile } = useAuthStore();

  if (!id) {
    return <div>활동 상세 정보가 없습니다.</div>;
  }

  // 학생
  if (userProfile?.role === "student") {
    return <div>학생 활동 상세 정보</div>;
  }

  // 관리자
  if (userProfile?.role === "admin" || userProfile?.role === "super-admin") {
    const { data, isLoading } = useActivityItem(id);
    console.log(data);

    if (isLoading) {
      return <Loading />;
    }

    if (data.basicInfo.state === 0) {
      return <ActivityReview id={id} />;
    }

    if (data.basicInfo.state === 1 || data.basicInfo.state === 2) {
      return <ActivityView id={id} />;
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
