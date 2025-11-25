import { useState, useRef } from "react";
import { css } from "@emotion/react";
import IndividualStudentCard from "./components/IndividualStudentCard";
import AverageMetrics from "./components/AverageMetrics";
import StudentDistributionModal from "./components/StudentDistributionModal";
import useStudentsList, { Pageable } from "@/hooks/admin/useStudentsList";
import Loading from "@/components/layouts/Loading";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { useSelectedUserStore } from "@/stores/selectedUserStore";
import type { SelectedUser } from "@/stores/selectedUserStore";
import SimpleBarChart from "@/components/graphs/SimpleBarChart";
import HorizontalBarChart from "@/components/graphs/HorizontalBarChart";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RefreshIcon from "@mui/icons-material/Refresh";
import SelectedUsersTable from "@/components/table/SelectedUsersTable";
import useFilter from "@/hooks/filter/useFilter";
import { adminStudentListFilterConfig } from "@/components/filter/filterConfig";
import GenericFilter from "@/components/filter/GenericFilter";
import type { AdminStudentResponseItem } from "@/apis/admin/getStudentsList";

const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const chartSectionStyle = css`
  display: flex;
  gap: 24px;
  width: 100%;
  min-height: 400px;
`;

const chartBoxStyle = css`
  flex: 1;
  min-height: 500px;
  max-height: 600px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const bottomRowStyle = css`
  display: flex;
  gap: 24px;
  width: 100%;
`;

const leftBoxStyle = css`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const rightBoxStyle = css`
  flex: 1;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
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
  flex-direction: column;
  align-items: flex-start;
`;

const titleRowStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const hintTextStyle = css`
  font-size: 0.85rem;
  color: #888;
  font-weight: 400;
  margin-top: 4px;
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
  
  h2 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #333;
  }
`;

const noDataStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #999;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  padding: 40px;
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const toggleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const toggleLabelStyle = css`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const toggleButtonStyle = css`
  position: relative;
  width: 44px;
  height: 24px;
  background: #e0e0e0;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #d0d0d0;
  }
  
  &.active {
    background: #4CAF50;
  }
`;

const toggleKnobStyle = css`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &.active {
    transform: translateX(20px);
  }
