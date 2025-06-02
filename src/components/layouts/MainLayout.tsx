/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "@/components/layouts/NavBar";
import { motion } from "framer-motion";

const layoutStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const contentStyle = css`
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin-top: 20px;
  position: relative; // 애니메이션 대상 요소가 겹치지 않도록
`;

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div css={layoutStyle}>
      <NavBar />
      <div css={contentStyle}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          exit={{ opacity: 0 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default MainLayout;
