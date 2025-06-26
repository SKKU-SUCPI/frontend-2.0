import useStudentActivityItem from "@/hooks/student/useStudentActivityItem";
import Loading from "../layouts/Loading";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import Card from "@/styles/components/Card";
import StudentActivityMainContentView from "./StudentActivityMainContentView";
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
  width: 100%;
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

const commentStyle = css`
  margin: 0;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  color: #374151;
  font-size: 0.875rem;
  width: 100%;
`;

const warningStyle = css`
  margin: 1rem 0;
  padding: 1rem;
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 0.5rem;
  color: #856404;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const warningIconStyle = css`
  font-size: 1.2rem;
  font-weight: bold;
`;

const transformStatus = (status: number) => {
  if (status === 0) return "대기";
  if (status === 1) return "승인";
  if (status === 2) return "반려";
};

const StudentActivityReject: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useStudentActivityItem(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div css={containerStyle}>
      {/* 메인 컨텐츠 영역 */}
      <div css={mainContentStyle}>
        <StudentActivityMainContentView id={id} />
      </div>

      {/* 사이드바 영역 */}
      <div css={sideBarStyle}>
        <Card flex={false} width="100%">
          <h3 css={sideBarTitleStyle}>승인 상태</h3>
          <FlexBox height="auto">
            <span css={statusStyle(data.basicInfo.state)}>
              {transformStatus(data.basicInfo.state)}
            </span>
          </FlexBox>
        </Card>

        <Card flex={false} width="100%">
          <h3 css={sideBarTitleStyle}>사유</h3>
          <FlexBox justify="flex-start" height="auto">
            <p css={commentStyle}>
              {data.basicInfo.comment
                ? data.basicInfo.comment
                : "등록된 사유가 없습니다."}
            </p>
          </FlexBox>
        </Card>

        <Card flex={false} width="100%">
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#374151",
              textAlign: "center",
            }}
          >
            반려 사유에 알맞게 자료를 다시 제출해주세요.
          </div>
          <div css={warningStyle}>
            <span css={warningIconStyle}>⚠️</span>
            <div>
              <strong>주의사항</strong>
              <br />
              추가 자료 제출 시 기존 자료는 삭제됩니다.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentActivityReject;