`;

const IndividualStatisticLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [chartPage, setChartPage] = useState(0);
  const [rightChartPage, setRightChartPage] = useState(0);
  const [showTScore, setShowTScore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<SelectedUser | null>(null);
  const studentListRef = useRef<HTMLDivElement>(null);

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


  const pageable: Pageable = {
    name: appliedFilter.name,
    department: appliedFilter.department,
    page: currentPage - 1, // API는 0-based pagination을 사용
    size: pageSize,
    sort: appliedFilter.sort,
  };

  const { data: studentsData, isLoading } = useStudentsList(pageable);

  if (isLoading) return <Loading />;


  const totalPages = studentsData?.totalPage || 1;

  // T-점수 안전하게 파싱 (NaN 처리)
  const parseTScore = (value: unknown): number => {
    if (value === "NaN" || value === null || value === undefined) return 0;
    const num =
      typeof value === "string"
        ? parseFloat(value)
        : typeof value === "number"
        ? value
        : Number(value);
    return isNaN(num) ? 0 : num;
  };

  // T-점수 합계 계산
  const calculateTotalTScore = (
    tlq: unknown,
    trq: unknown,
    tcq: unknown
  ): number => {
    return parseTScore(tlq) + parseTScore(trq) + parseTScore(tcq);
  };

  type ChartUser = AdminStudentResponseItem | SelectedUser;

  const createBarChartData = (user: ChartUser) => {
    if (showTScore) {
      const totalT = calculateTotalTScore(user.tlq, user.trq, user.tcq);
      return {
        LQ: parseTScore(user.tlq),
        RQ: parseTScore(user.trq),
        CQ: parseTScore(user.tcq),
        "T-합계": totalT,
      };
    }
    return {
      LQ: user.lq || 0,
      RQ: user.rq || 0,
      CQ: user.cq || 0,
    };
  };

  // 평균값으로 Bar Chart 데이터 생성
  const createAverageBarChartData = () => {
    if (showTScore) {
      const avgTotal = averages.averageTLQ + averages.averageTRQ + averages.averageTCQ;
      return {
        LQ: averages.averageTLQ,
        RQ: averages.averageTRQ,
        CQ: averages.averageTCQ,
        "T-합계": avgTotal,
      };
    }
    return {
      LQ: averages.averageLQ,
      RQ: averages.averageRQ,
      CQ: averages.averageCQ,
    };
  };

  const handleUserClick = (student: AdminStudentResponseItem) => {
    const userData = {
      id: student.id,
      name: student.name,
      department: student.department,
      studentId: student.studentId,
      lq: student.lq || 0,
      rq: student.rq || 0,
      cq: student.cq || 0,
      totalScore: student.totalScore || 0,
      tlq: parseTScore(student.tlq),
      trq: parseTScore(student.trq),
      tcq: parseTScore(student.tcq),
      totalTScore: calculateTotalTScore(student.tlq, student.trq, student.tcq),
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

  const handleRightChartPageChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setRightChartPage((prev) => Math.max(0, prev - 1));
    } else {
      setRightChartPage((prev) => Math.min(3, prev + 1));
    }
  };

  const getCurrentChartData = () => {
    if (selectedUsers.length === 0) return null;

    if (chartPage === 0) {
      return {
        data: createAverageBarChartData(),
        title: "선택된 학생 평균",
      };
    } else {
      const user = selectedUsers[chartPage - 1];
      return {
        data: createBarChartData(user),
        title: `${user.name} (${user.studentId})`,
      };
    }
  };

  const currentChartData = getCurrentChartData();
  const totalChartPages = selectedUsers.length + 1; // 평균 + 각 학생

  const handleReset = () => {
    clearUsers();
    setChartPage(0);
    setRightChartPage(0);
  };

  // 우측 가로 막대 그래프 데이터 생성
  const createHorizontalBarChartData = () => {
    if (selectedUsers.length === 0) return [];

    // rightChartPage에 따라 정렬 기준 변경 (높은 점수가 위로)
    const sortedUsers = [...selectedUsers].sort((a, b) => {
      if (rightChartPage === 0) {
        // 전체 3Q 총합 기준 정렬
        if (showTScore) {
          const totalA = (a.tlq || 0) + (a.trq || 0) + (a.tcq || 0);
          const totalB = (b.tlq || 0) + (b.trq || 0) + (b.tcq || 0);
          return totalB - totalA;
        } else {
          const totalA = (a.lq || 0) + (a.rq || 0) + (a.cq || 0);
          const totalB = (b.lq || 0) + (b.rq || 0) + (b.cq || 0);
          return totalB - totalA;
        }
      } else if (rightChartPage === 1) {
        // LQ 기준 정렬
        const valueA = showTScore ? (a.tlq || 0) : (a.lq || 0);
        const valueB = showTScore ? (b.tlq || 0) : (b.lq || 0);
        return valueB - valueA;
      } else if (rightChartPage === 2) {
        // RQ 기준 정렬
        const valueA = showTScore ? (a.trq || 0) : (a.rq || 0);
        const valueB = showTScore ? (b.trq || 0) : (b.rq || 0);
        return valueB - valueA;
      } else {
        // CQ 기준 정렬
        const valueA = showTScore ? (a.tcq || 0) : (a.cq || 0);
        const valueB = showTScore ? (b.tcq || 0) : (b.cq || 0);
        return valueB - valueA;
      }
    });

    if (rightChartPage === 0) {
      // 누적 막대 (3Q 전체) - 총합으로 표시
      const data = sortedUsers.map((user) => {
        let totalValue;
        
        if (showTScore) {
          const lq = typeof user.tlq === 'number' && !isNaN(user.tlq) ? user.tlq : 0;
          const rq = typeof user.trq === 'number' && !isNaN(user.trq) ? user.trq : 0;
          const cq = typeof user.tcq === 'number' && !isNaN(user.tcq) ? user.tcq : 0;
          totalValue = lq + rq + cq;
        } else {
          const lq = typeof user.lq === 'number' && !isNaN(user.lq) ? user.lq : 0;
          const rq = typeof user.rq === 'number' && !isNaN(user.rq) ? user.rq : 0;
          const cq = typeof user.cq === 'number' && !isNaN(user.cq) ? user.cq : 0;
          totalValue = lq + rq + cq;
        }
        
        return {
          name: user.name,
          value: totalValue,
        };
      });
      return data;
    } else {
      // 개별 영역 (LQ, RQ, CQ)
      const categories = ["LQ", "RQ", "CQ"] as const;
      const category = categories[rightChartPage - 1];
      
      return sortedUsers.map((user) => {
        let value = 0;
        if (showTScore) {
          if (category === "LQ") value = user.tlq || 0;
          else if (category === "RQ") value = user.trq || 0;
          else if (category === "CQ") value = user.tcq || 0;
        } else {
          if (category === "LQ") value = user.lq || 0;
          else if (category === "RQ") value = user.rq || 0;
          else if (category === "CQ") value = user.cq || 0;
        }
        return {
          name: user.name,
          value: typeof value === 'number' && !isNaN(value) ? value : 0,
        };
      });
    }
  };

  const getRightChartTitle = () => {
    if (rightChartPage === 0) return "전체 학생 3Q 분포";
    const categories = ["LQ", "RQ", "CQ"];
    return `전체 학생 ${categories[rightChartPage - 1]} 분포`;
  };

  const horizontalChartData = createHorizontalBarChartData();
  const rightChartTitle = getRightChartTitle();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 전체 학생 목록으로 스크롤
    if (studentListRef.current) {
      studentListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleStudentClick = (user: SelectedUser) => {
    setSelectedStudent(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <h1 style={{ margin: 0 }}>개인별 통계 비교</h1>
        <div css={toggleContainerStyle}>
          <span css={toggleLabelStyle}>T-점수 보기</span>
          <button
            css={toggleButtonStyle}
            className={showTScore ? "active" : ""}
            onClick={() => setShowTScore(!showTScore)}
            aria-label="T-점수 보기 토글"
          >
            <div css={toggleKnobStyle} className={showTScore ? "active" : ""} />
          </button>
        </div>
      </div>
      <AverageMetrics
        averageLQ={showTScore ? averages.averageTLQ : averages.averageLQ}
        averageRQ={showTScore ? averages.averageTRQ : averages.averageRQ}
        averageCQ={showTScore ? averages.averageTCQ : averages.averageCQ}
        averageTotal={showTScore 
          ? averages.averageTLQ + averages.averageTRQ + averages.averageTCQ
          : averages.averageTotal
        }
        showTScore={showTScore}
      />

      {/* 그래프 섹션 - 좌우 분할 */}
      <div css={chartSectionStyle}>
        {/* 좌측: 세로 막대 그래프 */}
        {selectedUsers.length === 0 ? (
          <div css={chartBoxStyle}>
            <div css={noDataStyle}>선택된 학생이 없습니다</div>
          </div>
        ) : (
          <div css={chartBoxStyle}>
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
            <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column" }}>
              {currentChartData && (
                <SimpleBarChart
                  data={currentChartData.data}
                  title={currentChartData.title}
                  showTScore={showTScore}
                />
              )}
            </div>
          </div>
        )}

        {/* 우측: 가로 막대 그래프 */}
        {selectedUsers.length === 0 ? (
          <div css={chartBoxStyle}>
            <div css={noDataStyle}>선택된 학생이 없습니다</div>
          </div>
        ) : (
          <div css={chartBoxStyle}>
            <div css={navigationButtonsStyle}>
              <IconButton
                size="small"
                onClick={() => handleRightChartPageChange("prev")}
                disabled={rightChartPage === 0}
              >
                <ChevronLeftIcon />
              </IconButton>
              <div css={pageIndicatorStyle}>
                {rightChartPage + 1}/4
              </div>
              <IconButton
                size="small"
                onClick={() => handleRightChartPageChange("next")}
                disabled={rightChartPage === 3}
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
            <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", overflow: "auto" }}>
              <HorizontalBarChart
                data={horizontalChartData}
                title={rightChartTitle}
                showStacked={rightChartPage === 0}
                singleCategory={
                  rightChartPage === 1 ? "LQ" : rightChartPage === 2 ? "RQ" : rightChartPage === 3 ? "CQ" : undefined
                }
                showTScore={showTScore}
              />
            </div>
          </div>
        )}
      </div>

      {/* 학생 목록 섹션 - 하단 좌우 배치 */}
      <div css={bottomRowStyle}>
        {/* 전체 학생 목록 - 좌측 */}
        <div css={leftBoxStyle}>
          <div css={userListStyle} ref={studentListRef}>
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

            {(studentsData?.content?.length ?? 0) === 0 ? (
              <div>학생이 없습니다.</div>
            ) : (
              (studentsData?.content ?? []).map((student) => (
                <IndividualStudentCard
                  key={student.id}
                  name={student.name}
                  studentId={student.studentId}
                  department={student.department}
                  totalScore={showTScore 
                    ? calculateTotalTScore(student.tlq, student.trq, student.tcq)
                    : (student.totalScore || 0)
                  }
                  lq={showTScore ? parseTScore(student.tlq) : (student.lq || 0)}
                  rq={showTScore ? parseTScore(student.trq) : (student.rq || 0)}
                  cq={showTScore ? parseTScore(student.tcq) : (student.cq || 0)}
                  onClick={() => handleUserClick(student)}
                  isSelected={isUserSelected(student.id)}
                  showTScore={showTScore}
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
              onChange={(_, value) => handlePageChange(value)}
              color="primary"
              showFirstButton
              showLastButton
              size="medium"
            />
          </Box>
        </div>

        {/* 선택된 학생 목록 - 우측 */}
        <div css={rightBoxStyle}>
          <div css={selectedUserTitleStyle}>
            <div css={titleContainerStyle}>
              <div css={titleRowStyle}>
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
              <span css={hintTextStyle}>아래 학생을 클릭하면 개인별 점수 정보를 확인할 수 있습니다</span>
            </div>
          </div>
          <SelectedUsersTable 
            users={selectedUsers} 
            onUserRemove={removeUser}
            showTScore={showTScore}
            onUserClick={handleStudentClick}
          />
        </div>
      </div>

      {/* 학생 정규분포 모달 */}
      {selectedStudent && (
        <StudentDistributionModal
          open={modalOpen}
          onClose={handleModalClose}
          studentName={selectedStudent.name}
          studentId={selectedStudent.studentId}
          tlq={selectedStudent.tlq || 0}
          trq={selectedStudent.trq || 0}
          tcq={selectedStudent.tcq || 0}
        />
      )}
    </div>
  );
};

export default IndividualStatisticLayout;
