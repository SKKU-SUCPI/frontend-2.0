/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { IconButton, Typography, Paper } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FlexBox from "@/styles/components/common/FlexBox";

const topBarStyle = css`
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  z-index: 100;
`;

const userInfoWrapperStyle = css`
  margin: 0 30px;
  gap: 16px;
`;

const userInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

// data
const data = {
  user_role: "student",
  user_name: "강병희",
  user_hakbun: "2020123456",
  user_hakbun_cd: "CS201",
  user_year: "2",
};

const TopBar: React.FC = () => {
  return (
    <Paper elevation={1} css={topBarStyle}>
      <FlexBox css={userInfoWrapperStyle}>
        <div css={userInfoStyle}>
          <Typography variant="body1" fontWeight="bold">
            {data.user_name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data.user_hakbun}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data.user_hakbun_cd}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data.user_role}
          </Typography>
        </div>
        <IconButton
          css={css`
            color: green;
          `}
        >
          <LogoutIcon />
        </IconButton>
      </FlexBox>
    </Paper>
  );
};

export default TopBar;
