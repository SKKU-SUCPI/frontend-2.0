/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NavLink, useNavigate } from "react-router-dom";
import useNavigationStore from "@/stores/navigationStore";
import { Switch, Menu, MenuItem, IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import FlexBox from "@/styles/components/Flexbox";
import useUserStore from "@/stores/auth/userStore";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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

const adminRoute = [
  [
    { path: "/admin/statistic/dashboard", label: "대시보드" },
    { path: "/admin/statistic/individual", label: "개인별 통계" },
  ],
  [
    { path: "/admin/activity/dashboard", label: "대시보드" },
    { path: "/admin/activity/list", label: "활동 목록" },
  ],
];

const superAdminRoute = [
  [
    { path: "/admin/statistic/dashboard", label: "대시보드" },
    { path: "/admin/statistic/individual", label: "개인별 통계" },
    { path: "/admin/statistic/parameter", label: "파라미터 설정" },
  ],
  [
    { path: "/admin/activity/dashboard", label: "대시보드" },
    { path: "/admin/activity/list", label: "활동 목록" },
  ],
];

const NavBar: React.FC = () => {
  const { selectedTab, toggleTab } = useNavigationStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // 테스트용 코드
  const { user_hakbun, user_name, user_role, setUser, clearUser } =
    useUserStore();

  // 토글 시 자동으로 default 페이지로 이동
  const handleToggle = () => {
    toggleTab();
    navigate(
      selectedTab === "statistic"
        ? "admin/activity/dashboard"
        : "admin/statistic/dashboard"
    );
  };

  const handleLogin = () => {
    setUser({
      user_id: 1,
      user_role: 0,
      user_name: "홍길동",
      user_hakbun: "2020123456",
      user_hakgwa_cd: "CS",
      user_year: 2020,
    });
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearUser();
    setAnchorEl(null);
  };

  console.log(`user_role: ${user_role}`);
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
          {user_role !== 0 && (
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
          {user_role === 0 && (
            <>
              {studentRoute.map((item) => (
                <NavLink key={item.path} to={item.path} css={linkStyle}>
                  {item.label}
                </NavLink>
              ))}
            </>
          )}
          {user_role === 1 && (
            <>
              {selectedTab === "statistic" ? (
                <>
                  {adminRoute[0].map((item) => (
                    <NavLink key={item.path} to={item.path} css={linkStyle}>
                      {item.label}
                    </NavLink>
                  ))}
                </>
              ) : (
                <>
                  {adminRoute[1].map((item) => (
                    <NavLink key={item.path} to={item.path} css={linkStyle}>
                      {item.label}
                    </NavLink>
                  ))}
                </>
              )}
            </>
          )}
          {user_role === 2 && (
            <>
              {selectedTab === "statistic" ? (
                <>
                  {superAdminRoute[0].map((item) => (
                    <NavLink key={item.path} to={item.path} css={linkStyle}>
                      {item.label}
                    </NavLink>
                  ))}
                </>
              ) : (
                <>
                  {superAdminRoute[1].map((item) => (
                    <NavLink key={item.path} to={item.path} css={linkStyle}>
                      {item.label}
                    </NavLink>
                  ))}
                </>
              )}
            </>
          )}
        </FlexBox>

        {/* 프로필 부분 */}
        <FlexBox justify="flex-end" gap="16px">
          <span>{user_hakbun}</span>
          <span>{user_name}</span>
          <span>
            {user_role === null
              ? "로그인전"
              : user_role === 0
              ? "학생"
              : user_role === 1
              ? "관리자"
              : "슈퍼관리자"}
          </span>
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="small"
          >
            <AccountCircleIcon />
          </IconButton>
          {/* 테스트용 코드 */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {[
              { role: 0 as const, label: "학생" },
              { role: 1 as const, label: "관리자" },
              { role: 2 as const, label: "슈퍼 관리자" },
            ].map(({ role, label }) => (
              <MenuItem
                key={role}
                onClick={() => {
                  setUser({
                    user_id: 1,
                    user_role: role,
                    user_name: "홍길동",
                    user_hakbun: "2020123456",
                    user_hakgwa_cd: "CS",
                    user_year: 2020,
                  });
                  setAnchorEl(null);
                }}
                selected={user_role === role}
              >
                {label}
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogin}>로그인</MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
          </Menu>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default NavBar;
