import React from "react";
import Login from "../components/Login";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-screen h-screen grid xl:grid-cols-2 lg:grid-cols-[1fr_2fr] grid-cols-1 landingpage-bg-container">
      <div className=""></div>
      <div className="flex items-center justify-center">
        <Outlet/>
      </div>
    </div>
  );
};



export default LandingPage;
