import React from "react";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import GraphWrapper from "@/components/graphs/GraphWrapper";
import SimpleChart from "@/components/graphs/SimpleChart";
import SimplePieChart from "@/components/graphs/SimplePieChart";
import Card from "@/styles/components/Card";
import { QuotientCard } from "./components/QuotientCard";
import { useAdminRatio } from "@/hooks/admin/useAdminRatio";
import useSubmitSummary from "@/hooks/admin/useSubmitSummary";

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
`;

const subtitleStyle = css`
  font-size: 1.8rem;
`;

const filterButtonStyle = css`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #e8e8e8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

// 더미 데이터
const LQdata = {
  교육활동: [
    { name: "교육외의 교육 활동", value: 15 },
    { name: "교육 조교 활동", value: 25 },
  ],
  "교육 성취도": [
    { name: "학점 4.0~4.5", value: 18 },
    { name: "학점 3.5~4.0", value: 12 },
    { name: "학점 3.0~3.5", value: 22 },
  ],
  "오픈소스 SW 활동": [
    { name: "OS 커뮤니티 생성 및 활성도 5점", value: 14 },
    { name: "OS 커뮤니티 참여 및 활성도 4점", value: 28 },
    { name: "OS 커뮤니티 참여 및 활성도 3점", value: 35 },
    { name: "커미터로서의 활동 5점", value: 47 },
    { name: "커미터로서의 활동 4점", value: 32 },
    { name: "커미터로서의 활동 3점", value: 53 },
  ],
};

const RQdata = {
  "학술지 논문게재": [
    { name: "SCI, SSCI, A&HCI 급 학술지", value: 12 },
    { name: "KCI 우수등재 학술지", value: 8 },
    { name: "KCI 등재", value: 6 },
    { name: "KCI 후보, 기타국제", value: 4 },
  ],
  "학술대회 발표": [
    { name: "저명 국제학술대회 발표", value: 13 },
    { name: "저명 국제학술대회 발표(BK기준 4점)", value: 7 },
    { name: "일반 국제학술대회 발표", value: 5 },
    { name: "국내학술대회 발표", value: 3 },
  ],
  "공모전/ICPC": [
    { name: "국제/대규모 공모전(대상/입상)", value: 15 },
    { name: "국제/대규모 공모전(참여)", value: 4 },
    { name: "교내/지역 공모전(대상/입상)", value: 6 },
    { name: "교내/지역 공모전(참여)", value: 1.5 },
  ],
};

const CQdata = {
  산학프로젝트: [
    { name: "수행여부", value: 4 },
    { name: "평가점수 A", value: 7 },
    { name: "평가점수 B", value: 5 },
    { name: "평가점수 C", value: 2 },
  ],
  인턴십: [
    { name: "수행여부", value: 3 },
    { name: "평가점수 A", value: 8 },
    { name: "평가점수 B", value: 6 },
    { name: "평가점수 C", value: 2 },
  ],
  창업: [{ name: "수행여부", value: 25 }],
  해외봉사: [
    { name: "수행여부", value: 12 },
    { name: "평가점수 A", value: 8 },
    { name: "평가점수 B", value: 5 },
    { name: "평가점수 C", value: 3 },
  ],
  "화상강연/세미나 참여": [{ name: "수행여부", value: 2 }],
  알리미: [
    { name: "회장", value: 8 },
    { name: "부회장", value: 12 },
    { name: "임원진", value: 7 },
    { name: "참여", value: 3 },
  ],
  학생회: [
    { name: "회장", value: 5 },
    { name: "부회장", value: 10 },
    { name: "임원진", value: 7 },
    { name: "참여", value: 3 },
  ],
  SCG: [
    { name: "회장", value: 15 },
    { name: "부회장", value: 10 },
    { name: "임원진", value: 7 },
    { name: "참여", value: 4 },
  ],
  미디어홍보: [
    { name: "회장", value: 12 },
    { name: "부회장", value: 9 },
    { name: "임원진", value: 5 },
    { name: "참여", value: 3 },
  ],
  스튜디오기여: [{ name: "참여", value: 4 }],
  스터디그룹: [
    { name: "회장", value: 7 },
    { name: "참여", value: 3 },
  ],
};

