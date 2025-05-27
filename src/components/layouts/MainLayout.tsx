/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";
import NavBar from "@/components/layouts/NavBar";
import useUserStore from "@/stores/auth/userStore";
import useAuthStore from "@/stores/auth/authStore";
const layoutStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const contentStyle = css`
  width: 100%;
  height: 100%;
  // TODO: 정확한 기준으로 다시 설정할 것
  max-width: 1100px;
  margin-top: 20px;
`;

const MainLayout: React.FC = () => {
  const { user_role } = useUserStore();
  const { isAuthenticated } = useAuthStore();
  console.log("user_role", user_role);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <div css={layoutStyle}>
      <NavBar />
      <div css={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
