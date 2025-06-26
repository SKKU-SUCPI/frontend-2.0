import React, { useState } from "react";
import { css } from "@emotion/react";
import IndividualStudentCard from "./components/IndividualStudentCard";
import AverageMetrics from "./components/AverageMetrics";
import useStudentsList from "@/hooks/admin/useStudentsList";
import Loading from "@/components/layouts/Loading";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { useSelectedUserStore } from "@/stores/selectedUserStore";
import RadarChart from "@/components/graphs/RadarChart";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RefreshIcon from "@mui/icons-material/Refresh";
import SelectedUsersTable from "@/components/table/SelectedUsersTable";
import useFilter from "@/hooks/filter/useFilter";
import { adminStudentListFilterConfig } from "@/components/filter/filterConfig";
import GenericFilter from "@/components/filter/GenericFilter";

const containerStyle = css`
  width: 100%;
`;

const bottomRowStyle = css`
  display: flex;
  gap: 24px;
`;

const leftBoxStyle = css`
  flex: 3;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
`;

const rightColStyle = css`
  flex: 4;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const rightBoxStyle = css`
  min-height: 180px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  overflow-y: auto;
  position: relative;
`;

const chartBoxStyle = css`
  min-height: 180px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  position: relative;
`;

const navigationButtonsStyle = css`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
`;

const pageIndicatorStyle = css`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  min-width: 40px;
  text-align: center;
`;

const chartTitleStyle = css`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
`;

const selectedUserTitleStyle = css`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const titleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const resetButtonStyle = css`
  color: #666;
  &:hover {
    color: #333;
  }
`;

const userListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
`;

const noDataStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-style: italic;
`;

const IndividualStatisticLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [chartPage, setChartPage] = useState(0);

  const {
    filter,
    handleFilterChange,
    resetFilter,
    appliedFilter,
    applyFilter,
  } = useFilter(adminStudentListFilterConfig);

  const pageSize = 10;

  const {
    selectedUsers,
    addUser,
    removeUser,
    isUserSelected,
    averages,
    clearUsers,
  } = useSelectedUserStore();

  console.log(appliedFilter);

  const pageable = {
    name: appliedFilter.name,
    department: appliedFilter.department,
    page: currentPage - 1, // API는 0-based pagination을 사용
    size: pageSize,
    sort: appliedFilter.sort,
  };

  const { data: studentsData, isLoading } = useStudentsList(pageable);

  if (isLoading) return <Loading />;

  console.log(studentsData);

  const totalPages = studentsData?.totalPage || 1;

  // Radar Chart 데이터 생성
  const createRadarChartData = (user: any) => [
    { subject: "LQ", value: user.lq || 0, fullMark: 100 },
    { subject: "RQ", value: user.rq || 0, fullMark: 100 },
    { subject: "CQ", value: user.cq || 0, fullMark: 100 },
  ];

  // 평균값으로 Radar Chart 데이터 생성
  const createAverageRadarChartData = () => [
    { subject: "LQ", value: averages.averageLQ, fullMark: 100 },
    { subject: "RQ", value: averages.averageRQ, fullMark: 100 },
    { subject: "CQ", value: averages.averageCQ, fullMark: 100 },
  ];

  const handleUserClick = (student: any) => {
    const userData = {
      id: student.id,
      name: student.name,
      department: student.department,
      studentId: student.studentId,
      lq: student.lq || 0,
      rq: student.rq || 0,
      cq: student.cq || 0,
      totalScore: student.totalScore || 0,
    };

    if (isUserSelected(student.id)) {
      removeUser(student.id);
    } else {
      addUser(userData);
    }
  };

  const handleChartPageChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setChartPage((prev) => Math.max(0, prev - 1));
    } else {
      setChartPage((prev) => Math.min(selectedUsers.length, prev + 1));
    }
  };

  const getCurrentChartData = () => {
    if (selectedUsers.length === 0) return null;

    if (chartPage === 0) {
      return {
        data: createAverageRadarChartData(),
        title: "선택된 학생 평균",
      };
    } else {
      const user = selectedUsers[chartPage - 1];
      return {
        data: createRadarChartData(user),
        title: `${user.name} (${user.studentId})`,
      };
    }
  };

  const currentChartData = getCurrentChartData();
  const totalChartPages = selectedUsers.length + 1; // 평균 + 각 학생

  const handleReset = () => {
    clearUsers();
    setChartPage(0);
  };

  return (
    <div css={containerStyle}>
      <AverageMetrics
        averageLQ={averages.averageLQ}
        averageRQ={averages.averageRQ}
        averageCQ={averages.averageCQ}
        averageTotal={averages.averageTotal}
      />
      <div css={bottomRowStyle}>
        <div css={leftBoxStyle}>
          <div css={userListStyle}>
            <h2>전체 학생 목록</h2>

            <GenericFilter
              filterConfig={adminStudentListFilterConfig}
              filters={filter}
              onFilterChange={handleFilterChange}
              onReset={resetFilter}
              onApply={() => {
                applyFilter();
                setCurrentPage(1);
              }}
              appliedFilter={appliedFilter}
              filterShow={false}
            />

            {studentsData?.content?.length === 0 ? (
              <div>학생이 없습니다.</div>
            ) : (
              studentsData?.content?.map((student: any) => (
                <IndividualStudentCard
                  key={student.id}
                  name={student.name}
                  studentId={student.studentId}
                  department={student.department}
                  totalScore={student.totalScore || 0}
                  lq={student.lq || 0}
                  rq={student.rq || 0}
                  cq={student.cq || 0}
                  onClick={() => handleUserClick(student)}
                  isSelected={isUserSelected(student.id)}
                />
              ))
            )}
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              color="primary"
              showFirstButton
              showLastButton
              size="medium"
            />
          </Box>
        </div>
        <div css={rightColStyle}>
          <div css={chartBoxStyle}>
            {selectedUsers.length === 0 ? (
              <div css={noDataStyle}>선택된 학생이 없습니다</div>
            ) : (
              <>
                <div css={navigationButtonsStyle}>
                  <IconButton
                    size="small"
                    onClick={() => handleChartPageChange("prev")}
                    disabled={chartPage === 0}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <div css={pageIndicatorStyle}>
                    {chartPage + 1}/{totalChartPages}
                  </div>
                  <IconButton
                    size="small"
                    onClick={() => handleChartPageChange("next")}
                    disabled={chartPage === totalChartPages - 1}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </div>
                {currentChartData && (
                  <RadarChart
                    data={currentChartData.data}
                    title={currentChartData.title}
                  />
                )}
              </>
            )}
          </div>
          <div css={rightBoxStyle}>
            <div css={selectedUserTitleStyle}>
              <div css={titleContainerStyle}>
                <span>선택된 학생 목록</span>
                {selectedUsers.length > 0 && (
                  <IconButton
                    size="small"
                    onClick={handleReset}
                    css={resetButtonStyle}
                    title="초기화"
                  >
                    <RefreshIcon />
                  </IconButton>
                )}
              </div>
            </div>
            <SelectedUsersTable
              users={selectedUsers}
              onUserRemove={removeUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualStatisticLayout;
