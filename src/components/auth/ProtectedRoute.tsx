import useUserStore from "@/stores/auth/userStore";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: number[];
}
const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user_id, user_role } = useUserStore();

  console.log(`protected route: ${user_id}, ${user_role}`);
  if (!user_id) {
    // 알림 띄우고 로그인 페이지로 리다이렉트
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" replace />;
  }

  if (user_role !== null && !allowedRoles.includes(user_role)) {
    // 알림 띄우고 메인으로 리다이렉트
    alert("권한이 없습니다. 메인 페이지로 이동합니다.");
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
