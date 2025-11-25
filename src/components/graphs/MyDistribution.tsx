import React from "react";
import { css } from "@emotion/react";
import IndividualDistribution from "./IndividualDistribution";
import TotalDistribution from "./TotalDistribution";
import Card from "@/styles/components/Card";

interface MyDistributionProps {
  tlq: number;
  trq: number;
  tcq: number;
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

const cardStyle = css`
  padding: 32px;
  background: white;
  border-radius: 12px;
`;

const dividerStyle = css`
  height: 2px;
  background: linear-gradient(to right, transparent, #e0e0e0, transparent);
  margin: 16px 0;
`;

const MyDistribution: React.FC<MyDistributionProps> = ({ tlq, trq, tcq }) => {
  return (
    <div css={containerStyle}>
      {/* 개별 3Q 지수 분포 */}
      <Card css={cardStyle}>
        <IndividualDistribution tlq={tlq} trq={trq} tcq={tcq} />
      </Card>

      <div css={dividerStyle} />

      {/* 총 3Q 점수 분포 */}
      <Card css={cardStyle}>
        <TotalDistribution tlq={tlq} trq={trq} tcq={tcq} />
      </Card>
    </div>
  );
};

export default MyDistribution;

