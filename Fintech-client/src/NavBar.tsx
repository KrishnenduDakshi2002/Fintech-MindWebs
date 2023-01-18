import React from "react";
import { Link,useLocation } from "react-router-dom";
import Logo from './assets/logo.png'
const NavBar = () => {

    const path = useLocation().pathname.split('/')[2];
    console.log(path);
  return (
    <div className="h-full flex items-center justify-between">
      <div className="h-full flex items-center">
        <div className=" ml-10">
        <img src={Logo} className="w-[6rem]"/>
        </div>
        <div className=" ml-10">
          <NavButton title="Dashboard" path="/user/dashboard" active={ path=== 'dashboard' ? true : false}/>
          <NavButton title="Visualize" path="/user/visualize" active ={path=== 'visualize' ? true : false}/>
        </div>
      </div>
      <div className="h-full flex items-center">
        <NavButton title="Login" path="/user/dashboard"/>
        <NavButton title="Sign Up" path="/user/visualize"/>
      </div>
    </div>
  );
};

function NavButton({ title,path,active }: { title: string;path:string;active?:boolean; }) {
  return (
      <Link to={path}>
    <button className={`${active ? 'bg-blue-300' : 'hover:bg-blue-100'} py-2 px-5 rounded-lg mx-2`}>
        {title}
    </button>
      </Link>
  );
}
export default NavBar;
