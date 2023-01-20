import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function Welcome() {

    const navigate = useNavigate();
  return (
    <div className="max-w-[30rem] lg:h-[40%] h-[30%] rounded-2xl bg-white shadow-gray-500 shadow-2xl  grid grid-rows-[3rem_1fr] py-10">
      <h1 className="text-[1.8rem] mx-5">Welcome to</h1>
      <h1 className="text-[1.8rem] mx-5">FinTech - Your Finance Tracker</h1>
      <div className="grid grid-rows-[1fr_1fr_2.5fr] mx-10 pt-5">
        <div className="flex justify-evenly items-center flex-col my-4">
          <button onClick={()=> navigate('/login')} className="bg-blue-300 py-2 px-10 mb-5 w-[90%] rounded-2xl hover:bg-blue-400">
            <p className="text-[1.2rem] text-blue-800 font-bold">Login</p>
          </button>
          <button onClick={()=> navigate('/signup')} className="border-2 border-blue-600 py-2 px-10 w-[90%] rounded-2xl hover:bg-blue-400 hover:border-transparent">
            <Link to="/signup">
              <p className="text-[1.2rem] text-blue-800 font-bold">Create an account</p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}


export default Welcome;
