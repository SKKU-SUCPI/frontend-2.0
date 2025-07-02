import React from "react";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import GraphWrapper from "@/components/graphs/GraphWrapper";
import SimpleChart from "@/components/graphs/SimpleChart";
import SimplePieChart from "@/components/graphs/SimplePieChart";
import Card from "@/styles/components/Card";
import { QuotientCard } from "./components/QuotientCard";
import useSubmitSummary from "@/hooks/admin/useSubmitSummary";
import Loading from "@/components/layouts/Loading";
import GenericFilter from "@/components/filter/GenericFilter";
import { adminActivityDashboardFilterConfig } from "@/components/filter/filterConfig";
import useFilter from "@/hooks/filter/useFilter";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminActivityCounts } from "@/hooks/admin/useAdminActivityCounts";

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
    { name: "교육외의 교육 활동", id: 1 },
    { name: "교육 조교 활동", id: 2 },
  ],
  "교육 성취도": [
    { name: "학점 4.0~4.5", id: 3 },
    { name: "학점 3.5~4.0", id: 4 },
    { name: "학점 3.0~3.5", id: 5 },
    { name: "학점 3.0 미만", id: 6 },
  ],
  "오픈소스 SW 활동": [
    { name: "OS 커뮤니티 생성 및 활성도 5점", id: 7 },
    { name: "OS 커뮤니티 참여 및 활성도 4점", id: 8 },
    { name: "OS 커뮤니티 참여 및 활성도 3점", id: 9 },
    { name: "OS 커뮤니티 참여 및 활성도 0점", id: 10 },
    { name: "커미터로서의 활동 5점", id: 11 },
    { name: "커미터로서의 활동 4점", id: 12 },
    { name: "커미터로서의 활동 3점", id: 13 },
    { name: "커미터로서의 활동 0점", id: 14 },
  ],
};

const RQdata = {
  "학술지 논문게재": [
    { name: "JCR 상위 5% 이내 학술지(주저)", id: 15 },
    { name: "JCR 상위 5% 이내 학술지(공저)", id: 16 },
    { name: "JCR 상위 10% 이내 학술지(주저)", id: 17 },
    { name: "JCR 상위 10% 이내 학술지(공저)", id: 18 },
    { name: "JCR 상위 20% 이내 학술지(주저)", id: 19 },
    { name: "JCR 상위 20% 이내 학술지(공저)", id: 20 },
    { name: "SCI, SSCI, A&HCI 급 학술지", id: 21 },
    { name: "KCI 우수 등재 학술지", id: 22 },
    { name: "KCI 등재", id: 23 },
    { name: "KCI 후보, 기타 국제", id: 24 },
  ],
  "학술대회 발표": [
    { name: "저명 국제학술대회 구두 발표", id: 25 },
    { name: "저명 국제학술대회 포스터 발표", id: 26 },
    { name: "일반 국제학술대회 구두 발표", id: 27 },
    { name: "일반 국제학술대회 포스터 발표", id: 28 },
    { name: "국내학술대회 구두 발표", id: 29 },
    { name: "국내학술대회 포스터 발표", id: 30 },
    { name: "저명 국제학술대회 발표(BK 기준)", id: 31 },
    { name: "일반 국제학술대회 발표", id: 32 },
    { name: "국내학술대회 발표", id: 33 },
  ],
  "공모전/ICPC": [
    { name: "국제/대규모 공모전(ICPC, 공개SW개발자대회) 대상", id: 34 },
    { name: "국제/대규모 공모전(ICPC, 공개SW개발자대회) 입상", id: 35 },
    { name: "국제/대규모 공모전(ICPC, 공개SW개발자대회) 참여", id: 36 },
    { name: "교내/지역 공모전 대상", id: 37 },
    { name: "교내/지역 공모전 입상", id: 38 },
    { name: "교내/지역 공모전 참여", id: 39 },
  ],
};

const CQdata = {
  산학프로젝트: [{ name: "참여", id: 40 }],
  인턴십: [{ name: "참여", id: 41 }],
  창업: [{ name: "수행여부", id: 42 }],
  해외봉사: [{ name: "참여", id: 43 }],
  "화상강연/세미나 참여": [{ name: "참여", id: 44 }],
  알리미: [
    { name: "회장", id: 45 },
    { name: "부회장", id: 46 },
    { name: "참여", id: 47 },
  ],
  학생회: [
    { name: "회장", id: 48 },
    { name: "부회장", id: 49 },
    { name: "참여", id: 50 },
  ],
  기자단: [
    { name: "회장", id: 51 },
    { name: "부회장", id: 52 },
    { name: "참여", id: 53 },
  ],
  스튜디오기여: [{ name: "참여", id: 54 }],
  스터디그룹: [
    { name: "SCG, MAV, 스꾸딩 등 회장", id: 55 },
    { name: "SCG, MAV, 스꾸딩 등 부회장", id: 56 },
    { name: "SCG, MAV, 스꾸딩 등 참여", id: 57 },
  ],
};

