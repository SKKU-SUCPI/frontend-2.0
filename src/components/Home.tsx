import { css } from "@emotion/react";
import React from "react";

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Home: React.FC = () => {
  return (
    <div css={wrapperStyle}>
      <div
        css={css`
          color: black;
          font-size: 24px;
        `}
      >
        홈 페이지 (SCUPI 서비스 소개?)
      </div>
    </div>
  );
};

export default Home;
