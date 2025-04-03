import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";

// Pages
import StatisticsDashboard from "@/pages/statistics/dashboard";
import StatisticsGroup from "@/pages/statistics/group";
import StatisticsIndividual from "@/pages/statistics/individual";
import ActivitiesDashboard from "@/pages/activities/dashboard";
import ActivitiesSubmit from "@/pages/activities/submit";
import MainLayout from "@/components/layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "statistics",
        children: [
          { path: "", element: <StatisticsDashboard /> },
          { path: "dashboard", element: <StatisticsDashboard /> },
          { path: "group", element: <StatisticsGroup /> },
          { path: "individual", element: <StatisticsIndividual /> },
        ],
      },
      {
        path: "activities",
        children: [
          { path: "", element: <ActivitiesDashboard /> },
          { path: "dashboard", element: <ActivitiesDashboard /> },
          { path: "submit", element: <ActivitiesSubmit /> },
        ],
      },
      {
        path: "",
        element: <StatisticsDashboard />,
      },
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
