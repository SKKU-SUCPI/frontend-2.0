import React from "react";
import { css } from "@emotion/react";
import ActivityMainContentSubmit from "./ActivityMainContentSubmit";

const containerStyle = css`
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 8px;
  padding: 28px 36px 32px 36px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

const ActivitySubmitForm: React.FC = () => {
  return (
    <div css={containerStyle}>
      <ActivityMainContentSubmit />
    </div>
  );
};

export default ActivitySubmitForm;
