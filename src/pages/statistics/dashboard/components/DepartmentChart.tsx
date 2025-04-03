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

interface DepartmentChartProps {
  totalData: {
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

const DepartmentChart: React.FC<DepartmentChartProps> = ({ totalData }) => {
  // TODO: 백엔드 데이터 형식에 따라 변경할 것
  const data = [
    {
      name: "SW",
      RQ: totalData.RQ[0].score,
      LQ: totalData.LQ[0].score,
      CQ: totalData.CQ[0].score,
      total:
        totalData.RQ[0].score + totalData.LQ[0].score + totalData.CQ[0].score,
    },
    {
      name: "EE",
      RQ: totalData.RQ[1].score,
      LQ: totalData.LQ[1].score,
      CQ: totalData.CQ[1].score,
      total:
        totalData.RQ[1].score + totalData.LQ[1].score + totalData.CQ[1].score,
    },
    {
      name: "CSE",
      RQ: totalData.RQ[2].score,
      LQ: totalData.LQ[2].score,
      CQ: totalData.CQ[2].score,
      total:
        totalData.RQ[2].score + totalData.LQ[2].score + totalData.CQ[2].score,
    },
  ];

  return (
    <FlexBox direction="column" gap="20px">
      <BarChart
        width={1000}
        height={400}
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        barSize={30}
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

export default DepartmentChart;
