/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NavLink, useNavigate } from "react-router-dom";
import useNavigationStore from "@/stores/navigationStore";
import { Switch, Menu, MenuItem, IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import FlexBox from "@/styles/components/Flexbox";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import getLogout from "@/apis/auth/getLogout";
import useAuthStore from "@/stores/auth/authStore";
const navBarStyle = css`
  /* 전체 상단 바 영역 */
  height: 64px;
  border-bottom: 1px solid #eaeaea;
  background-color: #fff;
`;

const navBarInnerStyle = css`
  max-width: 1200px;
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

const studentRoute = [
  { path: "/student/dashboard", label: "대시보드" },
  { path: "/student/activity", label: "활동 내역" },
];

const adminRouteMap = {
  // 관리자 라우트
  admin: [
    [
      { path: "/god/statistic/dashboard", label: "대시보드" },
      { path: "/god/statistic/individual", label: "개인별 통계" },
    ],
    [
      { path: "/god/activity/dashboard", label: "대시보드" },
      { path: "/god/activity/list", label: "활동 목록" },
    ],
  ],
  // 슈퍼 관리자 라우트
  "super-admin": [
    [
      { path: "/superGod/statistic/dashboard", label: "대시보드" },
      { path: "/superGod/statistic/individual", label: "개인별 통계" },
      { path: "/superGod/statistic/parameter", label: "파라미터 설정" },
    ],
    [
      { path: "/superGod/activity/dashboard", label: "대시보드" },
      { path: "/superGod/activity/list", label: "활동 목록" },
    ],
  ],
};

const NavBar: React.FC = () => {
  const { selectedTab, toggleTab } = useNavigationStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { userProfile } = useAuthStore();

  const handleToggle = () => {
    toggleTab();
    const basePath = userProfile?.role === "super-admin" ? "/superGod" : "/god";
    navigate(
      selectedTab === "statistic"
        ? `${basePath}/activity/dashboard`
        : `${basePath}/statistic/dashboard`
    );
  };

  const handleLogout = async () => {
    try {
      await getLogout();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
    setAnchorEl(null);
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
            SUCPI
          </FlexBox>

          {/* 통계 / 활동 토글 부분 */}
          {userProfile?.role !== "student" && (
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
                  fontWeight: selectedTab === "statistic" ? "bold" : "normal",
                }}
              >
                통계
              </Typography>
              <Switch
                checked={selectedTab === "activity"}
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
                  fontWeight: selectedTab === "activity" ? "bold" : "normal",
                }}
              >
                활동
              </Typography>
            </FlexBox>
          )}
        </FlexBox>

        {/* 네비게이션 메뉴 부분 */}
        <FlexBox as="nav" align="center" gap="32px">
          {/* 학생 라우트 */}
          {userProfile?.role === "student" && (
            <>
              {studentRoute.map((item) => (
                <NavLink key={item.path} to={item.path} css={linkStyle}>
                  {item.label}
                </NavLink>
              ))}
            </>
          )}
          {/* 관리자 라우트 */}
          {(userProfile?.role === "admin" ||
            userProfile?.role === "super-admin") &&
            (() => {
              const roleRoute = adminRouteMap[userProfile?.role];
              const selectedRoute =
                roleRoute[selectedTab === "statistic" ? 0 : 1];
              return (
                <>
                  {selectedRoute.map((item) => (
                    <NavLink key={item.path} to={item.path} css={linkStyle}>
                      {item.label}
                    </NavLink>
                  ))}
                </>
              );
            })()}
        </FlexBox>

        {/* 프로필 부분 */}
        <FlexBox justify="flex-end" gap="16px">
          <span>{userProfile?.studentId}</span>
          <span>{userProfile?.name}</span>
          <span>
            {userProfile?.role === null
              ? "로그인전"
              : userProfile?.role === "student"
              ? "학생"
              : userProfile?.role === "admin"
              ? "관리자"
              : "슈퍼관리자"}
          </span>
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="small"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
          </Menu>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default NavBar;
