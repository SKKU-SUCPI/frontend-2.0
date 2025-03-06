import { css } from "@emotion/react";
import React from "react";

const Home: React.FC = () => {
  return (
    <div
      css={css`
        color: #333;
      `}
    >
      홈 페이지입니다!
    </div>
  );
};

export default Home;
