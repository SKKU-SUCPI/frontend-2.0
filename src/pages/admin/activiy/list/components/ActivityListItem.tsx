/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Badge from "./Badge";
import FlexBox from "@/styles/components/Flexbox";

interface ListItemProps {
  activity_id: number;
  category: "RQ" | "LQ" | "CQ";
  activity_class: string;
  activity_detail: string;
  title: string;
  status: "승인" | "반려" | "대기";
  date: string;
  user: {
    name: string;
    department: string;
    student_id: string;
  };
  onDetailClick: (
    activity_id: number,
    status: "승인" | "반려" | "대기"
  ) => void;
}

// 스타일들 (컴포넌트 밖에 선언)
const listItemContainerStyle = css`
  padding: 8px 12px;
  width: 100%;
`;

const bottomRowStyle = css`
  font-size: 14px;
  color: #666; /* 코드/날짜/이름 표시 */
  margin-left: 6px;
`;

const detailButtonStyle = css`
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  width: 80px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const titleStyle = css`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const getStatusColors = (status: string) => {
  switch (status) {
    case "승인":
      return {
        background: "#dcfce7",
        font: "#166534",
      };
    case "반려":
      return {
        background: "#fee2e2",
        font: "#991b1b",
      };
    case "대기":
      return {
        background: "#fef9c3",
        font: "#854d0e",
      };
    default:
      return {
        background: "#f3f4f6",
        font: "#374151",
      };
  }
};

function ListItem({
  category,
  activity_class,
  activity_detail,
  title,
  status,
  date,
  user,
  activity_id,
  onDetailClick,
}: ListItemProps) {
  return (
    <FlexBox
      direction="row"
      justify="space-between"
      css={listItemContainerStyle}
    >
      {/* 왼쪽: 상·하 2줄 */}
      <FlexBox direction="column" align="flex-start" gap="6px">
        {/* 상단 행: 카테고리, 제목, 상태 */}
        <FlexBox direction="row" justify="flex-start" align="center" gap="16px">
          <Badge label={status} colors={getStatusColors(status)} />
          <h2 css={titleStyle}>{title}</h2>
          <Badge label={category} />
          <Badge label={activity_class} />
          <Badge label={activity_detail} />
        </FlexBox>
        {/* 하단 행: 코드, 날짜, 작성자 */}
        <div css={bottomRowStyle}>
          {user.name} • {user.department} • {user.student_id} • {date}
        </div>
      </FlexBox>

      {/* 오른쪽: 상세보기 버튼 */}
      <button
        css={detailButtonStyle}
        onClick={() => onDetailClick(activity_id, status)}
      >
        상세보기
      </button>
    </FlexBox>
  );
}

export default ListItem;
