import FlexBox from "@/styles/components/Flexbox";
import { css } from "@emotion/react";
import React from "react";

const Activity: React.FC = () => {
  return (
    <FlexBox>
      {" "}
      <div
        css={css`
          color: black;
          font-size: 24px;
        `}
      >
        홈 화면(서비스 소개 등등)
      </div>
    </FlexBox>
  );
};

export default Activity;
