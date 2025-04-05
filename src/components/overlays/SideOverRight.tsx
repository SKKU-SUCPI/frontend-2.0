import React, { ReactNode } from "react";
import { css } from "@emotion/react";

const sidebarStyle = (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  right: ${isOpen ? "0" : "-400px"};
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  opacity: ${isOpen ? "1" : "0"};
  transform: translateX(${isOpen ? "0" : "100px"});
  pointer-events: ${isOpen ? "all" : "none"};
`;

interface SideOverRightProps {
  isOpen: boolean;
  children: ReactNode;
}

const SideOverRight: React.FC<SideOverRightProps> = ({ isOpen, children }) => {
  return <div css={sidebarStyle(isOpen)}>{children}</div>;
};

export default SideOverRight;
