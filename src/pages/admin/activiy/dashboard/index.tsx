import React, { useState } from "react";
import { css } from "@emotion/react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "@/styles/components/Card";
import FlexBox from "@/styles/components/Flexbox";

// 스타일 정의
const titleStyle = css`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const subtitleStyle = css`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const chartCardStyle = css`
  padding: 24px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const toggleContainerStyle = css`
  display: flex;
  gap: 10px;
  background: #f0f0f0;
  padding: 4px;
  border-radius: 8px;
`;

const toggleButtonStyle = (isActive: boolean) => css`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: ${isActive ? "white" : "transparent"};
  color: ${isActive ? "#333" : "#666"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${isActive ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
`;

const sectionHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

// 색상 정의 - 모던 그레이스케일
const chartColors = {
  RQ: "#555555", // 진한 회색
  LQ: "#777777", // 중간 회색
  CQ: "#999999", // 연한 회색
};

// 가로 차트 컴포넌트
const HorizontalBarChart = ({
  data,
  colorType = "RQ",
}: {
  data: any[];
  colorType?: "RQ" | "LQ" | "CQ";
}) => {
  const barColor = chartColors[colorType];

  return (
    <ResponsiveContainer width="90%" height={400}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
          stroke="#e0e0e0"
        />
        <XAxis type="number" tick={{ fill: "#333333" }} />
        <YAxis
          dataKey="name"
          type="category"
          width={140}
          tick={{ fontSize: 12, fill: "#333333" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #d0d0d0",
            borderRadius: "4px",
          }}
        />
        <Legend
          wrapperStyle={{
            color: "#333333",
          }}
        />
        <Bar
          dataKey="value"
          name="활동 수"
          fill={barColor}
          barSize={20}
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// 샘플 데이터
const rqData = {
  "학술지 논문게재": [
    { name: "SCI급 학술지", value: 12 },
    { name: "KCI 우수등재 학술지", value: 25 },
    { name: "KCI 등재", value: 38 },
    { name: "KCI 후보, 기타국제학술지", value: 10 },
  ],
  "학술대회 발표": [
    { name: "저명 국제학술대회 구두 발표", value: 15 },
    { name: "저명 국제학술대회 포스터 발표", value: 30 },
    { name: "일반 국제학술대회 구두 발표", value: 30 },
    { name: "일반 국제학술대회 포스터 발표", value: 25 },
    { name: "국내학술대회 구두 발표", value: 15 },
    { name: "국내학술대회 포스터 발표", value: 30 },
  ],
  "공모전/ICPC": [
    { name: "국제공모전 대상/입상", value: 20 },
    { name: "국제공모전 참가", value: 15 },
    { name: "교내/지역 공모전 대상/입상", value: 28 },
    { name: "교내/지역 공모전 참가", value: 10 },
  ],
};

const lqData = {
  교육활동: [
    { name: "교육 활동", value: 35 },
    { name: "교육조교 활동", value: 22 },
  ],
  "교육 성취도": [
    { name: "학점 4.0 ~ 4.5", value: 15 },
    { name: "학점 3.5 ~ 4.0", value: 30 },
    { name: "학점 3.0 ~ 3.5", value: 25 },
  ],
  "오픈소스 SW활동": [
    { name: "OS커뮤니티 5점", value: 10 },
    { name: "OS커뮤니티 4점", value: 8 },
    { name: "OS커뮤니티 3점", value: 6 },
    { name: "커미터 활동 5점", value: 8 },
    { name: "커미터 활동 4점", value: 6 },
    { name: "커미터 활동 3점", value: 4 },
  ],
};

const cqData = {
  산학프로젝트: [
    { name: "A", value: 18 },
    { name: "B", value: 15 },
    { name: "C", value: 12 },
  ],
  인턴십: [
    { name: "A", value: 18 },
    { name: "B", value: 15 },
    { name: "C", value: 12 },
  ],
  창업: [{ name: "수행여부", value: 12 }],
  해외봉사: [
    { name: "A", value: 18 },
    { name: "B", value: 15 },
    { name: "C", value: 12 },
  ],
  "화상강연/세미나 참여": [{ name: "수행여부", value: 30 }],
  알리미: [
    { name: "회장", value: 5 },
    { name: "부회장", value: 8 },
    { name: "임원진", value: 12 },
    { name: "참여", value: 25 },
  ],
  학생회: [
    { name: "회장", value: 4 },
    { name: "부회장", value: 6 },
    { name: "임원진", value: 10 },
    { name: "참여", value: 20 },
  ],
  SCG: [
    { name: "회장", value: 3 },
    { name: "부회장", value: 5 },
    { name: "임원진", value: 8 },
    { name: "참여", value: 15 },
  ],
  미디어홍보: [
    { name: "회장", value: 2 },
    { name: "부회장", value: 3 },
    { name: "임원진", value: 5 },
    { name: "참여", value: 10 },
  ],
  스튜디오기어: [{ name: "참여", value: 12 }],
  스터디그룹: [
    { name: "회장", value: 8 },
    { name: "참여", value: 20 },
  ],
};

// 요약 데이터
const summaryData = [
  {
    name: "RQ",
    count: 143,
    color: "#555555",
  },
  {
    name: "LQ",
    count: 95,
    color: "#777777",
  },
  {
    name: "CQ",
    count: 120,
    color: "#999999",
  },
];

// 요약 카드 컴포넌트
const QCard = ({
  name,
  count,
  color,
}: {
  name: string;
  count: number;
  color: string;
}) => {
  return (
    <Card
      css={css`
        padding: 16px;
        flex: 1;
        border: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-right: 10px;
      `}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ color, marginLeft: "10px" }}
      >
        {name}
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="#333333"
        sx={{ marginRight: "10px" }}
      >
        {count}건
      </Typography>
    </Card>
  );
};

// 버튼으로 카테고리 선택하는 컴포넌트
const ButtonCategorySection = ({
  title,
  dataMap,
  colorType,
}: {
  title: string;
  dataMap: Record<string, any[]>;
  colorType: "RQ" | "LQ" | "CQ";
}) => {
  const categories = Object.keys(dataMap);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const data = dataMap[selectedCategory] || [];

  return (
    <div>
      <div css={sectionHeaderStyle}>
        <h2 css={subtitleStyle}>{title}</h2>
        <div css={toggleContainerStyle}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              css={toggleButtonStyle(selectedCategory === category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <Card css={chartCardStyle}>
        <HorizontalBarChart data={data} colorType={colorType} />
      </Card>
    </div>
  );
};

// 드롭다운으로 카테고리 선택하는 컴포넌트
const DropdownCategorySection = ({
  title,
  dataMap,
  colorType,
}: {
  title: string;
  dataMap: Record<string, any[]>;
  colorType: "RQ" | "LQ" | "CQ";
}) => {
  const categories = Object.keys(dataMap);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const data = dataMap[selectedCategory] || [];

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  return (
    <div>
      <div css={sectionHeaderStyle}>
        <h2 css={subtitleStyle}>{title}</h2>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel id={`${title}-select-label`}>카테고리</InputLabel>
          <Select
            labelId={`${title}-select-label`}
            id={`${title}-select`}
            value={selectedCategory}
            onChange={handleChange as any}
            label="카테고리"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Card css={chartCardStyle}>
        <HorizontalBarChart data={data} colorType={colorType} />
      </Card>
    </div>
  );
};

// 메인 대시보드 컴포넌트
const AdminActivityDashboard: React.FC = () => {
  return (
    <div
      css={css`
        padding: 24px;
      `}
    >
      <h1 css={titleStyle}>활동 통계 대시보드</h1>

      <div
        css={css`
          margin-bottom: 2rem;
        `}
      >
        <h2 css={subtitleStyle}>3Q 활동 통계</h2>
        <FlexBox gap="20px">
          {summaryData.map((item) => (
            <QCard
              key={item.name}
              name={item.name}
              count={item.count}
              color={item.color}
            />
          ))}
        </FlexBox>
      </div>

      <ButtonCategorySection
        title="Research Quotient (RQ)"
        dataMap={rqData}
        colorType="RQ"
      />

      <ButtonCategorySection
        title="Learning Quotient (LQ)"
        dataMap={lqData}
        colorType="LQ"
      />

      <DropdownCategorySection
        title="Communication Quotient (CQ)"
        dataMap={cqData}
        colorType="CQ"
      />
    </div>
  );
};

export default AdminActivityDashboard;
