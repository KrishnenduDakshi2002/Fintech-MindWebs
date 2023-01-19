import React from "react";
import Logo from "./assets/logo.png";
const Card = ({
  isActive,
  isCredit,
  userName,
  onClick,
}: {
  isActive: boolean;
  isCredit: boolean;
  userName: string;
  onClick: (val: string) => void;
}) => {
  return (
    <button
      onClick={() => onClick(`${isCredit ? "credit" : "debit"}`)}
      className={`${
        isActive ? "border-2" : ""
      } border-blue-600 2xl:hover:scale-105 xl:hover:scale-[1.01] ease-in-out duration-150 rounded-2xl overflow-hidden p-1 mx-1
      `}
    >
      <div
        className={` 2xl:h-[12rem] h-[11rem] px-5 ${
          isCredit
            ? "bg-gradient-to-tr from-purple-600 to-pink-600"
            : "bg-gradient-to-tr from-blue-600 to-blue-400"
        } cursor-pointer
      grid grid-cols-4 grid-rows-3
      rounded-[inherit]
      text-white
      `}
      >
        <div className="col-span-2 flex items-center pl-4">
          {isCredit ? "Credit" : "Debit"}
        </div>
        <div className="col-span-2 flex justify-end pr-2 pt-2">
          <img src={Logo} className="h-10" />
        </div>
        <Text text="0123" />
        <Text text="0123" />
        <Text text="0123" />
        <Text text="0123" />
        <div className="col-span-3 flex-center-center 2xl:text-[0.9rem] xl:text-[0.9rem] pr-16">{userName}</div>
        <div className="col-span-1 flex-center-center 2xl:text-[1rem] xl:text-[0.9rem]">01/23</div>
      </div>
    </button>
  );
};

const Text = ({ text }: { text: string }) => {
  return <p className=" 2xl:text-xl xl:text-[1.1rem] xl:px-2 flex-center-center">{text}</p>;
};

export default Card;
