import { css, useTheme } from "@emotion/react";
import React from "react";
import FlexBox from "@/styles/components/Flexbox";

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
        활동 페이지 (활동 제출, 활동 승인/거부)
      </div>
    </FlexBox>
  );
};

export default Activity;
