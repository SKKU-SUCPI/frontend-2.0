import React from "react";
import { css } from "@emotion/react";

const NotFound: React.FC = () => {
  return (
    <div
      css={css`
        padding: 20px;
      `}
    >
      <h1>Not Found</h1>
    </div>
  );
};

export default NotFound;
