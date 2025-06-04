import React from "react";
import { css } from "@emotion/react";
import { useSearchParams } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Tooltip from "@mui/material/Tooltip";

const categoryColor = {
  LQ: "#0088FE",
  RQ: "#00C49F",
  CQ: "#FFBB28",
};

const categoryTooltip = {
  RQ: "RQ: 연구지표",
  LQ: "LQ: 교육지표",
  CQ: "CQ: 교류지표",
};

interface ActivityListItemProps {
  activityId: number;
  content: string;
  categoryName: "LQ" | "RQ" | "CQ";
  activityClass: string;
  activityDetail: string;
  state: 0 | 1 | 2;
  submitDate: string;
  departmemt: string;
  studentId: string;
  userName: string;
}

const cardStyle = css`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 18px 20px;
  margin-bottom: 12px;
  min-width: 320px;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const dotStyle = (color: string) => css`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${color};
  margin-right: 14px;
`;

const titleStyle = css`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 4px;
  margin-left: 4px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const statusStyle = (state: number) => {
  let color = "#888";
  if (state === 0) color = "#ffcc00"; // 노랑 (대기)
  else if (state === 1) color = "#2ecc40"; // 초록 (승인)
  else if (state === 2) color = "#ff4d4f"; // 빨강 (반려)
  return css`
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 12px;
    color: ${color};
  `;
};

const getState = (state: number) => {
  if (state === 0) return "대기";
  else if (state === 1) return "승인";
  else if (state === 2) return "반려";
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const tagStyle = css`
  display: inline-block;
  background: #f8f9fa;
  color: #333;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 16px;
  padding: 2px 10px;
`;

const ActivityListItem: React.FC<ActivityListItemProps> = ({
  activityId,
  content,
  categoryName,
  activityClass,
  activityDetail,
  state,
  submitDate,
  departmemt,
  studentId,
  userName,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    // id 설정
    searchParams.set("id", activityId.toString());
    setSearchParams(searchParams);
  };

  return (
    <div css={cardStyle} onClick={handleClick}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip
          title={categoryTooltip[categoryName]}
          arrow
          placement="top"
          componentsProps={{ tooltip: { sx: { fontSize: "1.1rem" } } }}
        >
          <div css={dotStyle(categoryColor[categoryName])} />
        </Tooltip>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span css={titleStyle}>
            {content}
            <span css={tagStyle}>{activityClass}</span>
            <span css={tagStyle}>{activityDetail}</span>
          </span>
          {submitDate && (
            <span style={{ color: "#333", fontSize: "1rem", marginTop: 2 }}>
              <PersonOutlineOutlinedIcon
                fontSize="small"
                style={{ marginRight: 4, verticalAlign: "middle" }}
              />
              {userName} | {studentId} | {departmemt}
              <CalendarTodayIcon
                fontSize="small"
                style={{
                  marginLeft: 12,
                  marginRight: 4,
                  verticalAlign: "middle",
                }}
              />
              {formatDate(submitDate)}
            </span>
          )}
        </div>
      </div>
      <span css={statusStyle(state)}>{getState(state)}</span>
    </div>
  );
};

export default ActivityListItem;
