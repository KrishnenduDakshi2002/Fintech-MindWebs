import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { HOST } from "../Host";
import { useSuccessExpenseContext } from "../Context/ExpenseContext";
import MAB from "./MAB";

const UserDetails = () => {
  const UserDetails = useGetUserData();
  return (
    <div className="bg-white rounded-xl h-full w-full grid grid-cols-2 grid-rows-2 gap-2 p-2 xl:pl-10 pl-5">
      <div className="flex justify-center flex-col ">
        <p className="2xl:text-[1.3rem] xl:text-[1.25rem]">Hi!</p>
        <p className="2xl:text-[1.5rem] xl:text-[1.25rem]">
          {UserDetails?.name}
        </p>
      </div>
      <div className="bg-blue-300 row-span-2 rounded-[inherit]">
        <MAB/>
      </div>
      <div className="flex flex-col marker:bg-blue-300">
        <p className="2xl:text-[1.2rem]  xl:text-[1rem]mb-5 text-purple-800 font-bold whitespace-nowrap">
          Current Balance
        </p>
        <p className="2xl:text-[1.7rem] xl:text-[1.4rem] text-green-600 font-bold flex items-center">
          <FaRupeeSign size={15} />
          {UserDetails?.balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

function useGetUserData() {
  const [userDetails, setUserDetails] = useState<{
    balance: number;
    name: string;
    _id: string;
  }>();
  const {reloadOnSuccess} = useSuccessExpenseContext();
  useEffect(() => {
    axios
      .get(`${HOST}/get/userdetails`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((e) => {
        // window.alert(`${e.response.statusText}`);
        console.log(e);
      });
  }, [reloadOnSuccess]);
  return userDetails;
}

export default UserDetails;
