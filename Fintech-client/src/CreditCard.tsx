import React from "react";
import Logo from './assets/logo.png'
const Card = ({ isCredit,userName }: { isCredit: boolean;userName:string }) => {
  return (
    <div
      className={`w-[20rem] h-[12rem] mx-5 ${
        isCredit
          ? "bg-gradient-to-tr from-purple-600 to-pink-600"
          : "bg-gradient-to-tr from-blue-600 to-blue-400"
      } rounded-2xl hover:scale-105 ease-in-out duration-150 cursor-pointer
      grid grid-cols-4 grid-rows-3
      overflow-hidden
      text-white
      `}
    >
      <div className="col-span-2 flex items-center pl-4">
        {isCredit ? "Credit" : "Debit"}
      </div>
      <div className="col-span-2 flex justify-end pr-2 pt-2">
        <img src={Logo} className="h-10"/>
      </div>
      <Text text="0123"/>
      <Text text="0123"/>
      <Text text="0123"/>
      <Text text="0123"/>
      <div className="col-span-2 flex-center-center">
        {userName}
      </div>
      <div className="col-span-2 flex-center-center">01/23</div>
    </div>
  );
};

const Text=({text}:{text:string})=>{
  return <p className=" text-xl flex-center-center">{text}</p>
}

export default Card;
