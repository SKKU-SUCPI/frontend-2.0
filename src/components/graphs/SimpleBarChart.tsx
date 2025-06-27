import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { css } from "@emotion/react";

interface SimpleBarChartProps {
  data: {
    LQ: number;
    RQ: number;
    CQ: number;
  };
  title: string;
}

const tooltipContainerStyle = css`
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
`;

const tooltipTitleStyle = css`
  font-weight: bold;
  margin: 0;
  margin-bottom: 8px;
  color: #333;
`;

const tooltipItemStyle = css`
  margin: 0;
  color: #666;
`;

const chartContainerStyle = css`
  width: 100%;
  height: 300px;
`;

const titleStyle = css`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
`;

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, title }) => {
  const chartData = [
    { name: "LQ", value: data.LQ, fill: "#0088FE" },
    { name: "RQ", value: data.RQ, fill: "#00C49F" },
    { name: "CQ", value: data.CQ, fill: "#FFBB28" },
  ];

  return (
    <div>
      <div css={titleStyle}>{title}</div>
      <div css={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 33]} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div css={tooltipContainerStyle}>
                      <p css={tooltipTitleStyle}>{label}</p>
                      <p css={tooltipItemStyle}>점수: {payload[0]?.value}점</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" barSize={100} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimpleBarChart;
