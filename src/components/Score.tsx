import FlexBox from "@/styles/components/common/FlexBox";
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
        통계 페이지
      </div>
    </FlexBox>
  );
};

export default Activity;
