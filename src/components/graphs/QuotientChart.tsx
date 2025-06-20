import React, { useMemo } from "react";
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

interface QuotientData {
  name: string;
  score: number;
}

interface QuotientChartProps {
  data: {
    RQ: QuotientData[];
    LQ: QuotientData[];
    CQ: QuotientData[];
  };
  width?: number;
  height?: number;
  barSize?: number;
  maxDomain?: number | undefined;
}

const QuotientChart: React.FC<QuotientChartProps> = ({
  data,
  width = 1000,
  height = 400,
  barSize,
  maxDomain,
}) => {
  const transformedData = [
    {
      name: "RQ",
      ...Object.fromEntries(data.RQ.map((item) => [item.name, item.score])),
    },
    {
      name: "LQ",
      ...Object.fromEntries(data.LQ.map((item) => [item.name, item.score])),
    },
    {
      name: "CQ",
      ...Object.fromEntries(data.CQ.map((item) => [item.name, item.score])),
    },
  ];

  const barColors = ["#7B8BA3", "#9BA6BC", "#B8C2D4"];

  // 데이터 개수에 따라 동적으로 바 크기 조정
  const dynamicBarSize = useMemo(() => {
    const dataCount = data.RQ.length;
    if (barSize) return barSize; // props로 전달된 경우 우선 사용

    // 데이터 개수에 따라 바 크기 동적 계산
    const sizeByDataCount = [
      { maxCount: 3, size: 50 },
      { maxCount: 5, size: 40 },
      { maxCount: 8, size: 30 },
      { maxCount: 12, size: 20 },
    ];
    const findMatchedCount = sizeByDataCount.find(
      ({ maxCount }) => dataCount <= maxCount
    );
    return findMatchedCount ? findMatchedCount.size : 15;
  }, [data.RQ.length, barSize]);

  return (
    <FlexBox direction="column" gap="20px">
      <BarChart
        width={width}
        height={height}
        data={transformedData}
        barSize={dynamicBarSize}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={maxDomain ? [0, maxDomain] : undefined} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div
                  css={css`
                    background: white;
                    padding: 10px;
                    border-radius: 4px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  `}
                >
                  <p
                    css={css`
                      font-weight: bold;
                      margin: 0;
                    `}
                  >
                    {label}
                  </p>
                  {payload.map((entry, index) => (
                    <p
                      key={index}
                      css={css`
                        margin: 0;
                        color: ${entry.color};
                      `}
                    >
                      {entry.name}: {entry.value}점
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        {data.RQ.map((item, index) => (
          <Bar
            key={item.name}
            dataKey={item.name}
            name={item.name}
            fill={barColors[index % barColors.length]}
          />
        ))}
      </BarChart>
    </FlexBox>
  );
};

export default QuotientChart;
