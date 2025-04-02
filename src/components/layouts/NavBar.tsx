/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NavLink, useNavigate } from "react-router-dom";
import useNavigationStore from "@/stores/navigationStore";
import { Switch } from "@mui/material";
import { Typography } from "@mui/material";
import FlexBox from "@/styles/components/Flexbox";

const navBarStyle = css`
  /* 전체 상단 바 영역 */
  height: 64px;
  border-bottom: 1px solid #eaeaea;
  background-color: #fff;
`;

const navBarInnerStyle = css`
  /* 내부 컨테이너: 가운데 정렬, 좌우 여백 등 */
  max-width: 1200px; /* 원하는 너비로 조절 */
`;

const logoStyle = css`
  font-size: 30px;
  font-weight: bold;
  color: green;
`;

const linkStyle = css`
  color: #333;
  text-decoration: none;
  position: relative;

  &:hover {
    font-weight: 600;
  }

  &.active {
    color: #000;
    font-weight: 600;

    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #4caf50;
    }
  }
`;

const NavBar: React.FC = () => {
  const { selectedTab, toggleTab } = useNavigationStore();
  const navigate = useNavigate();

  // 토글 시 자동으로 default 페이지로 이동
  const handleToggle = () => {
    toggleTab();
    navigate(
      selectedTab === "statistics"
        ? "/activities/dashboard"
        : "/statistics/dashboard"
    );
  };

  return (
    <FlexBox css={navBarStyle}>
      <FlexBox align="center" justify="space-between" css={navBarInnerStyle}>
        {/* 로고 + 토글*/}
        <FlexBox align="center" gap="30px">
          {/* 로고 부분 */}
          <FlexBox
            align="center"
            justify="flex-start"
            gap="8px"
            css={logoStyle}
          >
            SCUPI
          </FlexBox>

          {/* 통계 / 활동 토글 부분 */}
          <FlexBox
            align="center"
            justify="flex-start"
            gap="8px"
            css={css`
              margin-left: 16px;
            `}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: selectedTab === "statistics" ? "bold" : "normal",
              }}
            >
              통계
            </Typography>
            <Switch
              checked={selectedTab === "activities"}
              onChange={handleToggle}
              color="primary"
              size="small"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#4CAF50",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#bbdefb",
                },
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontWeight: selectedTab === "activities" ? "bold" : "normal",
              }}
            >
              활동
            </Typography>
          </FlexBox>
        </FlexBox>

        {/* 네비게이션 메뉴 부분 */}
        <FlexBox as="nav" align="center" gap="24px">
          {selectedTab === "statistics" ? (
            <>
              {[
                { path: "/statistics/dashboard", label: "대시보드" },
                { path: "/statistics/group", label: "단체별 비교" },
                { path: "/statistics/individual", label: "개인별 비교" },
              ].map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  css={linkStyle}
                >
                  {item.label}
                </NavLink>
              ))}
            </>
          ) : (
            <>
              {[
                { path: "/activities/dashboard", label: "대시보드" },
                { path: "/activities/submit", label: "활동 제출" },
              ].map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  css={linkStyle}
                >
                  {item.label}
                </NavLink>
              ))}
            </>
          )}
        </FlexBox>

        {/* 프로필 부분 */}
        <FlexBox justify="flex-end" gap="16px">
          <span>2020123456</span>
          <span>홍길동</span>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default NavBar;
