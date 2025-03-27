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
        홈 화면(서비스 소개 등등)
      </div>
    </FlexBox>
  );
};

export default Activity;
