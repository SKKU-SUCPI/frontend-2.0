/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import ReadView from "./views/ReadView";
import SubmitView from "./views/SubmitView";
import Card from "@/styles/components/Card";
import FlexBox from "@/styles/components/Flexbox";
interface ActivityDetailProps {
  activity_id: number;
  view_type: "submit" | "review" | "history";
}

const containerStyle = css`
  width: 1000px;
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
`;

const mainContentStyle = css`
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

const sideBarStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  padding: 0 1.5rem;
`;

const sideBarTitleStyle = css`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const statusButtonsStyle = css`
  display: flex;
  gap: 0.5rem;
`;

const studentInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const studentItemStyle = css`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  font-size: 0.875rem;
`;

const labelStyle = css`
  color: #6b7280;
  min-width: 3rem;
`;

const reviewListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.75rem;
`;

const reviewItemStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
`;

const reviewDateStyle = css`
  font-size: 0.75rem;
  color: #6b7280;
`;

const reviewContentStyle = css`
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const statusTextStyle = css`
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
`;

const rejectButtonStyle = css`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  background-color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const approveButtonStyle = css`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #333333;
  }
`;

const getData = (activity_id: number) => {
  return {
    activity_id: activity_id,
    user_name: "김민수",
    category_class: "RQ",
    activity_class: "공모전/ICPC",
    activity_detail: "대상/입상",
    activity_date: "2025-01-01",
    activity_title: "국민대 자율주행 대회 대상",
    activity_content:
      "제 8회 국민대 자율주행 대회에 참가하여 대상을 수상하였습니다",
    status: "승인",
    files: [
      { id: 1, name: "발표자료.pdf", size: "2.4MB" },
      { id: 2, name: "수상증명서.jpg", size: "1.1MB" },
      { id: 3, name: "활동사진.zip", size: "5.6MB" },
    ],
    reviews: [
      {
        id: 1,
        date: "2024-03-15 14:30",
        content:
          "활동 증빙자료가 불충분합니다. 수상 증명서를 추가로 제출해주세요.",
      },
      {
        id: 2,
        date: "2024-03-10 11:20",
        content:
          "활동 날짜가 잘못 기재되어 있습니다. 실제 대회 참가 날짜를 입력해주세요.",
      },
    ],
  };
};

const ActivityDetail: React.FC<ActivityDetailProps> = ({
  activity_id,
  view_type,
}) => {
  const {
    user_name,
    category_class,
    activity_class,
    activity_detail,
    activity_date,
    activity_title,
    activity_content,
    status,
    files,
    reviews,
  } = getData(activity_id);

  return (
    <div css={containerStyle}>
      {/* 메인 컨텐츠 영역 */}
      {/* view_type에 따라 분기 */}
      <div css={mainContentStyle}>
        {view_type === "submit" && <SubmitView />}
        {(view_type === "history" || view_type === "review") && (
          <ReadView
            category_class={category_class}
            activity_class={activity_class}
            activity_detail={activity_detail}
            activity_date={activity_date}
            activity_title={activity_title}
            activity_content={activity_content}
            files={files}
          />
        )}
      </div>
      {/* 사이드바 영역 */}
      <div css={sideBarStyle}>
        <Card flex={false} width="100%">
          <h3 css={sideBarTitleStyle}>제출 학생</h3>
          <div css={studentInfoStyle}>
            <div css={studentItemStyle}>
              <span css={labelStyle}>학번</span>
              <span>20231234</span>
            </div>
            <div css={studentItemStyle}>
              <span css={labelStyle}>이름</span>
              <span>{user_name}</span>
            </div>
            <div css={studentItemStyle}>
              <span css={labelStyle}>학과</span>
              <span>소프트웨어학부</span>
            </div>
          </div>
        </Card>

        {/* view_type에 따라 분기 */}
        {view_type === "history" && (
          <Card flex={false} width="100%">
            <h3 css={sideBarTitleStyle}>승인 상태</h3>
            <FlexBox height="auto">
              <span css={statusTextStyle}>{status}</span>
            </FlexBox>
          </Card>
        )}
        {view_type === "review" && (
          <Card flex={false} width="100%">
            <h3 css={sideBarTitleStyle}>승인 상태</h3>
            <div
              css={css`
                margin-bottom: 0.75rem;
              `}
            >
              <textarea
                css={css`
                  width: 100%;
                  border: 1px solid #e5e7eb;
                  border-radius: 0.375rem;
                  box-sizing: border-box;
                  min-height: 60px;
                  padding: 0.5rem;
                  resize: vertical;
                  font-size: 0.9rem;
                  &:focus {
                    outline: none;
                    border-color: #2563eb;
                  }
                `}
                placeholder="승인 또는 거절 사유를 입력하세요..."
              />
            </div>
            <div css={statusButtonsStyle}>
              <button css={rejectButtonStyle}>거절</button>
              <button css={approveButtonStyle}>승인</button>
            </div>
          </Card>
        )}

        <Card flex={false} width="100%">
          <h3 css={sideBarTitleStyle}>검토내역</h3>
          <div css={reviewListStyle}>
            {reviews.map((review) => (
              <div key={review.id} css={reviewItemStyle}>
                <span css={reviewDateStyle}>{review.date}</span>
                <span css={reviewContentStyle}>{review.content}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ActivityDetail;
