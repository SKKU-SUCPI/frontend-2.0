import React from "react";
import { css } from "@emotion/react";
import { use3qTotalAverage } from "@/hooks/admin/use3qAverage";

interface AverageMetricsProps {
  averageLQ: number;
  averageRQ: number;
  averageCQ: number;
  averageTotal: number;
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
}) => {
  const { data: totalAverageData } = use3qTotalAverage();

  const getComparisonText = (currentValue: number, totalValue: number) => {
    const difference = currentValue - totalValue;
    const isPositive = difference >= 0;
    const sign = isPositive ? "+" : "";
    return { text: `${sign}${difference.toFixed(1)}`, isPositive };
  };

  return (
    <div css={containerStyle}>
      <div css={metricBoxStyle}>
        <div css={metricTitleStyle}>LQ 평균</div>
        <div css={metricValueStyle("LQ")}>{averageLQ}</div>
        {totalAverageData && (
          <div css={comparisonStyle(averageLQ >= totalAverageData.lq)}>
            전체 평균 대비{" "}
            <span css={comparisonValueStyle(averageLQ >= totalAverageData.lq)}>
              {getComparisonText(averageLQ, totalAverageData.lq).text}
            </span>
          </div>
        )}
      </div>
      <div css={metricBoxStyle}>
        <div css={metricTitleStyle}>RQ 평균</div>
        <div css={metricValueStyle("RQ")}>{averageRQ}</div>
        {totalAverageData && (
          <div css={comparisonStyle(averageRQ >= totalAverageData.rq)}>
            전체 평균 대비{" "}
            <span css={comparisonValueStyle(averageRQ >= totalAverageData.rq)}>
              {getComparisonText(averageRQ, totalAverageData.rq).text}
            </span>
          </div>
        )}
      </div>
      <div css={metricBoxStyle}>
        <div css={metricTitleStyle}>CQ 평균</div>
        <div css={metricValueStyle("CQ")}>{averageCQ}</div>
        {totalAverageData && (
          <div css={comparisonStyle(averageCQ >= totalAverageData.cq)}>
            전체 평균 대비{" "}
            <span css={comparisonValueStyle(averageCQ >= totalAverageData.cq)}>
              {getComparisonText(averageCQ, totalAverageData.cq).text}
            </span>
          </div>
        )}
      </div>
      <div css={metricBoxStyle}>
        <div css={metricTitleStyle}>Total 평균</div>
        <div css={metricValueStyle()}>{averageTotal}</div>
        {totalAverageData && (
          <div
            css={comparisonStyle(
              averageTotal >=
                totalAverageData.lq + totalAverageData.rq + totalAverageData.cq
            )}
          >
            전체 평균 대비{" "}
            <span
              css={comparisonValueStyle(
                averageTotal >=
                  totalAverageData.lq +
                    totalAverageData.rq +
                    totalAverageData.cq
              )}
            >
              {
                getComparisonText(
                  averageTotal,
                  totalAverageData.lq +
                    totalAverageData.rq +
                    totalAverageData.cq
                ).text
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AverageMetrics;
