/**
 * 정규분포 확률밀도함수(PDF) 계산
 * @param x - 계산할 x 값
 * @param mean - 평균 (μ)
 * @param stdDev - 표준편차 (σ)
 * @returns 확률밀도 값
 */
export const normalPDF = (x: number, mean: number, stdDev: number): number => {
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
  return coefficient * Math.exp(exponent);
};

/**
 * 정규분포 곡선 데이터 생성
 * @param mean - 평균
 * @param stdDev - 표준편차
 * @param points - 생성할 데이터 포인트 개수
 * @param range - 평균으로부터의 표준편차 범위
 * @returns {x, y}[] 형태의 데이터 배열
 */
export const generateNormalDistributionData = (
  mean: number = 50,
  stdDev: number = 10,
  points: number = 100,
  range: number = 4
): { x: number; y: number }[] => {
  const start = mean - range * stdDev;
  const end = mean + range * stdDev;
  const step = (end - start) / points;

  const data: { x: number; y: number }[] = [];
  for (let i = 0; i <= points; i++) {
    const x = start + i * step;
    const y = normalPDF(x, mean, stdDev);
    data.push({ x: Math.round(x * 100) / 100, y: Math.round(y * 10000) / 10000 });
  }

  return data;
};

/**
 * T-점수를 백분위로 변환 (근사값)
 * @param tScore - T-점수
 * @returns 백분위 (0-100)
 */
export const tScoreToPercentile = (tScore: number): number => {
  // Z-score 계산 (T-score = 50 + 10*Z)
  const z = (tScore - 50) / 10;
  
  // 누적분포함수(CDF) 근사 계산 (Zelen & Severo 근사)
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const probability =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));

  const percentile = z >= 0 ? (1 - probability) * 100 : probability * 100;
  return Math.round(percentile * 100) / 100;
};

