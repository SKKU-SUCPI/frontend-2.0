import React, { useState, useMemo } from "react";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import Card from "@/styles/components/Card";
import UserListSideBar from "./components/UserListSideBar";
import { useSelectedUserStore } from "@/stores/selectedUserStore";
import PersonIcon from "@mui/icons-material/Person";
import TopThreeCard from "./components/TopThreeCard";
import QuotientChart from "@/components/graphs/QuotientChart";
import StackedBarChart from "@/components/graphs/StackedBarChart";
import UserListTable from "./components/UserListTable";

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

const buttonStyle = css`
  background-color: #333333;
  color: #ffffff;
  border: 1px solid #444444;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #444444;
    border-color: #555555;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
`;

const titleContainerStyle = css`
  margin-bottom: 20px;
`;

const toggleContainerStyle = css`
  display: flex;
  gap: 10px;
  background: #f5f5f5;
  padding: 4px;
  border-radius: 8px;
`;

const toggleButtonStyle = (isActive: boolean) => css`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: ${isActive ? "white" : "transparent"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${isActive ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
`;

const AdminStatisticIndividual: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { selectedUsers } = useSelectedUserStore();
  const [viewMode, setViewMode] = useState<"quotient" | "department" | "table">(
    "quotient"
  );

  // 선택된 유저에서 데이터 가공
  const data = useMemo(() => {
    if (selectedUsers.length === 0) {
      return {
        RQ: [],
        LQ: [],
        CQ: [],
      };
    }

    return {
      RQ: selectedUsers.map((user) => ({
        name: user.name,
        score: user.rq,
        studentId: user.studentId,
        department: user.department,
      })),
      LQ: selectedUsers.map((user) => ({
        name: user.name,
        score: user.lq,
        studentId: user.studentId,
        department: user.department,
      })),
      CQ: selectedUsers.map((user) => ({
        name: user.name,
        score: user.cq,
        studentId: user.studentId,
        department: user.department,
      })),
    };
  }, [selectedUsers]);

  // 각 영역별 상위 3개 데이터 정렬
  const sortedData = useMemo(
    () => ({
      RQ: [...data.RQ].sort((a, b) => b.score - a.score).slice(0, 3),
      LQ: [...data.LQ].sort((a, b) => b.score - a.score).slice(0, 3),
      CQ: [...data.CQ].sort((a, b) => b.score - a.score).slice(0, 3),
    }),
    [data]
  );

  // Total 점수 계산 및 정렬
  const totalScores = useMemo(() => {
    return selectedUsers
      .map((user) => ({
        name: user.name,
        score: user.lq + user.rq + user.cq,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [selectedUsers]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* 타이틀 */}
      <h1 css={titleStyle}>개인별 3Q 비교</h1>
      <FlexBox justify="space-between" css={titleContainerStyle}>
        <h2 css={descriptionStyle}>선택한 유저들의 3Q 점수를 비교합니다</h2>
        <div>
          <button css={buttonStyle} onClick={toggleSidebar}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px" }}>
                <PersonIcon fontSize="small" />
              </span>
              유저 선택 ({selectedUsers.length})
            </span>
          </button>
        </div>
      </FlexBox>
      {/* 선택 유저 순위 */}
      <h2 css={subtitleStyle}>선택 유저 TOP 3</h2>
      {/* TODO: 여기도 데이터 정제 후 map으로 처리하기*/}
      <FlexBox gap="20px">
        <TopThreeCard
          category="LQ"
          description="Learning Quality"
          top3={sortedData.LQ}
        />
        <TopThreeCard
          category="RQ"
          description="Research Quality"
          top3={sortedData.RQ}
        />
        <TopThreeCard
          category="CQ"
          description="Communication Quality"
          top3={sortedData.CQ}
        />
        <TopThreeCard
          category="Total"
          description="Total Score"
          top3={totalScores}
        />
      </FlexBox>
      {/* 선택 유저 3Q 점수 차트 */}
      <FlexBox justify="space-between" align="center">
        <h2 css={subtitleStyle}>선택 유저 통계량 확인</h2>
        <div css={toggleContainerStyle}>
          <button
            onClick={() => setViewMode("quotient")}
            css={toggleButtonStyle(viewMode === "quotient")}
          >
            영역별 그래프
          </button>
          <button
            onClick={() => setViewMode("department")}
            css={toggleButtonStyle(viewMode === "department")}
          >
            유저별 그래프
          </button>
          <button
            onClick={() => setViewMode("table")}
            css={toggleButtonStyle(viewMode === "table")}
          >
            테이블 보기
          </button>
        </div>
      </FlexBox>
      {/* 선택 유저 통계량 확인 차트 */}
      <Card>
        {viewMode === "quotient" ? (
          <QuotientChart data={data} />
        ) : viewMode === "department" ? (
          <StackedBarChart data={data} />
        ) : (
          <UserListTable data={data} />
        )}
      </Card>

      {/* 유저 선택 사이드바 */}
      <UserListSideBar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
};

export default AdminStatisticIndividual;
