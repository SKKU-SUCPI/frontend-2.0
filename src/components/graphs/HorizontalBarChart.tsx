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

interface HorizontalBarChartProps {
  data: Array<{
    name: string;
    LQ?: number;
    RQ?: number;
    CQ?: number;
    value?: number;
  }>;
  title: string;
  showStacked: boolean;
  singleCategory?: "LQ" | "RQ" | "CQ";
  showTScore?: boolean;
}

const chartTitleStyle = css`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  color: #333;
`;

const COLORS = {
  LQ: "#0088FE",
  RQ: "#00C49F",
  CQ: "#FFBB28",
};

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  title,
  showStacked,
  singleCategory,
  showTScore = false,
}) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#999" }}>데이터가 없습니다</p>
      </div>
    );
  }

  // 최대값 계산
  let calculatedMax = 0;
  data.forEach(item => {
    const value = item.value || 0;
    if (value > calculatedMax) calculatedMax = value;
  });

  const maxValue = showTScore ? 100 : Math.ceil(calculatedMax * 1.1);
  const chartHeight = 400;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <h3 css={chartTitleStyle}>{title}</h3>
      <div style={{ flex: 1, overflow: "auto", width: "100%", minHeight: 0, display: "flex", alignItems: "flex-start" }}>
        <div style={{ width: "100%", height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                domain={[0, maxValue]}
                label={{ value: "점수", position: "insideBottom", offset: -10 }}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={80}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(value: number) =>
                  showTScore ? value.toFixed(2) : value.toFixed(1)
                }
              />
              <Bar
                dataKey="value"
                fill={singleCategory ? COLORS[singleCategory] : "#667eea"}
                name={showStacked ? "총점" : (singleCategory || "점수")}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HorizontalBarChart;