const AdminActivityDashboard: React.FC = () => {
  /////////////// data fetch ///////////////
  const { data: { data: ratioData } = {}, isLoading: isLoadingRatio } =
    useAdminRatio();
  const { data: submitSummary, isLoading: isLoadingSubmitSummary } =
    useSubmitSummary();

  const isLoading = isLoadingRatio || isLoadingSubmitSummary;
  if (isLoading) return <div>Loading...</div>;

  /////////////// component 부분 ///////////////
  return (
    <div css={{ marginBottom: "200px" }}>
      <h1 css={titleStyle}>활동 대시보드</h1>
      <FlexBox justify="space-between">
        <h2 css={subtitleStyle}>3Q 영역별 활동 현황</h2>
        <button css={filterButtonStyle}>검색 필터</button>
      </FlexBox>
      <Card>
        <SimplePieChart data={ratioData} />
        <FlexBox direction="column" gap="10px">
          {submitSummary?.map((quotient: any, index: number) => (
            <QuotientCard
              key={index}
              color={quotient.color}
              title={quotient.title}
              month={quotient.month}
              change={quotient.change}
              total={quotient.total}
            />
          ))}
        </FlexBox>
      </Card>

      {/* TODO: data fetch 시 map 활용해서 단순화하기 */}
      <div>
        <GraphWrapper
          title="학술지표 (Research Quotient)"
          type="block"
          options={{
            labels: ["학술지 논문게재", "학술대회 발표", "공모전/ICPC"],
            datasets: {
              "학술지 논문게재": (
                <SimpleChart data={RQdata["학술지 논문게재"]} />
              ),
              "학술대회 발표": <SimpleChart data={RQdata["학술대회 발표"]} />,
              "공모전/ICPC": <SimpleChart data={RQdata["공모전/ICPC"]} />,
            },
          }}
        />
        <GraphWrapper
          title="교육지표 (Learning Quotient)"
          type="block"
          options={{
            labels: ["교육활동", "교육성취도", "오픈소스SW활동"],
            datasets: {
              교육활동: <SimpleChart data={LQdata["교육활동"]} />,
              교육성취도: <SimpleChart data={LQdata["교육 성취도"]} />,
              오픈소스SW활동: <SimpleChart data={LQdata["오픈소스 SW 활동"]} />,
            },
          }}
        />
        <GraphWrapper
          title="교류지표 (Communication Quotient)"
          type="dropdown"
          options={{
            labels: [
              "산학협력프로젝트",
              "인턴쉽",
              "창업",
              "해외봉사",
              "화상강연/세미나",
              "알리미",
              "학생회",
              "SCG",
              "미디어홍보",
              "스튜디오 기여",
              "스터디그룹",
            ],
            datasets: {
              산학협력프로젝트: <SimpleChart data={CQdata["산학프로젝트"]} />,
              인턴쉽: <SimpleChart data={CQdata["인턴십"]} />,
              창업: <SimpleChart data={CQdata["창업"]} />,
              해외봉사: <SimpleChart data={CQdata["해외봉사"]} />,
              화상강연세미나: (
                <SimpleChart data={CQdata["화상강연/세미나 참여"]} />
              ),
              알리미: <SimpleChart data={CQdata["알리미"]} />,
              학생회: <SimpleChart data={CQdata["학생회"]} />,
              SCG: <SimpleChart data={CQdata["SCG"]} />,
              미디어홍보: <SimpleChart data={CQdata["미디어홍보"]} />,
              "스튜디오 기여": <SimpleChart data={CQdata["스튜디오기여"]} />,
              스터디그룹: <SimpleChart data={CQdata["스터디그룹"]} />,
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminActivityDashboard;
