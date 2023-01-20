import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="w-screen h-screen grid grid-rows-[4rem_1fr] relative">
      {/* we have to make this overflow-auto
      by doing this children inside this can be have scrolling otherwise none
      */}
      <div className="">
        <NavBar />
      </div>
      <div className="overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
