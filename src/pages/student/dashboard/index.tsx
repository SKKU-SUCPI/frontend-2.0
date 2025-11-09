import React, { useState } from "react";
import { css } from "@emotion/react";
import QCardVertical from "./components/QCardVertical";
import GraphWrapper from "@/components/graphs/GraphWrapper";
import LineChart from "@/components/graphs/LineChart";
import StackedBarChart from "@/components/graphs/StackedBarChart";
import QuotientChart from "@/components/graphs/QuotientChart";
import MyDistribution from "@/components/graphs/MyDistribution";
import ActivityPreviewItem from "./components/ActivityPreviwItem";
import ApprovedActivitiesModal from "./components/ApprovedActivitiesModal";
import useStudent3qInfo from "@/hooks/student/useStudent3qInfo";
import useStudent3qChange from "@/hooks/student/useStudent3qChange";
import useStudent3qAverages from "@/hooks/student/useStudent3qAverages";
import useStudentActivityList from "@/hooks/student/useStudentActivityList";
import useStudentMe from "@/hooks/student/useStudentMe";
import Loading from "@/components/layouts/Loading";
import { useNavigate } from "react-router-dom";

interface Student3qChange {
  month: string;
  lq: number;
  rq: number;
  cq: number;
}

interface StudentActivity {
  id: number;
  title?: string;
  content: string;
  categoryName: string;
  state: string;
  approvedDate: string;
  activityWeight?: number;
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
  margin-top: 0;
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

const emptyMessageStyle = css`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const buttonContainerStyle = css`
  margin-top: 16px;
  width: 100%;
`;

const sectionHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
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

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<"LQ" | "RQ" | "CQ" | null>(null);
  const [showTScore, setShowTScore] = useState(false);
  
  const { data: student3qInfo, isLoading: student3qInfoLoading } =
    useStudent3qInfo();
  const { data: student3qChange, isLoading: student3qChangeLoading } =
    useStudent3qChange();
  const { data: student3qAverages, isLoading: student3qAveragesLoading } =
    useStudent3qAverages();

  const { data: studentActivityList, isLoading: studentActivityListLoading } =
    useStudentActivityList({
      state: null,
      page: 0,
      size: 5,
      sort: "desc",
    });

  // 승인된 활동 내역 가져오기 (모달용)
  const { data: approvedActivityList, isLoading: approvedActivityListLoading } =
    useStudentActivityList({
      state: 1, // 승인된 것만
      page: 0,
      size: 100, // 충분히 많은 수
      sort: "desc",
    });

  // 학생 프로필 정보 (T-점수 포함)
  const { data: studentMe, isLoading: studentMeLoading } = useStudentMe();

  if (
    student3qInfoLoading ||
    student3qChangeLoading ||
    student3qAveragesLoading ||
    studentActivityListLoading ||
    studentMeLoading
  ) {
    return <Loading />;
  }

  // 카테고리별 필터링된 승인 활동 내역
  const filteredApprovedActivities = selectedCategory
    ? approvedActivityList?.content?.filter(
        (activity: StudentActivity) => activity.categoryName === selectedCategory
      ) || []
    : [];

  // 3Q 통계 데이터 (일반 점수 또는 T-점수)
  const QData = showTScore
    ? [
        {
          title: "Learning Quotient (LQ)",
          category: "LQ" as "LQ" | "RQ" | "CQ",
          description: "학습 능력 지수 (T-점수)",
          score: Math.round((studentMe?.tlq ?? 0) * 100) / 100,
          average: Math.round((50 / 3) * 100) / 100, // 16.67
          percentage: Math.round((student3qInfo?.lq.percentile ?? 0) * 100),
        },
        {
          title: "Research Quotient (RQ)",
          category: "RQ" as "LQ" | "RQ" | "CQ",
          description: "연구 능력 지수 (T-점수)",
          score: Math.round((studentMe?.trq ?? 0) * 100) / 100,
          average: Math.round((50 / 3) * 100) / 100, // 16.67
          percentage: Math.round((student3qInfo?.rq.percentile ?? 0) * 100),
        },
        {
          title: "Creative Quotient (CQ)",
          category: "CQ" as "LQ" | "RQ" | "CQ",
          description: "교류 능력 지수 (T-점수)",
          score: Math.round((studentMe?.tcq ?? 0) * 100) / 100,
          average: Math.round((50 / 3) * 100) / 100, // 16.67
          percentage: Math.round((student3qInfo?.cq.percentile ?? 0) * 100),
        },
      ]
    : [
        {
          title: "Learning Quotient (LQ)",
          category: "LQ" as "LQ" | "RQ" | "CQ",
          description: "학습 능력 지수",
          score: Math.round((student3qInfo?.lq.score ?? 0) * 100) / 100,
          average: Math.round((student3qInfo?.lq.average ?? 0) * 100) / 100,
          percentage: Math.round((student3qInfo?.lq.percentile ?? 0) * 100),
        },
        {
          title: "Research Quotient (RQ)",
          category: "RQ" as "LQ" | "RQ" | "CQ",
          description: "연구 능력 지수",
          score: Math.round((student3qInfo?.rq.score ?? 0) * 100) / 100,
          average: Math.round((student3qInfo?.rq.average ?? 0) * 100) / 100,
          percentage: Math.round((student3qInfo?.rq.percentile ?? 0) * 100),
        },
        {
          title: "Creative Quotient (CQ)",
          category: "CQ" as "LQ" | "RQ" | "CQ",
          description: "교류 능력 지수",
          score: Math.round((student3qInfo?.cq.score ?? 0) * 100) / 100,
          average: Math.round((student3qInfo?.cq.average ?? 0) * 100) / 100,
          percentage: Math.round((student3qInfo?.cq.percentile ?? 0) * 100),
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

  // 3Q 평균 데이터
  const totalData = {
    RQ: [
      {
        name: "내 점수",
        score: Math.round((student3qAverages?.student.rq ?? 0) * 100) / 100,
      },
      {
        name: "학과 평균",
        score: Math.round((student3qAverages?.department.rq ?? 0) * 100) / 100,
      },
      {
        name: "전체 평균",
        score: Math.round((student3qAverages?.total.rq ?? 0) * 100) / 100,
      },
    ],
    LQ: [
      {
        name: "내 점수",
        score: Math.round((student3qAverages?.student.lq ?? 0) * 100) / 100,
      },
      {
        name: "학과 평균",
        score: Math.round((student3qAverages?.department.lq ?? 0) * 100) / 100,
      },
      {
        name: "전체 평균",
        score: Math.round((student3qAverages?.total.lq ?? 0) * 100) / 100,
      },
    ],
    CQ: [
      {
        name: "내 점수",
        score: Math.round((student3qAverages?.student.cq ?? 0) * 100) / 100,
      },
      {
        name: "학과 평균",
        score: Math.round((student3qAverages?.department.cq ?? 0) * 100) / 100,
      },
      {
        name: "전체 평균",
        score: Math.round((student3qAverages?.total.cq ?? 0) * 100) / 100,
      },
    ],
  };

  return (
    <div>
      <h1 css={titleStyle}>학생 대시보드</h1>
      <div css={summaryContainerStyle}>
        {/* 3Q 통계 */}
        <div css={{ width: "100%" }}>
          <div css={sectionHeaderStyle}>
            <h2 css={subtitleStyle}>3Q 지표 요약</h2>
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
          {QData.map((q) => (
            <QCardVertical
              key={q.title}
              title={q.title}
              category={q.category}
              description={q.description}
              score={q.score}
              percentage={q.percentage}
              average={q.average}
              onViewAll={() => setSelectedCategory(q.category)}
            />
          ))}
        </div>
        {/* 최근 활동 내역 */}
        <div css={{ width: "100%" }}>
          <h2 css={subtitleStyle}>최근 활동 내역</h2>
          {studentActivityList?.content &&
          studentActivityList.content.length > 0 ? (
            studentActivityList.content.map((activity: StudentActivity) => (
              <ActivityPreviewItem
                key={activity.id}
                title={activity.title}
                content={activity.content}
                category={activity.categoryName as "LQ" | "RQ" | "CQ"}
                status={parseInt(activity.state) as 0 | 1 | 2}
                date={activity.approvedDate}
                activityWeight={activity.activityWeight}
              />
            ))
          ) : (
            <div css={emptyMessageStyle}>등록된 활동 내역이 없습니다.</div>
          )}
          <div css={buttonContainerStyle}>
            <button
              css={viewAllButtonStyle}
              onClick={() => {
                navigate("/student/activity");
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
          labels: ["나의 분포", "월별 변화 추이", "지수별 분석", "학과별 비교"],
          datasets: {
            "나의 분포": studentMe ? (
              <MyDistribution
                tlq={studentMe.tlq}
                trq={studentMe.trq}
                tcq={studentMe.tcq}
              />
            ) : (
              <div>데이터를 불러올 수 없습니다.</div>
            ),
            "월별 변화 추이": <LineChart data={lineChartData} />,
            "지수별 분석": <QuotientChart data={totalData} />,
            "학과별 비교": <StackedBarChart data={totalData} />,
          },
        }}
      />

      {/* 카테고리별 승인 활동 내역 모달 */}
      <ApprovedActivitiesModal
        isOpen={!!selectedCategory}
        category={selectedCategory}
        activities={filteredApprovedActivities}
        isLoading={approvedActivityListLoading}
        onClose={() => setSelectedCategory(null)}
      />
    </div>
  );
};

export default StudentDashboard;
