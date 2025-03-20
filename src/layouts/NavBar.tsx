/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  EmojiEvents as ActivityIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

// Emotion CSS

const sidebarStyle = css`
  width: 250px;
  height: 100%;
  background-color: #f4f4f4;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const logoStyle = css`
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: green;
`;

const menuContainerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 8px;
  justify-content: space-between;
`;

const listItemStyle = css`
  color: black;
  padding: 10px 16px;
  border-radius: 16px;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: rgba(0, 128, 0, 0.1);
  }
`;

const iconStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out;
`;

const textStyle = css`
  padding: 5px 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;
`;

// 메뉴 배열
const menuMainItems = [
  { title: "Home", icon: <HomeIcon />, path: "/" },
  { title: "Score", icon: <DashboardIcon />, path: "/score" },
  { title: "Activity", icon: <ActivityIcon />, path: "/activity" },
];

const menuSubItems = [
  { title: "Settings", icon: <SettingsIcon />, path: "/settings" },
  { title: "about", icon: <InfoIcon />, path: "/about" },
];

// NavBar 컴포넌트
const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      css={sidebarStyle}
      sx={{
        "& .MuiDrawer-paper": {
          width: 250,
          padding: "8px",
          height: "100vh",
          backgroundColor: "#f4f4f4",
          color: "black",
          borderRight: "none",
          boxShadow: "none",
        },
      }}
    >
      <Typography css={logoStyle}>SKKU SCUPI</Typography>
      {/* 일반 메뉴 */}
      <div css={menuContainerStyle}>
        <List>
          {menuMainItems.map(({ title, icon, path }) => (
            <ListItem
              button
              key={title}
              onClick={() => navigate(path)}
              css={listItemStyle}
            >
              <span css={iconStyle}>{icon}</span>
              <span css={textStyle}>
                <ListItemText primary={title} />
              </span>
            </ListItem>
          ))}
        </List>
        {/* 추가 메뉴 */}
        <List>
          {menuSubItems.map(({ title, icon, path }) => (
            <ListItem
              button
              key={title}
              onClick={() => navigate(path)}
              css={listItemStyle}
            >
              <span css={iconStyle}>{icon}</span>
              <span css={textStyle}>
                <ListItemText primary={title} />
              </span>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default NavBar;
