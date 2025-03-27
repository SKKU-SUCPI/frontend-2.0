import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import Home from "@/pages/home";
import Score from "@/pages/score";
import Activity from "@/pages/activity";
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
