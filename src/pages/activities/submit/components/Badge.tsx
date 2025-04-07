/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface ColorSet {
  background: string;
  font: string;
}

interface BadgeProps {
  label: string;
  colors?: ColorSet;
  fontSize?: string | number;
  onClick?: () => void;
}

const baseBadgeStyle = css`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: 0.6;
  }
`;

const defaultColors: ColorSet = {
  background: "#ffffff",
  font: "#333333",
};

function Badge({
  label,
  colors = defaultColors,
  fontSize = "12px",
  onClick,
}: BadgeProps) {
  const badgeStyle = css`
    ${baseBadgeStyle}
    background-color: ${colors.background};
    color: ${colors.font};
    font-size: ${typeof fontSize === "number" ? `${fontSize}px` : fontSize};
  `;

  return (
    <span css={badgeStyle} onClick={onClick}>
      {label}
    </span>
  );
}

export default Badge;
