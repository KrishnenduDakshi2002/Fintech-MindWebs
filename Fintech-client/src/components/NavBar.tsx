import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
const NavBar = () => {
  const path = useLocation().pathname.split("/")[2];
  const [authToken, setauthToken] = useState(localStorage.getItem("authToken"));
  const [ToggleMenu, setToggleMenu] = useState(false);
  function logout() {
    localStorage.removeItem("authToken");
    setauthToken(null);
  }

  if (authToken == null) {
    return <Navigate to={"/login"} />;
  }
  return (
    <header className="relative">
      <div className="h-full bg-white flex items-center justify-between relative z-20">
        <div className="h-full flex items-center">
          <div className=" md:ml-10 ml-5 flex-center-center">
            <button
              onClick={() => setToggleMenu((prev) => !prev)}
              className="md:hidden block p-2 mr-2 cursor-pointer"
            >
              <RxHamburgerMenu size={30} />
            </button>
            <img src={Logo} className="w-[6rem] pb-2" />
          </div>
          <div className="md:block hidden ml-10">
            <NavButton
              title="Dashboard"
              path="/user/dashboard"
              active={path === "dashboard" ? true : false}
            />
            <NavButton
              title="Visualize"
              path="/user/visualize"
              active={path === "visualize" ? true : false}
            />
          </div>
        </div>
        <div className="h-full flex items-center">
          <button
            onClick={logout}
            className="bg-red-400 py-2 px-5 rounded-xl mr-5 text-md hover:scale-105"
          >
            Log out
          </button>
        </div>
      </div>
      <div
        className={`
        md:hidden
        ${
          ToggleMenu ? "translate-y-0" : "translate-y-[-100%]"
        }  ease-in-out duration-500 bg-gray-400 w-full h-[5rem] absolute top-[100%] z-10 flex items-center justify-evenly`}
      >
          <NavButton
            title="Dashboard"
            path="/user/dashboard"
            active={path === "dashboard" ? true : false}
          />
          <NavButton
            title="Visualize"
            path="/user/visualize"
            active={path === "visualize" ? true : false}
          />
      </div>
    </header>
  );
};

function NavButton({
  title,
  path,
  active,
}: {
  title: string;
  path: string;
  active?: boolean;
}) {
  return (
    <Link to={path}>
      <button
        className={`bg-white ${
          active ? "bg-blue-200" : "hover:bg-blue-100"
        } py-2 px-5 rounded-lg mx-2`}
      >
        {title}
      </button>
    </Link>
  );
}
export default NavBar;
