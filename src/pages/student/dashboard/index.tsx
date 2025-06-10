import React from "react";
import { css } from "@emotion/react";
import QCardVertical from "./components/QCardVertical";
import GraphWrapper from "@/components/graphs/GraphWrapper";
import LineChart from "@/components/graphs/LineChart";
import StackedBarChart from "@/components/graphs/StackedBarChart";
import QuotientChart from "@/components/graphs/QuotientChart";
import ActivityPreviewItem from "./components/ActivityPreviwItem";
import useStudent3qInfo from "@/hooks/student/useStudent3qInfo";
import useStudent3qChange from "@/hooks/student/useStudent3qChange";
import Loading from "@/components/layouts/Loading";

interface Student3qChange {
  month: string;
  lq: number;
  rq: number;
  cq: number;
}

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

const StudentDashboard: React.FC = () => {
  const { data: student3qInfo, isLoading: student3qInfoLoading } =
    useStudent3qInfo();
  const { data: student3qChange, isLoading: student3qChangeLoading } =
    useStudent3qChange();

  if (student3qInfoLoading || student3qChangeLoading) {
    return <Loading />;
  }

  // 3Q 통계 데이터
  const QData = [
    {
      title: "Learning Quotient (LQ)",
      category: "LQ" as "LQ" | "RQ" | "CQ",
      description: "학습 능력 지수",
      score: Math.round((student3qInfo?.lq.score ?? 0) * 100) / 100,
      average: Math.round((student3qInfo?.lq.average ?? 0) * 100) / 100,
      percentage: Math.round((student3qInfo?.lq.percentile ?? 0) * 100) / 100,
    },
    {
      title: "Research Quotient (RQ)",
      category: "RQ" as "LQ" | "RQ" | "CQ",
      description: "연구 능력 지수",
      score: Math.round((student3qInfo?.rq.score ?? 0) * 100) / 100,
      average: Math.round((student3qInfo?.rq.average ?? 0) * 100) / 100,
      percentage: Math.round((student3qInfo?.rq.percentile ?? 0) * 100) / 100,
    },
    {
      title: "Creative Quotient (CQ)",
      category: "CQ" as "LQ" | "RQ" | "CQ",
      description: "교류 능력 지수",
      score: Math.round((student3qInfo?.cq.score ?? 0) * 100) / 100,
      average: Math.round((student3qInfo?.cq.average ?? 0) * 100) / 100,
      percentage: Math.round((student3qInfo?.cq.percentile ?? 0) * 100) / 100,
    },
  ];

  // 3Q 변화 데이터
  const lineChartData =
    student3qChange?.map((item: Student3qChange) => ({
      year: item.month,
      LQ: Math.round(item.lq * 100) / 100,
      RQ: Math.round(item.rq * 100) / 100,
      CQ: Math.round(item.cq * 100) / 100,
    })) ?? [];

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

  return (
    <div>
      <h1 css={titleStyle}>Student Dashboard</h1>
      <div css={summaryContainerStyle}>
        {/* 3Q 통계 */}

        <div css={{ width: "100%" }}>
          <h2 css={subtitleStyle}>3Q 지표 요약</h2>
          {QData.map((q) => (
            <QCardVertical
              key={q.title}
              title={q.title}
              category={q.category}
              description={q.description}
              score={q.score}
              total={q.average}
              percentage={q.percentage}
              average={q.average}
            />
          ))}
        </div>
        {/* 최근 활동 내역 */}
        <div css={{ width: "100%" }}>
          <h2 css={subtitleStyle}>최근 활동 내역</h2>
          {activityPreviewData.map((activity) => (
            <ActivityPreviewItem
              key={activity.title}
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
