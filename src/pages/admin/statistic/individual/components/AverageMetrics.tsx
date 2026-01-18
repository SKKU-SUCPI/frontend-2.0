import React from "react";
import { css } from "@emotion/react";
import { use3qTotalAverage } from "@/hooks/admin/use3qAverage";

interface AverageMetricsProps {
  averageLQ: number;
  averageRQ: number;
  averageCQ: number;
  averageTotal: number;
  showTScore?: boolean;
}

const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 24px;
`;

const metricBoxStyle = css`
  border: 1px solid #e0e0e0;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  text-align: center;
  border-radius: 12px;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const metricTitleStyle = css`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const metricValueStyle = (category?: "LQ" | "RQ" | "CQ") => css`
  font-size: 2rem;
  font-weight: bold;
  color: ${category === "LQ"
    ? "#0088FE"
    : category === "RQ"
    ? "#00C49F"
    : category === "CQ"
    ? "#FFBB28"
    : "black"};
`;

const metricUnitStyle = css`
  font-size: 0.9rem;
  color: #666;
  margin-top: 4px;
`;

const comparisonStyle = (isPositive: boolean) => css`
  font-size: 0.8rem;
  margin-top: 4px;
  color: #333;
  font-weight: 500;
`;

const comparisonValueStyle = (isPositive: boolean) => css`
  color: ${isPositive ? "#00C49F" : "#FF6B6B"};
  font-weight: bold;
`;

const AverageMetrics: React.FC<AverageMetricsProps> = ({
  averageLQ,
  averageRQ,
  averageCQ,
  averageTotal,
  showTScore = false,
}) => {
  const { data: totalAverageData } = use3qTotalAverage();

  const formatValue = (value: number) =>
    showTScore ? (Math.round(value * 100) / 100).toFixed(2) : value;

  const getComparisonText = (
    currentValue: number,
    baselineValue: number
  ) => {
    const difference = currentValue - baselineValue;
    const isPositive = difference >= 0;
    const sign = isPositive ? "+" : "";
    return { text: `${sign}${difference.toFixed(1)}`, isPositive };
  };

  const tScoreBaseline = {
    lq: 50 / 3,
    rq: 50 / 3,
    cq: 50 / 3,
    total: 50,
  };

  const getBaseline = (key: "lq" | "rq" | "cq" | "total") => {
    if (showTScore) {
      return tScoreBaseline[key];
    }

    if (!totalAverageData) return null;

    if (key === "total") {
      return (
        totalAverageData.lq +
        totalAverageData.rq +
        totalAverageData.cq
      );
    }

    return totalAverageData[key];
  };

  return (
    <div css={containerStyle}>
      <div css={metricBoxStyle}>
        <div css={metricTitleStyle}>LQ 평균</div>
        <div css={metricValueStyle("LQ")}>{formatValue(averageLQ)}</div>
        {(() => {
          const baseline = getBaseline("lq");
          if (baseline === null) return null;
          const isPositive = averageLQ >= baseline;
          return (
            <div css={comparisonStyle(isPositive)}>
              전체 평균 대비{" "}
              <span css={comparisonValueStyle(isPositive)}>
                {getComparisonText(averageLQ, baseline).text}
              </span>
            </div>
          );
        })()}
      </div>
      <div css={metricBoxStyle}>
        <div css={metricTitleStyle}>RQ 평균</div>
        <div css={metricValueStyle("RQ")}>{formatValue(averageRQ)}</div>
        {(() => {
          const baseline = getBaseline("rq");
          if (baseline === null) return null;
          const isPositive = averageRQ >= baseline;
          return (
            <div css={comparisonStyle(isPositive)}>
              전체 평균 대비{" "}
              <span css={comparisonValueStyle(isPositive)}>
                {getComparisonText(averageRQ, baseline).text}
              </span>
            </div>
          );
        })()}
      </div>
      <div css={metricBoxStyle}>
        <div css={metricTitleStyle}>CQ 평균</div>
        <div css={metricValueStyle("CQ")}>{formatValue(averageCQ)}</div>
        {(() => {
          const baseline = getBaseline("cq");
          if (baseline === null) return null;
          const isPositive = averageCQ >= baseline;
          return (
            <div css={comparisonStyle(isPositive)}>
              전체 평균 대비{" "}
              <span css={comparisonValueStyle(isPositive)}>
                {getComparisonText(averageCQ, baseline).text}
              </span>
            </div>
          );
        })()}
      </div>
      <div css={metricBoxStyle}>
        <div css={metricTitleStyle}>Total 평균</div>
        <div css={metricValueStyle()}>{formatValue(averageTotal)}</div>
        {(() => {
          const baseline = getBaseline("total");
          if (baseline === null) return null;
          const isPositive = averageTotal >= baseline;
          return (
            <div css={comparisonStyle(isPositive)}>
              전체 평균 대비{" "}
              <span css={comparisonValueStyle(isPositive)}>
                {getComparisonText(averageTotal, baseline).text}
              </span>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default AverageMetrics;
