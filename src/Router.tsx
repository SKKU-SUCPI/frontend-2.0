import { createBrowserRouter, Navigate } from "react-router-dom";

import NotFound from "@/pages/NotFound";
import Home from "@/pages/home";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MainLayout from "@/components/layouts/MainLayout";

// student
import StudentDashboard from "@/pages/student/dashboard";
import StudentActivityList from "@/pages/student/activity";
import StudentActivitySubmit from "@/pages/student/activity/submit";
import StudentActivityView from "@/pages/student/activity/view";

// admin
import AdminActivityList from "@/pages/admin/activiy/list";
import AdminActivityDashboard from "@/pages/admin/activiy/dashboard";
import AdminStatisticDashboard from "@/pages/admin/statistic/dashboard";
import AdminStatisticIndividual from "@/pages/admin/statistic/individual";

// superAdmin
import SuperAdminParameter from "@/pages/superAdmin";

// 임시 로그인
import Login from "@/pages/auth/Login";

const Router = createBrowserRouter([
  // Public root (홈페이지)
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["student", "admin", "super-admin"]} />
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  // Student routes
  {
    path: "/student",
    element: <ProtectedRoute allowedRoles={["student"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/student/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <StudentDashboard />,
          },
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
    ],
  },

  // Admin routes
  {
    path: "/god",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/god/statistic/dashboard" />,
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
              { path: "dashboard", element: <AdminActivityDashboard /> },
              {
                path: "list",
                element: <AdminActivityList />,
              },
            ],
          },
        ],
      },
    ],
  },

  // Super Admin routes
  {
    path: "/superGod",
    element: <ProtectedRoute allowedRoles={["super-admin"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/superGod/statistic/dashboard" />,
          },
          {
            path: "statistic",
            children: [
              { path: "dashboard", element: <AdminStatisticDashboard /> },
              { path: "individual", element: <AdminStatisticIndividual /> },
              { path: "parameter", element: <SuperAdminParameter /> },
            ],
          },
          {
            path: "activity",
            children: [
              { path: "dashboard", element: <AdminActivityDashboard /> },
              {
                path: "list",
                element: <AdminActivityList />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    // 개발용 로그인 창
    path: "/test/login",
    element: <Login />,
  },
  // Catch-all for 404
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
