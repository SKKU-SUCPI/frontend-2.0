import React from "react";
import { css } from "@emotion/react";
import QCard from "./components/QCard";
import FlexBox from "@/styles/components/Flexbox";
import QuotientChart from "@/components/graphs/QuotientChart";
import StackedBarChart from "@/components/graphs/StackedBarChart";
import GraphWrapper from "@/components/graphs/GraphWrapper";

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
`;

const subtitleStyle = css`
  font-size: 1.8rem;
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
    { name: "SW", score: 28 },
    { name: "EE", score: 25 },
    { name: "CSE", score: 27 },
    { name: "ME", score: 26 },
  ],
  LQ: [
    { name: "SW", score: 30 },
    { name: "EE", score: 29 },
    { name: "CSE", score: 31 },
    { name: "ME", score: 32 },
  ],
  CQ: [
    { name: "SW", score: 22 },
    { name: "EE", score: 19 },
    { name: "CSE", score: 23 },
    { name: "ME", score: 24 },
  ],
};

const AdminStatisticDashboard: React.FC = () => {
  return (
    <div>
      <h1 css={titleStyle}>통계 대시보드</h1>

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

      <GraphWrapper
        title="지수별/학과별 비교"
        type="block"
        options={{
          labels: ["영역별 보기", "학과별 보기"],
          datasets: {
            "영역별 보기": <QuotientChart data={totalData} />,
            "학과별 보기": <StackedBarChart data={totalData} />,
          },
        }}
      />
    </div>
  );
};

export default AdminStatisticDashboard;
