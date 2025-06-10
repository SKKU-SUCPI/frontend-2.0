import React from "react";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import styled from "@emotion/styled";
import useStudentActivityList from "@/hooks/student/useStudentActivityList";
import Loading from "@/components/layouts/Loading";

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const subtitleStyle = css`
  font-size: 1.8rem;
`;

const descriptionStyle = css`
  font-size: 1.5rem;
  color: #777;
  margin-top: 0;
`;

const filterButtonStyle = css`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #e8e8e8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 0;
`;

const StudentActivityList: React.FC = () => {
  const { data, isLoading } = useStudentActivityList({
    state: 1,
    page: 1,
    size: 10,
    sort: "desc",
  });

  if (isLoading) return <Loading />;

  console.log(data);

  return (
    <div>
      <h1 css={titleStyle}>활동 모아보기</h1>
      <h2 css={descriptionStyle}>
        활동 제출 후 검토 중인 활동을 확인할 수 있습니다.
      </h2>
      <FlexBox justify="space-between">
        <h2 css={subtitleStyle}>활동 내역</h2>
        <button css={filterButtonStyle} onClick={() => {}}>
          새로운 활동 제출
        </button>
      </FlexBox>
    </div>
  );
};

export default StudentActivityList;
