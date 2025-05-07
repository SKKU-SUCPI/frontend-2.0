import React from "react";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import GraphWrapper from "@/components/graphs/GraphWrapper";
import Card from "@/styles/components/Card";
import SimpleChart from "@/components/graphs/SimpleChart";

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
`;

const subtitleStyle = css`
  font-size: 1.8rem;
`;

const LQdata = {
  교육활동: [
    { name: "교육외의 교육 활동", value: 10 },
    { name: "교육 조교 활동", value: 20 },
  ],
  "교육 성취도": [
    { name: "학점 4.0~4.5", value: 10 },
    { name: "학점 3.5~4.0", value: 20 },
    { name: "학점 3.0~3.5", value: 30 },
  ],
  "오픈소스 SW 활동": [
    { name: "OS 커뮤니티 생성 및 활성도 5점", value: 10 },
    { name: "OS 커뮤니티 참여 및 활성도 4점", value: 20 },
    { name: "OS 커뮤니티 참여 및 활성도 3점", value: 30 },
    { name: "커미터로서의 활동 5점", value: 40 },
    { name: "커미터로서의 활동 4점", value: 50 },
    { name: "커미터로서의 활동 3점", value: 60 },
  ],
};

const RQdata = {
  "학술지 논문게재": [
    { name: "SCI, SSCI, A&HCI 급 학술지", value: 10 },
    { name: "KCI 우수등재 학술지", value: 5 },
    { name: "KCI 등재", value: 3 },
    { name: "KCI 후보, 기타국제", value: 2 },
  ],
  "학술대회 발표": [
    { name: "저명 국제학술대회 발표", value: 10 },
    { name: "저명 국제학술대회 발표(BK기준 4점)", value: 4 },
    { name: "일반 국제학술대회 발표", value: 2 },
    { name: "국내학술대회 발표", value: 1 },
  ],
  "공모전/ICPC": [
    { name: "국제/대규모 공모전(대상/입상)", value: 10 },
    { name: "국제/대규모 공모전(참여)", value: 2 },
    { name: "교내/지역 공모전(대상/입상)", value: 3 },
    { name: "교내/지역 공모전(참여)", value: 0.5 },
  ],
};

const CQdata = {
  산학프로젝트: [
    { name: "수행여부", value: 2 },
    { name: "평가점수 A", value: 5 },
    { name: "평가점수 B", value: 3 },
    { name: "평가점수 C", value: 1 },
  ],
  인턴십: [
    { name: "수행여부", value: 2 },
    { name: "평가점수 A", value: 5 },
    { name: "평가점수 B", value: 3 },
    { name: "평가점수 C", value: 1 },
  ],
  창업: [{ name: "수행여부", value: 30 }],
  해외봉사: [
    { name: "수행여부", value: 10 },
    { name: "평가점수 A", value: 5 },
    { name: "평가점수 B", value: 3 },
    { name: "평가점수 C", value: 1 },
  ],
  "화상강연/세미나 참여": [{ name: "수행여부", value: 1 }],
  알리미: [
    { name: "회장", value: 20 },
    { name: "부회장", value: 15 },
    { name: "임원진", value: 10 },
    { name: "참여", value: 5 },
  ],
  학생회: [
    { name: "회장", value: 20 },
    { name: "부회장", value: 15 },
    { name: "임원진", value: 10 },
    { name: "참여", value: 5 },
  ],
  SCG: [
    { name: "회장", value: 10 },
    { name: "부회장", value: 8 },
    { name: "임원진", value: 6 },
    { name: "참여", value: 5 },
  ],
  미디어홍보: [
    { name: "회장", value: 10 },
    { name: "부회장", value: 8 },
    { name: "임원진", value: 6 },
    { name: "참여", value: 5 },
  ],
  스튜디오기여: [{ name: "참여", value: 2 }],
  스터디그룹: [
    { name: "회장", value: 5 },
    { name: "참여", value: 2 },
  ],
};

const AdminActivityDashboard: React.FC = () => {
  return (
    <div css={{ marginBottom: "200px" }}>
      <h1 css={titleStyle}>활동 대시보드</h1>
      <FlexBox justify="space-between">
        <h2 css={subtitleStyle}>3Q 영역별 활동 현황</h2>
        <button>검색 필터</button>
      </FlexBox>
      <FlexBox justify="space-between">
        <Card>test</Card>
        <Card>test</Card>
        <Card>test</Card>
      </FlexBox>

      <div>
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
          title="교류지표 Communication Quotient"
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
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminActivityDashboard;
