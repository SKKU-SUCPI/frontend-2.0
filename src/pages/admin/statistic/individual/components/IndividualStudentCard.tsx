import React from "react";
import { css } from "@emotion/react";

interface StudentCardProps {
  name: string;
  studentId: string;
  department: string;
  totalScore: number;
  lq?: number;
  rq?: number;
  cq?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

const cardWrapperStyle = (isSelected: boolean) => css`
  display: flex;
  align-items: center;
  border: ${isSelected ? "2px solid #6b7280" : "1px solid #e0e0e0"};
  border-radius: 16px;
  padding: 1rem 1.5rem;
  background: ${isSelected ? "#f9fafb" : "#fff"};
  min-height: 64px;
  transition: all 0.15s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    ${isSelected &&
    `
      box-shadow: 0 2px 12px rgba(107, 114, 128, 0.15);
    `}
  }
`;

const infoSectionStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const nameStyle = css`
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
`;

const subInfoStyle = css`
  color: #7b7b7b;
  font-size: 1rem;
  margin-top: 2px;
`;

const scoreSectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 2rem;
`;

const totalScoreStyle = css`
  font-size: 1.5rem;
  font-weight: 800;
  color: #222;
`;

const qScoreStyle = css`
  color: #7b7b7b;
  font-size: 1rem;
  margin-top: 2px;
`;

const IndividualStudentCard: React.FC<StudentCardProps> = ({
  name,
  studentId,
  department,
  totalScore,
  lq = 0,
  rq = 0,
  cq = 0,
  onClick,
  isSelected = false,
}) => {
  return (
    <div css={cardWrapperStyle(isSelected)} onClick={onClick}>
      <div css={infoSectionStyle}>
        <span css={nameStyle}>{name}</span>
        <span css={subInfoStyle}>
          {studentId} · {department}
        </span>
      </div>
      <div css={scoreSectionStyle}>
        <span css={totalScoreStyle}>{totalScore}점</span>
        <span css={qScoreStyle}>
          LQ:{lq} RQ:{rq} CQ:{cq}
        </span>
      </div>
    </div>
  );
};

export default IndividualStudentCard;
