import useActivityItem from "@/hooks/admin/useActivityItem";
import Loading from "../layouts/Loading";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import Card from "@/styles/components/Card";
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

const transformStatus = (status: number) => {
  if (status === 0) return "대기";
  if (status === 1) return "승인";
  if (status === 2) return "거절";
};

const ActivityView: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useActivityItem(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div css={containerStyle}>
      {/* 메인 컨텐츠 영역 */}
      <div css={mainContentStyle}>
        <div>main</div>
      </div>

      {/* 사이드바 영역 */}
      <div css={sideBarStyle}>
        <div css={sideBarStyle}>
          <Card flex={false} width="100%">
            <h3 css={sideBarTitleStyle}>제출 학생</h3>
            <div css={studentInfoStyle}>
              <div css={studentItemStyle}>
                <span css={labelStyle}>학번</span>
                <span>202012345</span>
              </div>
              <div css={studentItemStyle}>
                <span css={labelStyle}>이름</span>
                <span>홍길동</span>
              </div>
              <div css={studentItemStyle}>
                <span css={labelStyle}>학과</span>
                <span>소프트웨어학부</span>
              </div>
            </div>
          </Card>
          <Card flex={false} width="100%">
            <h3 css={sideBarTitleStyle}>승인 상태</h3>
            <FlexBox height="auto">
              <span css={statusTextStyle}>
                {transformStatus(data.basicInfo.state)}
              </span>
            </FlexBox>
          </Card>
          {/* <Card flex={false} width="100%">
            <h3 css={sideBarTitleStyle}>검토내역</h3>
            <div css={reviewListStyle}>
              {reviews.map((review) => (
                <div key={review.id} css={reviewItemStyle}>
                  <span css={reviewDateStyle}>{review.date}</span>
                  <span css={reviewContentStyle}>{review.content}</span>
                </div>
              ))}
            </div>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default ActivityView;
