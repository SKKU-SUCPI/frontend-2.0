import React from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { css } from "@emotion/react";

interface RadarChartData {
  subject: string;
  value: number;
  fullMark: number;
}

interface RadarChartProps {
  data: RadarChartData[];
  title?: string;
}

const chartContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const chartTitleStyle = css`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #333;
`;

const chartWrapperStyle = css`
  flex: 1;
  min-height: 300px;
`;

const RadarChart: React.FC<RadarChartProps> = ({ data, title }) => {
  return (
    <div css={chartContainerStyle}>
      {title && <div css={chartTitleStyle}>{title}</div>}
      <div css={chartWrapperStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={90} domain={[0, 33]} />
            <Radar
              name="점수"
              dataKey="value"
              stroke="#007bff"
              fill="#007bff"
              fillOpacity={0.3}
            />
            <Legend />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadarChart;
