import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { HOST } from "../Host";
import { useSuccessExpenseContext } from "../Context/ExpenseContext";

const UserDetails = () => {
  const UserDetails = useGetUserData();
  return (
    <div className="bg-white rounded-xl h-full w-full grid grid-cols-3">
      <div className="flex justify-center flex-col p-5">
        <p className="2xl:text-[1.3rem] xl:text-[1.25rem]">Hi!</p>
        <p className="2xl:text-[1.5rem] xl:text-[1.25rem]">
          {UserDetails?.name}
        </p>
      </div>
      <div className="mr-2 flex flex-col justify-center p-5">
        <p className="2xl:text-[1.2rem]  xl:text-[1rem]mb-5 text-purple-800 font-bold">
          Current Balance
        </p>
        <p className="2xl:text-[1.7rem] xl:text-[1.4rem] text-green-600 font-bold flex items-center">
          <FaRupeeSign size={15} />
          {UserDetails?.balance.toFixed(2)}
        </p>
      </div>
      <div className="ml-2 flex flex-col justify-center p-5 text-purple-800 font-bold">
        {/* <p className="2xl:text-[1.2rem]  xl:text-[1rem]mb-5">Today's Debit</p>
        <p className="2xl:text-[1.7rem] xl:text-[1.4rem] text-red-600 font-bold">
          123.22
        </p> */}
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
