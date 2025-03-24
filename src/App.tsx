import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/components/Home";
import Score from "@/components/Score";
import Activity from "@/components/Activity";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";

// TODO
// 라우팅 경로 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/score", element: <Score /> },
      { path: "/activity", element: <Activity /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </EmotionThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
