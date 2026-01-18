/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 24px 32px;
  max-width: 400px;
  text-align: center;
`;

export const ModalTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const ModalDesc = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 24px;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

interface ModalButtonProps {
  variant?: "primary" | "danger" | "cancel";
}

export const ModalButton = styled.button<ModalButtonProps>`
  padding: 10px 28px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.15s;
  border: ${({ variant }) =>
    variant === "cancel" ? "1px solid #e0e0e0" : "none"};
  background: ${({ variant }) =>
    variant === "danger" ? "#dc2626" : variant === "cancel" ? "#f5f5f5" : "#2c2c2c"};
  color: ${({ variant }) => (variant === "cancel" ? "#666" : "#fff")};

  &:hover {
    background: ${({ variant }) =>
      variant === "danger"
        ? "#b91c1c"
        : variant === "cancel"
        ? "#e8e8e8"
        : "#1a1a1a"};
  }
`;

