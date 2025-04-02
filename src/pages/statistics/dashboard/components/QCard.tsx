/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Card from "@/styles/components/Card";
import FlexBox from "@/styles/components/Flexbox";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const Description = styled.p`
  color: #666;
  margin: 0;
  font-size: 1rem;
`;

const ScoreText = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

interface QCardProps {
  name: string;
  description: string;
  score: number;
}

const QCard = ({ name, description, score }: QCardProps) => {
  const data = [{ value: score }, { value: 33 - score }];

  const size = 80;
  const chartProps = {
    cx: size,
    cy: size,
    startAngle: 180,
    endAngle: 0,
    innerRadius: size * 0.85,
    outerRadius: size,
  };

  return (
    <Card
      css={css`
        padding: 24px;
        width: 100%;
      `}
    >
      <FlexBox direction="column" gap="24px">
        {/* 제목과 설명 */}
        <FlexBox align="center" justify="flex-start" gap="16px">
          <Title>{name}</Title>
          <Description>{description}</Description>
        </FlexBox>
        {/* 차트와 점수 표시 */}
        <FlexBox justify="flex-start" align="center" gap="32px">
          <div
            css={css`
              position: relative;
              width: ${size * 2}px;
              height: ${size}px;
            `}
          >
            <PieChart width={size * 3} height={size}>
              <Pie data={data} dataKey="value" {...chartProps}>
                <Cell fill="#000000" />
                <Cell fill="#E0E0E0" />
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    return (
                      <div
                        css={css`
                          background: white;
                          padding: 4px 8px;
                          border-radius: 4px;
                          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        `}
                      >
                        {score}점 / 33점
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </div>

          {/* 점수 표시 */}
          <ScoreText>{score} / 33점</ScoreText>
        </FlexBox>
      </FlexBox>
    </Card>
  );
};

export default QCard;
