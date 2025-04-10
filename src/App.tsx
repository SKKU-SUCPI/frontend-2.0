import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";

import MainLayout from "@/components/layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import StudentDashboard from "@/pages/student/dashboard";
import StudentActivityList from "@/pages/student/activity";
import StudentActivityView from "./pages/student/activity/view";
import StudentActivitySubmit from "./pages/student/activity/submit";

import AdminStatisticDashboard from "@/pages/admin/statistic/dashboard";
import AdminStatisticIndividual from "@/pages/admin/statistic/individual";
import AdminActivityDashboard from "@/pages/admin/activiy/dashboard";
import AdminActivityList from "@/pages/admin/activiy/list";
import AdminActivityView from "@/pages/admin/activiy/list/view";
import AdminActivityReview from "@/pages/admin/activiy/list/review";

import SuperAdminParameter from "./pages/superAdmin";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      // 학생용 라우팅
      {
        path: "student",
        element: <ProtectedRoute allowedRoles={[0]} />, // 학생만 접근 가능
        children: [
          { path: "", element: <Navigate to="/student/dashboard" replace /> },
          { path: "dashboard", element: <StudentDashboard /> },
          {
            path: "activity",
            element: <StudentActivityList />,
            children: [
              { path: "submit", element: <StudentActivitySubmit /> },
              { path: "view/:id", element: <StudentActivityView /> },
            ],
          },
        ],
      },
      // 관리자용 라우팅
      {
        path: "admin",
        element: <ProtectedRoute allowedRoles={[1, 2]} />, // 관리자, 슈퍼관리자 접근 가능
        children: [
          {
            path: "",
            element: <Navigate to="/admin/statistic/dashboard" replace />,
          },
          {
            path: "statistic",
            children: [
              { path: "dashboard", element: <AdminStatisticDashboard /> },
              { path: "individual", element: <AdminStatisticIndividual /> },
            ],
          },
          {
            path: "activity",
            children: [
              { path: "", element: <AdminActivityDashboard /> },
              { path: "dashboard", element: <AdminActivityDashboard /> },
              {
                path: "list",
                element: <AdminActivityList />,
                children: [
                  { path: "view/:id", element: <AdminActivityView /> },
                  { path: "review/:id", element: <AdminActivityReview /> },
                ],
              },
            ],
          },
        ],
      },
      // 슈퍼관리자
      {
        path: "super",
        element: <ProtectedRoute allowedRoles={[2]} />,
        children: [{ path: "", element: <SuperAdminParameter /> }],
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
