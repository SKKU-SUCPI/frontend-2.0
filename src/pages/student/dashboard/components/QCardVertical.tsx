import React from "react";
import { css } from "@emotion/react";

interface QCardVerticalProps {
  title: string;
  category: "LQ" | "RQ" | "CQ";
  description: string;
  score: number;
  percentage: number;
  average: number;
  total: number;
}

const cardStyle = css`
  border-radius: 12px;
  padding: 12px;
  max-width: 540px;
`;

const topSection = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const leftInfo = css`
  display: flex;
  align-items: flex-start;
`;

const dotStyle = (category: string) => css`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${category === "LQ"
    ? "#0088FE"
    : category === "RQ"
    ? "#00C49F"
    : "#FFBB28"};
  margin-right: 16px;
  margin-top: 6px;
`;

const textInfo = css`
  display: flex;
  flex-direction: column;
`;

const titleStyle = css`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 2px;
`;

const descriptionStyle = css`
  color: #757575;
  font-size: 1rem;
  margin-bottom: 0;
`;

const scoreStyle = css`
  font-size: 1.6rem;
  font-weight: 800;
  margin-left: 24px;
  margin-top: 2px;
`;

const barSection = css`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const barContainerStyle = css`
  flex: 1;
  height: 8px;
  background: #f3f3f3;
  border-radius: 6px;
  margin-right: 16px;
`;

const barStyle = (percent: number) => css`
  height: 100%;
  width: ${percent}%;
  background: #222;
  border-radius: 6px;
  transition: width 0.4s;
`;

const percentTextStyle = css`
  color: #757575;
  font-size: 1rem;
  font-weight: 500;
  min-width: 70px;
`;

const bottomSection = css`
  margin-top: 24px;
  color: #757575;
  font-size: 1rem;
  font-weight: 500;
`;

const QCardVertical: React.FC<QCardVerticalProps> = ({
  title,
  category,
  description,
  score,
  percentage,
  average,
  total,
}) => {
  return (
    <div css={cardStyle}>
      <div css={topSection}>
        <div css={leftInfo}>
          <div css={dotStyle(category)} />
          <div css={textInfo}>
            <span css={titleStyle}>{title}</span>
            <span css={descriptionStyle}>{description}</span>
          </div>
        </div>
        <div css={scoreStyle}>{score}점</div>
      </div>
      <div css={barSection}>
        <div css={barContainerStyle}>
          <div css={barStyle((score / total) * 100)} />
        </div>
        <span css={percentTextStyle}>상위 {percentage}%</span>
      </div>
      <div css={bottomSection}>학과 평균: {average}점</div>
    </div>
  );
};

export default QCardVertical;
