import { css } from "@emotion/react";
import React from "react";

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Activity: React.FC = () => {
  return (
    <div css={wrapperStyle}>
      <div
        css={css`
          color: black;
          font-size: 24px;
        `}
      >
        활동 페이지 (활동 제출, 활동 승인/거부)
      </div>
    </div>
  );
};

export default Activity;
