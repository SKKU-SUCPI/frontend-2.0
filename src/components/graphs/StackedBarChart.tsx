import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";

interface StackedBarChartProps {
  data: {
    RQ: { name: string; score: number }[];
    LQ: { name: string; score: number }[];
    CQ: { name: string; score: number }[];
  };
}

const tooltipContainerStyle = css`
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const tooltipTitleStyle = css`
  font-weight: bold;
  margin: 0;
  margin-bottom: 8px;
`;

const tooltipItemStyle = css`
  margin: 0;
`;

const tooltipTotalStyle = css`
  margin: 0;
  margin-top: 8px;
  font-weight: bold;
  border-top: 2px solid #eee;
  padding-top: 8px;
`;

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  // TODO: 백엔드 데이터 형식에 따라 변경할 것
  // 데이터 변환 - 학과별로 RQ, LQ, CQ 점수를 통합
  const transformedData = React.useMemo(() => {
    // 모든 학과 이름 추출
    const departmentNames = Array.from(
      new Set([
        ...data.RQ.map((item) => item.name),
        ...data.LQ.map((item) => item.name),
        ...data.CQ.map((item) => item.name),
      ])
    );

    // 각 학과별로 데이터 구성
    return departmentNames.map((deptName) => {
      const rqItem = data.RQ.find((item) => item.name === deptName);
      const lqItem = data.LQ.find((item) => item.name === deptName);
      const cqItem = data.CQ.find((item) => item.name === deptName);

      const rqScore = rqItem ? rqItem.score : 0;
      const lqScore = lqItem ? lqItem.score : 0;
      const cqScore = cqItem ? cqItem.score : 0;

      return {
        name: deptName,
        RQ: rqScore,
        LQ: lqScore,
        CQ: cqScore,
        total: rqScore + lqScore + cqScore,
      };
    });
  }, [data]);

  // 데이터 항목 개수에 따라 차트 높이 계산
  const chartHeight = React.useMemo(() => {
    const itemCount = transformedData.length;
    // 각 항목당 최소 50px 높이 할당 + 여백
    const minHeight = Math.max(400, itemCount * 50 + 100);
    return minHeight;
  }, [transformedData]);

  return (
    <FlexBox direction="column" gap="20px">
      <BarChart
        width={1000}
        height={chartHeight}
        data={transformedData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis type="category" dataKey="name" />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const total = payload.reduce(
                (sum, entry) => sum + (entry.value as number),
                0
              );
              return (
                <div css={tooltipContainerStyle}>
                  <p css={tooltipTitleStyle}>{label}</p>
                  {payload.map((entry, index) => (
                    <p
                      key={index}
                      css={css`
                        ${tooltipItemStyle};
                        color: ${entry.color};
                      `}
                    >
                      {entry.name}: {entry.value}점
                    </p>
                  ))}
                  <p css={tooltipTotalStyle}>총점: {total}점</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar
          dataKey="RQ"
          name="Reasoning Quotient"
          stackId="a"
          fill="#7B8BA3"
        />
        <Bar dataKey="LQ" name="Learning Quotient" stackId="a" fill="#9BA6BC" />
        <Bar
          dataKey="CQ"
          name="Communication Quotient"
          stackId="a"
          fill="#B8C2D4"
        />
      </BarChart>
    </FlexBox>
  );
};

export default StackedBarChart;
