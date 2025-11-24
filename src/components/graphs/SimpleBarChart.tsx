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

type ChartDataRecord = Record<string, number | undefined>;

interface SimpleBarChartProps {
  data: ChartDataRecord;
  title: string;
  showTScore?: boolean;
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
  height: 350px;
`;

const titleStyle = css`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: start;
  color: #333;
`;

const barColorMap: Record<string, string> = {
  LQ: "#0088FE",
  RQ: "#00C49F",
  CQ: "#FFBB28",
  "T-합계": "#845EC2",
};

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  title,
  showTScore = false,
}) => {
  const chartData = Object.entries(data)
    .filter(([, value]) => typeof value === "number" && !Number.isNaN(value))
    .map(([name, value]) => ({
      name,
      value: value as number,
      fill: barColorMap[name] ?? "#8884d8",
    }));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <h3 css={titleStyle}>{title}</h3>
      <div css={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis 
              domain={showTScore ? [0, 100] : [0, 33]} 
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div css={tooltipContainerStyle}>
                      <p css={tooltipTitleStyle}>{label}</p>
                      <p css={tooltipItemStyle}>
                        점수:{" "}
                        {showTScore
                          ? Number(payload[0]?.value).toFixed(2)
                          : payload[0]?.value}
                        점
                      </p>
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
