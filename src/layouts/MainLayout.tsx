/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";
import NavBar from "@/layouts/NavBar";
import TopBar from "@/layouts/TopBar";

const layoutStyle = css`
  display: flex;
  height: 100vh;
`;

const contentWrapperStyle = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const contentStyle = css`
  flex-grow: 1;
  padding: 24px;
  background-color: #ffffff;
  overflow-y: auto;
`;

const MainLayout: React.FC = () => {
  return (
    <div css={layoutStyle}>
      <NavBar />
      <div css={contentWrapperStyle}>
        <TopBar />
        <div css={contentStyle}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
