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

interface ChartDataItem {
  name: string;
  value: number;
}

interface SimpleChartProps {
  data: ChartDataItem[];
}

const SimpleChart: React.FC<SimpleChartProps> = ({ data }) => {
  // 각 바의 높이와 간격을 설정
  const barHeight = 30;
  const barGap = 40;
  const baseHeight = 120;

  // 전체 높이 계산: (바 높이 + 간격) * 데이터 수 + 기본 여백
  const totalHeight = (barHeight + barGap) * data.length + baseHeight;

  return (
    <ResponsiveContainer width="100%" height={totalHeight}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: 30,
          left: 60,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis
          dataKey="name"
          type="category"
          width={100}
          tick={{ fontSize: 14 }}
        />
        <Tooltip />
        <Bar dataKey="value" fill="#000000" barSize={barHeight} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleChart;
