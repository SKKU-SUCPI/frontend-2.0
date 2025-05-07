import React, { useState } from "react";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import UserListSideBar from "./components/UserListSideBar";
import { useSelectedUserStore } from "@/stores/selectedUserStore";
import PersonIcon from "@mui/icons-material/Person";
import TopThreeCard from "./components/TopThreeCard";
import QuotientChart from "@/components/graphs/QuotientChart";
import StackedBarChart from "@/components/graphs/StackedBarChart";
import UserListTable from "../../../../components/table/UserListTable";
import GraphWrapper from "@/components/graphs/GraphWrapper";

const data = {
  RQ: [
    { name: "강병희", score: 25 },
    { name: "신진건", score: 30 },
    { name: "강성철", score: 28 },
    { name: "김현우", score: 27 },
    { name: "강현우", score: 27 },
    { name: "박민수", score: 21 },
    { name: "이지원", score: 29 },
    { name: "최영희", score: 24 },
    { name: "정태준", score: 26 },
    { name: "송미라", score: 22 },
    { name: "황준호", score: 31 },
  ],
  LQ: [
    { name: "강병희", score: 20 },
    { name: "신진건", score: 22 },
    { name: "강성철", score: 24 },
    { name: "김현우", score: 23 },
    { name: "강현우", score: 23 },
    { name: "박민수", score: 21 },
    { name: "이지원", score: 25 },
    { name: "최영희", score: 28 },
    { name: "정태준", score: 19 },
    { name: "송미라", score: 26 },
    { name: "황준호", score: 24 },
  ],
  CQ: [
    { name: "강병희", score: 25 },
    { name: "신진건", score: 18 },
    { name: "강성철", score: 21 },
    { name: "김현우", score: 20 },
    { name: "강현우", score: 20 },
    { name: "박민수", score: 21 },
    { name: "이지원", score: 23 },
    { name: "최영희", score: 19 },
    { name: "정태준", score: 27 },
    { name: "송미라", score: 24 },
    { name: "황준호", score: 22 },
  ],
};

// 각 영역별 상위 3개 데이터 정렬
const sortedData = {
  RQ: [...data.RQ].sort((a, b) => b.score - a.score).slice(0, 3),
  LQ: [...data.LQ].sort((a, b) => b.score - a.score).slice(0, 3),
  CQ: [...data.CQ].sort((a, b) => b.score - a.score).slice(0, 3),
};

// TODO: 백엔드에서 처리할지 의논
// Total 점수 계산 및 정렬
const totalScores = data.RQ.map((item, index) => ({
  name: item.name,
  score: item.score + data.LQ[index].score + data.CQ[index].score,
}))
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);

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
      <GraphWrapper
        title="선택 유저 통계량 확인"
        type="dropdown"
        options={{
          labels: ["영역별 그래프", "유저별 그래프", "테이블 보기"],
          datasets: {
            "영역별 그래프": <QuotientChart data={data} />,
            "유저별 그래프": <StackedBarChart data={data} />,
            "테이블 보기": <UserListTable data={data} />,
          },
        }}
      />

      {/* 유저 선택 사이드바 */}
      <UserListSideBar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
};

export default AdminStatisticIndividual;
