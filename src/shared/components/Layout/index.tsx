import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#212121]">
      <Outlet />
    </div>
  );
};

export default Layout;
