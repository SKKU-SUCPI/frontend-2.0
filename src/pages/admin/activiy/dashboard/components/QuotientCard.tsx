/** @jsxImportSource @emotion/react */
import FlexBox from "@/styles/components/Flexbox";
import { css } from "@emotion/react";

interface QuotientCardProps {
  color: string;
  title: string;
  month: number;
  change: number;
  total: number;
}

const containerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-right: 10px;
`;

const titleStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
`;

const categoryStyle = css`
  font-size: 1rem;
  font-weight: 500;
  color: #888;
`;

const valueStyle = css`
  font-size: 1rem;
  font-weight: 600;
`;

export const QuotientCard = ({
  color,
  title,
  month,
  change,
  total,
}: QuotientCardProps) => {
  const isPositive = change >= 0;
  const changeColor = isPositive ? "#00C49F" : "#FF6B6B";
  return (
    <div css={containerStyle} style={{ borderLeft: `6px solid ${color}` }}>
      <FlexBox
        direction="column"
        align="flex-start"
        gap="10px"
        css={{ paddingRight: "20px" }}
      >
        <div css={titleStyle}>{title}</div>
        <FlexBox align="flex-start" justify="space-between">
          <div>
            <div css={categoryStyle}>이번 달</div>
            <div css={valueStyle}>{month}건</div>
          </div>
          <div>
            <div css={categoryStyle}>전월 대비</div>
            <div css={valueStyle} style={{ color: changeColor }}>
              {isPositive ? "▲" : "▼"} {Math.abs(change)}%
            </div>
          </div>
          <div>
            <div css={categoryStyle}>총 제출</div>
            <div css={valueStyle}>{total}건</div>
          </div>
        </FlexBox>
      </FlexBox>
    </div>
  );
};
