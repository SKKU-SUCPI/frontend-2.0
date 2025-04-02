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
        통계 페이지
      </div>
    </FlexBox>
  );
};

export default Activity;
