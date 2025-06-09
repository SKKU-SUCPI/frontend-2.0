import { css } from "@emotion/react";
import Card from "@/styles/components/Card";
import Loading from "@/components/layouts/Loading";
import useActivityItem from "@/hooks/admin/useActivityItem";

const titleStyle = css`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
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

const ActivityUserInfo = ({ id }: { id: string }) => {
  const { data, isLoading } = useActivityItem(id);
  if (isLoading) return <Loading />;

  return (
    <Card flex={false} width="100%">
      <h3 css={titleStyle}>제출 학생</h3>
      <div css={studentInfoStyle}>
        <div css={studentItemStyle}>
          <span css={labelStyle}>학번</span>
          <span>{data.studentId}</span>
        </div>
        <div css={studentItemStyle}>
          <span css={labelStyle}>이름</span>
          <span>{data.userName}</span>
        </div>
        <div css={studentItemStyle}>
          <span css={labelStyle}>학과</span>
          <span>{data.department}</span>
        </div>
      </div>
    </Card>
  );
};

export default ActivityUserInfo;
