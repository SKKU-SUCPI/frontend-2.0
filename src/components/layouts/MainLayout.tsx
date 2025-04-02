/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";
import NavBar from "@/components/layouts/NavBar";

const MainLayout: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
