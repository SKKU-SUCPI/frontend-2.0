import React from "react";
import { css } from "@emotion/react";

const categoryColor = {
  LQ: "#0088FE",
  RQ: "#00C49F",
  CQ: "#FFBB28",
};

interface ActivityPreviewItemProps {
  title: string;
  category: "LQ" | "RQ" | "CQ";
  status: 0 | 1 | 2;
  date?: string;
}

const getStatus = (status: number) => {
  if (status === 0) return "승인";
  else if (status === 1) return "반려";
  else if (status === 2) return "대기";
  return "대기";
};

const parseDate = (dateString: string) => {
  return dateString.split("T")[0];
};

const cardStyle = css`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 18px 20px;
  margin-bottom: 12px;
  min-width: 320px;
  justify-content: space-between;
`;

const dotStyle = (color: string) => css`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${color};
  margin-right: 14px;
`;

const titleStyle = css`
  font-size: 1.1rem;
  font-weight: 500;
`;

const statusStyle = (status: string) => {
  let color = "#888";
  if (status === "승인") color = "#2ecc40"; // 초록
  else if (status === "대기") color = "#ffcc00"; // 노랑
  else if (status === "반려") color = "#ff4d4f"; // 빨강
  return css`
    font-size: 1.1rem;
    font-weight: bold;
    color: ${color};
  `;
};

const ActivityPreviewItem: React.FC<ActivityPreviewItemProps> = ({
  title,
  category,
  status,
  date,
}) => (
  <div css={cardStyle}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div css={dotStyle(categoryColor[category])} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span css={titleStyle}>{title}</span>
        {date && (
          <span style={{ color: "#888", fontSize: "0.95rem", marginTop: 2 }}>
            {parseDate(date)}
          </span>
        )}
      </div>
    </div>
    <span css={statusStyle(getStatus(status))}>{getStatus(status)}</span>
  </div>
);

export default ActivityPreviewItem;
