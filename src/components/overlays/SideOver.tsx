import React, { ReactNode } from "react";
import { css } from "@emotion/react";

const sidebarStyle = (
  isOpen: boolean,
  width: string,
  position: "left" | "right"
) => css`
  position: fixed;
  top: 0;
  ${position === "right"
    ? `right: ${isOpen ? "0" : `-${width}`}; left: auto;`
    : `left: ${isOpen ? "0" : `-${width}`}; right: auto;`}
  width: ${width};
  height: 100vh;
  background: white;
  box-shadow: ${position === "right"
    ? "-2px 0 5px rgba(0, 0, 0, 0.1)"
    : "2px 0 5px rgba(0, 0, 0, 0.1)"};
  padding: 20px;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  opacity: ${isOpen ? "1" : "0"};
  transform: translateX(
    ${isOpen ? "0" : position === "right" ? "100px" : "-100px"}
  );
  pointer-events: ${isOpen ? "all" : "none"};
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const titleStyle = css`
  font-size: 1.2rem;
  font-weight: 600;
  flex: 1;
`;

const closeButtonStyle = css`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  &:hover {
    color: #333;
  }
`;

interface SideOverProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string;
  position?: "left" | "right";
}

const SideOver: React.FC<SideOverProps> = ({
  isOpen,
  onClose,
  children,
  title,
  width = "400px",
  position = "right",
}) => {
  return (
    <div css={sidebarStyle(isOpen, width, position)}>
      {title && (
        <div css={headerStyle}>
          <div css={titleStyle}>{title}</div>
          <button css={closeButtonStyle} onClick={onClose}>
            ×
          </button>
        </div>
      )}
      {!title && (
        <button
          css={[
            closeButtonStyle,
            css`
              position: absolute;
              top: 10px;
              right: 10px;
            `,
          ]}
          onClick={onClose}
        >
          ×
        </button>
      )}
      {children}
    </div>
  );
};

export default SideOver;
