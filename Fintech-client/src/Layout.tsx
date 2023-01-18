import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="w-screen h-screen grid grid-rows-[4rem_1fr]">
      <div className="">
        <NavBar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
