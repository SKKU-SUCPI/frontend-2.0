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

interface TotalDistributionProps {
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

const scoreBoxStyle = css`
  display: inline-block;
  background: #f8f9fa;
  color: #333;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  border: 2px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TotalDistribution: React.FC<TotalDistributionProps> = ({
  tlq,
  trq,
  tcq,
}) => {
  // 총 T-점수 계산
  const totalTScore = tlq + trq + tcq;

  // T-점수 총합: 평균 50 (3개 영역 합), 표준편차 약 17.32 (√(10²+10²+10²))
  const mean = 50;
  const stdDev = Math.sqrt(10 * 10 + 10 * 10 + 10 * 10); // ≈ 17.32

  // 0부터 평균의 2배까지 표시하므로 range를 조정 (약 ±2.89σ)
  const normalData = generateNormalDistributionData(mean, stdDev, 150, 3);

  // Recharts용 데이터 변환
  const chartData = normalData.map((point) => ({
    tScore: point.x,
    density: point.y,
  }));

  // X축 범위: 0부터 평균의 2배까지
  const xDomain = [0, mean * 2];  // 0 ~ 100
  
  // X축 tick 설정 (10 단위)
  const xTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  // 백분위 계산 (Z-score 기반)
  const zScore = (totalTScore - mean) / stdDev;
  const calculatePercentile = (z: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    const probability =
      d *
      t *
      (0.3193815 +
        t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z >= 0 ? (1 - probability) * 100 : probability * 100;
  };
  const percentile = calculatePercentile(zScore);

  // 표준편차 구간 표시
  const getScoreLevel = (score: number): string => {
    if (score >= mean + 2 * stdDev) return "매우 우수 (상위 2.3%)";
    if (score >= mean + stdDev) return "우수 (상위 16%)";
    if (score >= mean) return "평균 이상";
    if (score >= mean - stdDev) return "평균";
    if (score >= mean - 2 * stdDev) return "개선 필요 (하위 16%)";
    return "많은 노력 필요 (하위 2.3%)";
  };

  const scoreLevel = getScoreLevel(totalTScore);

  return (
    <div>
      <h3 css={titleStyle}>총 3Q 점수 분포</h3>
      <p css={descriptionStyle}>
        LQ + RQ + CQ를 합한 총 T-점수의 분포입니다 (평균: {mean}점). 전체 학생 중 귀하의 위치를 확인할 수 있습니다.
      </p>
      <div css={scoreBoxStyle}>
        총 T-점수: {totalTScore.toFixed(1)}점 | 상위 {(100 - percentile).toFixed(1)}% | {scoreLevel}
      </div>
      <div css={chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 60,
              right: 30,
              left: 10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#764ba2" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="tScore"
              label={{ value: "총 T-점수", position: "insideBottom", offset: -5 }}
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
                  const score = payload[0].payload.tScore;
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
                        총 T-점수: {score.toFixed(1)}
                      </p>
                      <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem" }}>
                        {getScoreLevel(score)}
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
              stroke="#667eea"
              fill="url(#colorTotal)"
              name="전체 학생 분포"
              strokeWidth={2}
            />

            {/* 평균선 - 위쪽에 배치 */}
            <ReferenceLine
              x={mean}
              stroke="#999"
              strokeDasharray="5 5"
              label={{
                value: `평균: ${mean.toFixed(0)}`,
                position: "top",
                fill: "#999",
                fontSize: 12,
                offset: 30,
              }}
            />

            {/* 학생의 총 T-점수 위치 - 그래프 위쪽에 배치 */}
            <ReferenceLine
              x={totalTScore}
              stroke="#ff4757"
              strokeWidth={2.5}
              strokeDasharray="0"
              label={{
                value: `내 점수: ${totalTScore.toFixed(1)}`,
                position: "top",
                fill: "#ff4757",
                fontWeight: "bold",
                fontSize: 13,
                offset: 10,
              }}
              isFront={true}
            />
            
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: "20px" }}
            />

            {/* ±1σ, ±2σ 구간 표시 */}
            <ReferenceLine
              x={mean - stdDev}
              stroke="#ddd"
              strokeDasharray="3 3"
            />
            <ReferenceLine
              x={mean + stdDev}
              stroke="#ddd"
              strokeDasharray="3 3"
            />
            <ReferenceLine
              x={mean - 2 * stdDev}
              stroke="#eee"
              strokeDasharray="3 3"
            />
            <ReferenceLine
              x={mean + 2 * stdDev}
              stroke="#eee"
              strokeDasharray="3 3"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalDistribution;

