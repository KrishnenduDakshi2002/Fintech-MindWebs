import React, { useState } from "react";
import { Link,Navigate,useLocation } from "react-router-dom";
import Logo from './assets/logo.png'
const NavBar = () => {

    const path = useLocation().pathname.split('/')[2];
    const [authToken, setauthToken] = useState(localStorage.getItem('authToken'))

    function logout(){
      localStorage.removeItem('authToken');
      setauthToken(null);
    }

    if(authToken == null)
    {
      return <Navigate to={'/login'}/>
    }
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
        <button onClick={logout} className="bg-red-400 py-2 px-5 rounded-xl mr-5 text-md hover:scale-105">
          Log out
        </button>
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