const AdminActivityDashboard: React.FC = () => {
  const {
    filter,
    handleFilterChange,
    resetFilter,
    appliedFilter,
    applyFilter,
  } = useFilter(adminActivityDashboardFilterConfig);

  /////////////// data fetch ///////////////

  const { data: submitSummary, isLoading: isLoadingSubmitSummary } =
    useSubmitSummary();

  const { data: adminActivityCounts, isLoading: isLoadingAdminActivityCounts } =
    useAdminActivityCounts(appliedFilter.startDate, appliedFilter.endDate);

  if (isLoadingSubmitSummary || isLoadingAdminActivityCounts)
    return <Loading />;

  // API 데이터로 value를 채워넣는 함수
  const populateDataWithCounts = (dataStructure: any) => {
    if (!adminActivityCounts) return dataStructure;

    const populateCategory = (category: any[]) => {
      return category.map((item) => ({
        ...item,
        value: adminActivityCounts[item.id] || 0,
      }));
    };

    const result: any = {};
    Object.keys(dataStructure).forEach((categoryKey) => {
      result[categoryKey] = populateCategory(dataStructure[categoryKey]);
    });

    return result;
  };

  // API 데이터로 채워진 데이터 생성
  const populatedLQdata = populateDataWithCounts(LQdata);
  const populatedRQdata = populateDataWithCounts(RQdata);
  const populatedCQdata = populateDataWithCounts(CQdata);

  const ratioData = submitSummary
    ? submitSummary.reduce((acc: any, quotient: any) => {
        if (quotient.title.includes("Learning Quotient"))
          acc.lq = quotient.total;
        if (quotient.title.includes("Research Quotient"))
          acc.rq = quotient.total;
        if (quotient.title.includes("Communication Quotient"))
          acc.cq = quotient.total;
        return acc;
      }, {})
    : undefined;

  /////////////// component 부분 ///////////////
  return (
    <div css={{ marginBottom: "200px" }}>
      <h1 css={titleStyle}>활동 대시보드</h1>
      <FlexBox justify="space-between">
        <h2 css={subtitleStyle}>3Q 영역별 활동 현황</h2>
      </FlexBox>
      <Card css={{ marginBottom: "40px" }}>
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

      <GenericFilter
        filterConfig={adminActivityDashboardFilterConfig}
        filters={filter}
        onFilterChange={handleFilterChange}
        onReset={resetFilter}
        onApply={() => {
          applyFilter();
          // queryClient.invalidateQueries({
          //   queryKey: ["adminActivityDashboard"],
          // });
        }}
        appliedFilter={appliedFilter}
      />

      {/* TODO: data fetch 시 map 활용해서 단순화하기 */}
      <div>
        <GraphWrapper
          title="학술지표 (Research Quotient)"
          type="block"
          options={{
            labels: ["학술지 논문게재", "학술대회 발표", "공모전/ICPC"],
            datasets: {
              "학술지 논문게재": (
                <SimpleChart data={populatedRQdata["학술지 논문게재"]} />
              ),
              "학술대회 발표": (
                <SimpleChart data={populatedRQdata["학술대회 발표"]} />
              ),
              "공모전/ICPC": (
                <SimpleChart data={populatedRQdata["공모전/ICPC"]} />
              ),
            },
          }}
        />
        <GraphWrapper
          title="교육지표 (Learning Quotient)"
          type="block"
          options={{
            labels: ["교육활동", "교육성취도", "오픈소스SW활동"],
            datasets: {
              교육활동: <SimpleChart data={populatedLQdata["교육활동"]} />,
              교육성취도: <SimpleChart data={populatedLQdata["교육 성취도"]} />,
              오픈소스SW활동: (
                <SimpleChart data={populatedLQdata["오픈소스 SW 활동"]} />
              ),
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
              "기자단",
              "스튜디오 기여",
              "스터디그룹",
            ],
            datasets: {
              산학협력프로젝트: (
                <SimpleChart data={populatedCQdata["산학프로젝트"]} />
              ),
              인턴쉽: <SimpleChart data={populatedCQdata["인턴십"]} />,
              창업: <SimpleChart data={populatedCQdata["창업"]} />,
              해외봉사: <SimpleChart data={populatedCQdata["해외봉사"]} />,
              화상강연세미나: (
                <SimpleChart data={populatedCQdata["화상강연/세미나 참여"]} />
              ),
              알리미: <SimpleChart data={populatedCQdata["알리미"]} />,
              학생회: <SimpleChart data={populatedCQdata["학생회"]} />,
              기자단: <SimpleChart data={populatedCQdata["기자단"]} />,
              "스튜디오 기여": (
                <SimpleChart data={populatedCQdata["스튜디오기여"]} />
              ),
              스터디그룹: <SimpleChart data={populatedCQdata["스터디그룹"]} />,
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminActivityDashboard;
