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
  align-items: center;
  padding: 16px;
`;

const contentStyle = css`
  flex-grow: 1;
  width: 100%;
  background-color: #ffffff;
  border-radius: 24px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MainLayout: React.FC = () => {
  return (
    <div css={layoutStyle}>
      <NavBar />
      <div css={contentWrapperStyle}>
        <div css={contentStyle}>
          <TopBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
