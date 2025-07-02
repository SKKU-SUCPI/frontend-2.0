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
  const groupNames = ["RQ", "LQ", "CQ"];
  const gray = "#E8E9EB";

  // 데이터 개수에 따라 동적으로 바 크기 조정
  const dynamicBarSize = useMemo(() => {
    const dataCount = data.RQ.length;
    if (barSize) return barSize; // props로 전달된 경우 우선 사용
    const sizeByDataCount = [
      { maxCount: 3, size: 40 },
      { maxCount: 5, size: 30 },
      { maxCount: 8, size: 20 },
      { maxCount: 12, size: 10 },
    ];
    const findMatchedCount = sizeByDataCount.find(
      ({ maxCount }) => dataCount <= maxCount
    );
    return findMatchedCount ? findMatchedCount.size : 15;
  }, [data.RQ.length, barSize]);

  // 학과명 추출 (모든 그룹에서 중복 없이)
  const allMajors = Array.from(
    new Set([
      ...data.RQ.map((d: QuotientData) => d.name),
      ...data.LQ.map((d: QuotientData) => d.name),
      ...data.CQ.map((d: QuotientData) => d.name),
    ])
  );

  // 학과별 색상 팔레트 (최대 10개, 더 많으면 추가 필요)
  const majorColors = [
    "#66D4B3",
    "#66A3FE",
    "#FFD166",
    "#FF6B6B",
    "#A685E2",
    "#FFA07A",
    "#7ED957",
    "#FFB6C1",
    "#B0E0E6",
    "#C0C0C0",
  ];
  const majorColorMap: Record<string, string> = {};
  allMajors.forEach((major, idx) => {
    majorColorMap[major] = majorColors[idx % majorColors.length];
  });

  // 차트 데이터: [{ quotient, major, value } ...]
  const chartData: { quotient: string; [major: string]: number | string }[] =
    groupNames.map((group) => {
      const obj: any = { quotient: group };
      allMajors.forEach((major) => {
        const found = data[group as keyof typeof data].find(
          (d: QuotientData) => d.name === major
        );
        obj[major] = found ? found.score : 0;
      });
      return obj;
    });

  return (
    <FlexBox direction="column" gap="20px">
      <BarChart
        width={width}
        height={height}
        data={chartData}
        barSize={dynamicBarSize}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="quotient" />
        <YAxis domain={maxDomain ? [0, maxDomain] : undefined} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <p style={{ fontWeight: "bold", margin: 0, marginBottom: 8 }}>
                    {label}
                  </p>
                  {payload.map((entry, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        margin: 0,
                      }}
                    >
                      <span
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor:
                            majorColorMap[String(entry.name)] || gray,
                          display: "inline-block",
                        }}
                      />
                      <span style={{ color: "black" }}>
                        {entry.name}: {entry.value}점
                      </span>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
        <Legend
          iconType="circle"
          content={({ payload }) => {
            if (!payload) return null;
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  gap: 16,
                }}
              >
                {payload
                  .filter((entry: any) => {
                    const color = majorColorMap[String(entry.value)] || gray;
                    return color !== gray;
                  })
                  .map((entry: any, idx: number) => (
                    <span
                      key={idx}
                      style={{
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: majorColorMap[String(entry.value)],
                          marginRight: "8px",
                          verticalAlign: "middle",
                        }}
                      />
                      {entry.value}
                    </span>
                  ))}
              </div>
            );
          }}
        />
        {allMajors.map((major) => (
          <Bar
            key={major}
            dataKey={major}
            name={major}
            fill={gray}
            barSize={dynamicBarSize}
            isAnimationActive={false}
            shape={(props: any) => {
              const { x, y, width, height } = props;
              const colorHeight = 5;
              return (
                <g>
                  {/* 회색 전체 바 */}
                  <rect x={x} y={y} width={width} height={height} fill={gray} />
                  {/* 상단 5px만 학과별 색상 */}
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={colorHeight}
                    fill={majorColorMap[String(props.name)] || gray}
                  />
                </g>
              );
            }}
          />
        ))}
      </BarChart>
    </FlexBox>
  );
};

export default QuotientChart;
