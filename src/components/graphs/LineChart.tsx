import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { css } from "@emotion/react";

interface DataPoint {
  year: number;
  LQ: number;
  CQ: number;
  RQ: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const chartContainer = css`
  width: 100%;
  height: 400px;
  padding: 20px;
`;

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <div css={chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: "연도", position: "bottom" }} />
          <YAxis
            label={{ value: "점수", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="LQ"
            stroke="#0088FE"
            name="LQ"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="CQ"
            stroke="#FFBB28"
            name="CQ"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="RQ"
            stroke="#00C49F"
            name="RQ"
            strokeWidth={2}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
