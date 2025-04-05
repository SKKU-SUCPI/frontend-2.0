import React, { ReactNode } from "react";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";

const overlayStyle = (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${isOpen ? "1" : "0"};
  visibility: ${isOpen ? "visible" : "hidden"};
  transition: all 0.3s ease-in-out;
`;

const modalStyle = css`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const titleStyle = css`
  font-size: 1.2rem;
  font-weight: 500;
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

const contentStyle = css`
  flex: 1;
  overflow-y: auto;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <FlexBox css={overlayStyle(isOpen)} onClick={handleOverlayClick}>
      <div css={modalStyle}>
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
        <div css={contentStyle}>{children}</div>
      </div>
    </FlexBox>
  );
};

export default Modal;
