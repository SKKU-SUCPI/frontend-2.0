import React from "react";
import { css } from "@emotion/react";
import QCardVertical from "./components/QCardVertical";
import GraphWrapper from "@/components/graphs/GraphWrapper";
import LineChart from "@/components/graphs/LineChart";
import StackedBarChart from "@/components/graphs/StackedBarChart";
import QuotientChart from "@/components/graphs/QuotientChart";

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const subtitleStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const summaryContainerStyle = css`
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: space-between;
`;

const QData = [
  {
    title: "Learning Quotient (LQ)",
    category: "LQ" as "LQ" | "RQ" | "CQ",
    description: "학습 능력 지수",
    score: 23,
    total: 33,
    percentage: 12,
  },
  {
    title: "Research Quotient (RQ)",
    category: "RQ" as "LQ" | "RQ" | "CQ",
    description: "연구 능력 지수",
    score: 28,
    total: 33,
    percentage: 5,
  },
  {
    title: "Creative Quotient (CQ)",
    category: "CQ" as "LQ" | "RQ" | "CQ",
    description: "교류 능력 지수",
    score: 19,
    total: 33,
    percentage: 28,
  },
];

const lineChartData = [
  { year: 2019, LQ: 15, CQ: 12, RQ: 18 },
  { year: 2020, LQ: 18, CQ: 15, RQ: 20 },
  { year: 2021, LQ: 22, CQ: 19, RQ: 25 },
  { year: 2022, LQ: 25, CQ: 23, RQ: 28 },
  { year: 2023, LQ: 28, CQ: 26, RQ: 31 },
];

const totalData = {
  RQ: [
    { name: "내 점수", score: 28 },
    { name: "학과 평균", score: 25 },
    { name: "전체 평균", score: 27 },
  ],
  LQ: [
    { name: "내 점수", score: 30 },
    { name: "학과 평균", score: 29 },
    { name: "전체 평균", score: 31 },
  ],
  CQ: [
    { name: "내 점수", score: 22 },
    { name: "학과 평균", score: 19 },
    { name: "전체 평균", score: 23 },
  ],
};

const StudentDashboard: React.FC = () => {
  return (
    <div>
      <h1 css={titleStyle}>Student Dashboard</h1>
      <div css={summaryContainerStyle}>
        {/* 3Q 통계 */}

        <div css={{ width: "100%" }}>
          <h2 css={subtitleStyle}>3Q 지표 요약</h2>
          {QData.map((q) => (
            <QCardVertical
              title={q.title}
              category={q.category}
              description={q.description}
              score={q.score}
              total={q.total}
              percentage={q.percentage}
            />
          ))}
        </div>
        {/* 최근 활동 내역 */}
        <div css={{ width: "100%" }}>
          <h2 css={subtitleStyle}>최근 활동 내역</h2>
        </div>
      </div>
      <GraphWrapper
        title="성과 분석"
        type="block"
        options={{
          labels: ["연도별 변화 추이", "지수별 분석", "학과별 비교"],
          datasets: {
            "연도별 변화 추이": <LineChart data={lineChartData} />,
            "지수별 분석": <QuotientChart data={totalData} />,
            "학과별 비교": <StackedBarChart data={totalData} />,
          },
        }}
      />
    </div>
  );
};

export default StudentDashboard;
