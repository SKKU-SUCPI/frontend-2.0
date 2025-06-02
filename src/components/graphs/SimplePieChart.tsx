import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface ChartDataItem {
  name: "lq" | "rq" | "cq";
  value: number;
  color: string;
}

interface SimplePieChartProps {
  data: ChartDataItem[] | Record<"lq" | "rq" | "cq", number>;
  width?: number | string;
  height?: number | string;
}

const colorLabel: Record<ChartDataItem["name"], string> = {
  lq: "#0088FE",
  rq: "#00C49F",
  cq: "#FFBB28",
};

const SimplePieChart: React.FC<SimplePieChartProps> = ({
  data,
  width = "100%",
  height = 400,
}) => {
  // data가 배열이 아니면 변환
  const chartData: ChartDataItem[] = Array.isArray(data)
    ? data
    : Object.entries(data).map(([name, value]) => ({
        name: name as "lq" | "rq" | "cq",
        value,
        color: colorLabel[name as "lq" | "rq" | "cq"],
      }));

  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(1)}%)`
          }
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorLabel[entry.name]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`${value}건`, "제출"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SimplePieChart;
