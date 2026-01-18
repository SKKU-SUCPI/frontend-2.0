import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { css } from "@emotion/react";
import { generateNormalDistributionData } from "@/utils/normalDistribution";

interface IndividualDistributionProps {
  tlq: number;
  trq: number;
  tcq: number;
}

const chartContainer = css`
  width: 100%;
  height: 500px;
  padding: 20px;
`;

const titleStyle = css`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
`;

const descriptionStyle = css`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const IndividualDistribution: React.FC<IndividualDistributionProps> = ({
  tlq,
  trq,
  tcq,
}) => {
  // T-점수는 3개 영역 합이 평균 50이 되도록 설계
  // 따라서 각 영역의 평균은 50/3 ≈ 16.67
  const mean = 50 / 3;  // ≈ 16.67
  const stdDev = 10;
  
  // 0부터 평균의 2배까지 표시하므로 range를 조정 (약 ±1.67σ)
  const normalData = generateNormalDistributionData(mean, stdDev, 100, 2);

  // 각 지수의 백분위 계산 (개별 영역 기준)
  const calculatePercentile = (value: number, mean: number, stdDev: number): number => {
    const z = (value - mean) / stdDev;
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    const probability =
      d *
      t *
      (0.3193815 +
        t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z >= 0 ? (1 - probability) * 100 : probability * 100;
  };
  
  const lqPercentile = calculatePercentile(tlq, mean, stdDev);
  const rqPercentile = calculatePercentile(trq, mean, stdDev);
  const cqPercentile = calculatePercentile(tcq, mean, stdDev);

  // Recharts용 데이터 변환
  const chartData = normalData.map((point) => ({
    tScore: point.x,
    density: point.y,
  }));

  // X축 범위: 0부터 평균의 2배까지
  const xDomain = [0, mean * 2];  // 0 ~ 33.34
  
  // X축 tick 설정 (5 단위)
  const xTicks = [0, 5, 10, 15, Math.round(mean * 10) / 10, 20, 25, 30, Math.round(mean * 2 * 10) / 10];

  return (
    <div>
      <h3 css={titleStyle}>개별 3Q 지수 분포</h3>
      <p css={descriptionStyle}>
        LQ, RQ, CQ 각 지수의 T-점수 분포입니다 (각 영역 평균: {mean.toFixed(2)}점). 수직선은 귀하의 점수 위치를 나타냅니다.
        <br />
        <strong style={{ color: "#0066CC" }}>LQ: {tlq.toFixed(1)}점</strong> (상위 {Math.max(0, Math.min(100, 100 - lqPercentile)).toFixed(1)}%) |{" "}
        <strong style={{ color: "#00A878" }}>RQ: {trq.toFixed(1)}점</strong> (상위 {Math.max(0, Math.min(100, 100 - rqPercentile)).toFixed(1)}%) |{" "}
        <strong style={{ color: "#FFA500" }}>CQ: {tcq.toFixed(1)}점</strong> (상위 {Math.max(0, Math.min(100, 100 - cqPercentile)).toFixed(1)}%)
      </p>
      <div css={chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="tScore"
              label={{ value: "T-점수", position: "insideBottom", offset: -5 }}
              domain={xDomain}
              type="number"
              ticks={xTicks}
            />
            <YAxis
              label={{ value: "확률 밀도", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const currentX = payload[0].payload.tScore;
                  const threshold = 1.5; // 수직선 근처 판단 기준

                  // 각 점수와의 거리 계산
                  const distToLQ = Math.abs(currentX - tlq);
                  const distToRQ = Math.abs(currentX - trq);
                  const distToCQ = Math.abs(currentX - tcq);

                  // 가장 가까운 점수 찾기
                  const minDist = Math.min(distToLQ, distToRQ, distToCQ);

                  // 수직선 근처인 경우 해당 점수의 특별 툴팁 표시
                  if (minDist <= threshold) {
                    let color, label, score, percentile;
                    
                    if (minDist === distToLQ) {
                      color = "#0066CC";
                      label = "LQ";
                      score = tlq;
                      percentile = lqPercentile;
                    } else if (minDist === distToRQ) {
                      color = "#00A878";
                      label = "RQ";
                      score = trq;
                      percentile = rqPercentile;
                    } else {
                      color = "#FFA500";
                      label = "CQ";
                      score = tcq;
                      percentile = cqPercentile;
                    }

                    return (
                      <div
                        style={{
                          background: color,
                          color: "white",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                          border: `2px solid ${color}`,
                        }}
                      >
                        <p style={{ margin: 0, fontWeight: "bold", fontSize: "14px" }}>
                          {label}: {score.toFixed(1)}점
                        </p>
                        <p style={{ margin: "4px 0 0 0", fontSize: "12px" }}>
                          상위 {Math.max(0, Math.min(100, 100 - percentile)).toFixed(1)}%
                        </p>
                      </div>
                    );
                  }

                  // 기본 툴팁 (수직선 근처가 아닌 경우)
                  return (
                    <div
                      style={{
                        background: "white",
                        padding: "10px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        border: "1px solid #ddd",
                      }}
                    >
                      <p style={{ margin: 0, fontWeight: "bold" }}>
                        T-점수: {currentX.toFixed(1)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* 정규분포 곡선 */}
            <Area
              type="monotone"
              dataKey="density"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.1}
              name="표준 정규분포"
              strokeWidth={2}
            />

            {/* 평균선 (16.67) - 레이블 제거 */}
            <ReferenceLine
              x={mean}
              stroke="#999"
              strokeDasharray="5 5"
            />

            {/* 학생의 T-점수 위치 표시 - 레이블 제거 */}
            <ReferenceLine
              x={tlq}
              stroke="#0066CC"
              strokeWidth={2.5}
              strokeDasharray="0"
              isFront={true}
            />
            <ReferenceLine
              x={trq}
              stroke="#00A878"
              strokeWidth={2.5}
              strokeDasharray="0"
              isFront={true}
            />
            <ReferenceLine
              x={tcq}
              stroke="#FFA500"
              strokeWidth={2.5}
              strokeDasharray="0"
              isFront={true}
            />
            
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IndividualDistribution;
