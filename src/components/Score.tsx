import { css } from "@emotion/react";
import React from "react";

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Score: React.FC = () => {
  return (
    <div css={wrapperStyle}>
      <div
        css={css`
          color: black;
          font-size: 24px;
        `}
      >
        통계 페이지
      </div>
    </div>
  );
};

export default Score;
