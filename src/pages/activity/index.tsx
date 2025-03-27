import FlexBox from "@/styles/common/FlexBox";
import { css, useTheme } from "@emotion/react";
import React from "react";

const Activity: React.FC = () => {
  const theme = useTheme();
  return (
    <FlexBox
      css={css`
        ${theme.mixins.widthHeight()}
      `}
    >
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
