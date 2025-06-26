import React, { useState } from "react";
import { css } from "@emotion/react";
import useStudentsList from "@/hooks/admin/useStudentsList";
import Pagination from "@mui/material/Pagination";
import IndividualStudentCard from "./components/IndividualStudentCard";

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
`;

const layoutStyle = css`
  display: flex;
  gap: 2rem;
  height: calc(100vh - 200px);
`;

const leftPanelStyle = css`
  flex: 4;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const rightPanelStyle = css`
  flex: 4;
  padding: 1.5rem;
  overflow-y: auto;
`;

const panelTitleStyle = css`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const studentListContainerStyle = css`
  flex: 1;
  overflow-y: auto;
`;

const paginationContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
`;

const AdminStatisticIndividual: React.FC = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useStudentsList({
    page: page - 1, // API는 0-based pagination을 사용
    size: pageSize,
    sort: "desc",
    name: null,
    department: null,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);

  const totalPages = data?.totalPage || 1;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div>
      <h1 css={titleStyle}>개인별 3Q 확인</h1>
      <div css={layoutStyle}>
        <div css={leftPanelStyle}>
          <h2 css={panelTitleStyle}>학생 리스트</h2>

          <div css={studentListContainerStyle}>
            {data?.content?.map((student: any, index: number) => (
              <IndividualStudentCard
                key={index}
                name={student.name}
                studentId={student.studentId}
                department={student.department}
                totalScore={student.totalScore}
                lq={student.lq}
                rq={student.rq}
                cq={student.cq}
              />
            ))}
          </div>

          <div css={paginationContainerStyle}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              size="medium"
            />
          </div>
        </div>
        <div css={rightPanelStyle}>
          <h2 css={panelTitleStyle}>통계량</h2>
          {/* 통계량 컴포넌트가 들어갈 자리 */}
        </div>
      </div>
    </div>
  );
};

export default AdminStatisticIndividual;
