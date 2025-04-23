import React from "react";
import { css } from "@emotion/react";
import Card from "@/styles/components/Card";
import QCard from "./components/QCard";
import FlexBox from "@/styles/components/Flexbox";
import QuotientChart from "@/components/graphs/QuotientChart";
import StackedBarChart from "@/components/graphs/StackedBarChart";

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
`;

const subtitleStyle = css`
  font-size: 1.8rem;
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

const chartCardStyle = css`
  padding: 24px;
`;

const summaryData = [
  {
    name: "RQ",
    description: "Research Quotient",
    score: 26,
    previousScore: 29,
  },
  {
    name: "LQ",
    description: "Learning Quotient",
    score: 31,
    previousScore: 27,
  },
  {
    name: "CQ",
    description: "Communication Quotient",
    score: 21,
    previousScore: 20,
  },
];

// 각 Quotient별 학과 데이터
const totalData = {
  RQ: [
    { name: "소프트웨어", score: 28 },
    { name: "지능형소프트웨어", score: 25 },
    { name: "글로벌융합", score: 27 },
  ],
  LQ: [
    { name: "소프트웨어", score: 30 },
    { name: "지능형소프트웨어", score: 29 },
    { name: "글로벌융합", score: 31 },
  ],
  CQ: [
    { name: "소프트웨어", score: 22 },
    { name: "지능형소프트웨어", score: 19 },
    { name: "글로벌융합", score: 23 },
  ],
};

const AdminStatisticDashboard: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<"quotient" | "department">(
    "quotient"
  );

  return (
    <div>
      <h1 css={titleStyle}>대시보드</h1>

      <div>
        <h2 css={subtitleStyle}>3Q 전체 통계</h2>
        <FlexBox gap="20px">
          {summaryData.map((item) => (
            <QCard
              key={item.name}
              name={item.name}
              description={item.description}
              score={item.score}
            />
          ))}
        </FlexBox>
      </div>
      <div>
        <FlexBox justify="space-between" align="center">
          <h2 css={subtitleStyle}>
            {viewMode === "quotient" ? "지수별 비교" : "학과별 비교"}
          </h2>
          <div css={toggleContainerStyle}>
            <button
              onClick={() => setViewMode("quotient")}
              css={toggleButtonStyle(viewMode === "quotient")}
            >
              영역별 보기
            </button>
            <button
              onClick={() => setViewMode("department")}
              css={toggleButtonStyle(viewMode === "department")}
            >
              학과별 보기
            </button>
          </div>
        </FlexBox>
        <Card css={chartCardStyle}>
          {viewMode === "quotient" ? (
            <QuotientChart data={totalData} />
          ) : (
            <StackedBarChart data={totalData} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminStatisticDashboard;
