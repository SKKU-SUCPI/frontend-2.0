import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserStore from "@/stores/auth/userStore";
import useAuthStore from "@/stores/auth/authStore";
interface ProtectedRouteProps {
  allowedRoles: string[];
}

const defaultPage: Record<string, string> = {
  student: "/student",
  admin: "/admin",
  "super-admin": "/superAdmin",
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { role } = useUserStore();
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const pathname = location.pathname;

  // 1. 로그인 안 된 경우
  if (!isAuthenticated || role === null) {
    if (pathname === "/") return <Outlet />; // Home 허용
    alert("로그인 후 이용해주세요.");
    return <Navigate to="/" replace />;
  }

  // 2. 로그인 되어 있고, "/" 접근 → 자동 리디렉션
  if (pathname === "/") {
    return <Navigate to={defaultPage[role]} replace />;
  }

  // 3. 로그인 OK but 권한 없음 → 본인 디폴트 경로로 리디렉션
  if (!allowedRoles.includes(role)) {
    alert("접근 권한이 없습니다. 본인 권한 페이지로 이동합니다.");
    return <Navigate to={defaultPage[role]} replace />;
  }

  // 4. 권한 OK → 정상 렌더링
  return <Outlet />;
};

export default ProtectedRoute;
