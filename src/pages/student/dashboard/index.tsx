import React from "react";
import { css } from "@emotion/react";
import QCardVertical from "./components/QCardVertical";
import GraphWrapper from "@/components/graphs/GraphWrapper";
import LineChart from "@/components/graphs/LineChart";
import StackedBarChart from "@/components/graphs/StackedBarChart";
import QuotientChart from "@/components/graphs/QuotientChart";
import ActivityPreviewItem from "./components/ActivityPreviwItem";

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

const viewAllButtonStyle = css`
  width: 100%;
  padding: 12px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f9f9f9;
  }
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

const activityPreviewData = [
  {
    title: "빅데이터 분석을 통한 소비자 행동 연구",
    category: "LQ" as "LQ" | "RQ" | "CQ",
    status: "승인" as "승인" | "반려" | "대기",
    date: "2024-01-01",
  },

  {
    title: "학과 MT 기획 및 진행",
    category: "CQ" as "LQ" | "RQ" | "CQ",
    status: "대기" as "승인" | "반려" | "대기",
    date: "2024-01-01",
  },
  {
    title: "전국 대학생 소프트웨어 경진대회 참가",
    category: "RQ" as "LQ" | "RQ" | "CQ",
    status: "승인" as "승인" | "반려" | "대기",
    date: "2024-01-01",
  },
  {
    title: "ICPC 금상",
    category: "LQ" as "LQ" | "RQ" | "CQ",
    status: "반려" as "승인" | "반려" | "대기",
    date: "2024-01-01",
  },
  {
    title: "알고리즘 스터디 그룹 운영",
    category: "LQ" as "LQ" | "RQ" | "CQ",
    status: "승인" as "승인" | "반려" | "대기",
    date: "2024-01-01",
  },
];

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
          {activityPreviewData.map((activity) => (
            <ActivityPreviewItem
              title={activity.title}
              category={activity.category}
              status={activity.status}
              date={activity.date}
            />
          ))}
          <div
            css={css`
              margin-top: 16px;
              width: 100%;
            `}
          >
            <button
              css={viewAllButtonStyle}
              onClick={() => {
                // 전체 활동 내역 페이지로 이동하는 로직
                // window.location.href = "/student/activity/view";
              }}
            >
              전체 활동 내역 보기
            </button>
          </div>
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
