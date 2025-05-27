import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserStore from "@/stores/auth/userStore";
import useAuthStore from "@/stores/auth/authStore";
interface ProtectedRouteProps {
  allowedRoles: number[];
}

const defaultPage: Record<number, string> = {
  0: "/student",
  1: "/admin",
  2: "/superAdmin",
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user_role } = useUserStore();
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const pathname = location.pathname;

  // 1. 로그인 안 된 경우
  if (!isAuthenticated || user_role === null) {
    if (pathname === "/") return <Outlet />; // Home 허용
    return <Navigate to="/" replace />;
  }

  // 2. 로그인 되어 있고, "/" 접근 → 자동 리디렉션
  if (pathname === "/") {
    return <Navigate to={defaultPage[user_role]} replace />;
  }

  // 3. 로그인 OK but 권한 없음 → 본인 디폴트 경로로 리디렉션
  if (!allowedRoles.includes(user_role)) {
    alert("접근 권한이 없습니다. 본인 권한 페이지로 이동합니다.");
    return <Navigate to={defaultPage[user_role]} replace />;
  }

  // 4. 권한 OK → 정상 렌더링
  return <Outlet />;
};

export default ProtectedRoute;
