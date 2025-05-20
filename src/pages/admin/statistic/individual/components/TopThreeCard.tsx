/** @jsxImportSource @emotion/react */
import Card from "@/styles/components/Card";
import FlexBox from "@/styles/components/Flexbox";
import { css } from "@emotion/react";

interface RankItem {
  name: string;
  score: number;
}

interface ScoreTop3CardProps {
  category: string; // 예: "LQ"
  description: string; // 예: "Learning Quality"
  top3: RankItem[]; // [ { name: "김민석", score: 26 }, ... ]
}

const titleStyle = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const descriptionStyle = css`
  font-size: 16px;
  font-weight: 500;
  color: #777;
`;

const nameStyle = css`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

// 1등 하이라이트 (폰트 크기와 굵기만)
const highlightStyle = css`
  font-size: 22px;
  font-weight: 700;
`;

const ScoreTop3Card: React.FC<ScoreTop3CardProps> = ({
  category,
  description,
  top3,
}) => {
  // 가장 높은 점수 찾기
  const maxScore = Math.max(...top3.map((item) => item.score));

  return (
    <Card width="100%">
      <FlexBox direction="column" gap="10px">
        {/* 상단 타이틀 */}
        <FlexBox justify="flex-start" gap="10px">
          <div css={titleStyle}>{category}</div>
          <div css={descriptionStyle}>{description}</div>
        </FlexBox>
        {/* 하단 Top3 나열 */}
        {top3.map((item, idx) => {
          const isHighest = item.score === maxScore;
          return (
            <FlexBox key={idx} justify="space-between">
              <span css={[nameStyle, isHighest && highlightStyle]}>
                {item.name}
              </span>
              <span css={[nameStyle, isHighest && highlightStyle]}>
                {item.score}점
              </span>
            </FlexBox>
          );
        })}
      </FlexBox>
    </Card>
  );
};

export default ScoreTop3Card;
