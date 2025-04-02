/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";
import NavBar from "@/components/layouts/NavBar";

const layoutStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainLayout: React.FC = () => {
  return (
    <div css={layoutStyle}>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
