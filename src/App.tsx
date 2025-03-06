import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/components/Home";

// TODO
// 라우팅 경로 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
