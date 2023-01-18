import React from "react";

const LandingPage = () => {
  return (
    <div className="w-screen h-screen grid xl:grid-cols-2 lg:grid-cols-[1fr_2fr] grid-cols-1 landingpage-bg-container">
      <div className=""></div>
      <div className="flex items-center justify-center">
        <div className="max-w-[30rem] lg:h-[70%] h-[80%] min-h-[30rem] rounded-2xl bg-white shadow-gray-500 shadow-2xl  grid grid-rows-[6rem_1fr] py-20">
          <h1 className="text-[1.8rem] mx-5">FinTech - Your Finance Tracker</h1>
          <div className="grid grid-rows-[1fr_1fr_2.5fr] mx-10">
            <div className="w-full">
              <input
                type="text"
                placeholder="Email Address"
                className="w-full h-[4rem] mx-auto outline-none border-b border-black text-xl focus:border-blue-600"
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full h-[4rem] mx-auto outline-none border-b border-black text-xl focus:border-blue-600"
              />
            </div>
            <div className="flex justify-evenly items-center flex-col my-4">
              <button className="bg-blue-300 py-2 px-10 w-[90%] rounded-2xl hover:bg-blue-400">
                <p className="text-[1.2rem] text-blue-800 font-bold">Login</p>
              </button>
              <button className="border-2 border-blue-600 py-2 px-10 w-[90%] rounded-2xl hover:bg-blue-400 hover:border-transparent">
                <p className="text-[1.2rem] text-blue-800 font-bold">SignUp</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
