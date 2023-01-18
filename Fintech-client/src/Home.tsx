import React, { useState } from "react";
import { DatePicker } from "./components/DatePicker/DatePicker";
import { IoCalendarNumber } from "react-icons/io5";
import { FaAngleDown, FaUsersSlash } from "react-icons/fa";
import ExpenseListWrapper from "./components/ExpenseList";
import Card from "./CreditCard";

const Currencies =[
  "Rupee",
  "Dollar"
]
const Home = () => {
  const [date, setDate] = useState(new Date());
  const [ToggleCurrencySelector, setToggleCurrencySelector] = useState(false);
  const [currency, setcurrency] = useState("rupee");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [cashFlow, setCashFlow] = useState('');


  return (
    <div className="bg-gray-200 h-full grid 2xl:grid-cols-[3fr_2fr] grid-cols-[2fr_1fr] grid-rows-[1fr_4fr] pl-6">
      <div className="flex-center-center">
        <div className="bg-white rounded-xl h-[90%] w-full">dsf</div>
      </div>
      <div className=" row-span-2 pb-5 pt-2 px-5 h-full">
        <ExpenseListWrapper/>
      </div>
      <div className="bg-white rounded-xl px-10 py-5 mb-5 grid grid-rows-[15rem_4rem_4rem_5rem] grid-cols-2 relative">
        <button onClick={()=>setCashFlow('credit')}>
          <Card isCredit userName="Krishnendu Dakshi"/>
        </button>
        <button onClick={()=>setCashFlow('debit')}>
          <Card isCredit={false} userName="Krishnendu Dakshi"/>
        </button>
        <div className="flex-center-center">
          <input
            type="number"
            className="h-[3rem] w-full rounded-xl mr-4 px-4 border border-gray-700 hover:border-blue-800 outline-none"
            placeholder="Amount"
            // toFixed() returns string when passed number
            onChange={(e)=>setAmount(+(+e.target.value).toFixed(2))}
          />
          <div
            onClick={() =>setTimeout(()=>setToggleCurrencySelector((prev) => !prev),100)}
            className="px-4 bg-gray-300 py-1 rounded-md cursor-pointer text-sm flex items-center relative"
          >
            <span className="mr-2">{currency}</span>
            <FaAngleDown />
            <div
              className={`${
                ToggleCurrencySelector ? "block" : "hidden"
              }  w-full absolute top-[100%] my-2 left-0 bg-inherit
              rounded-md
              flex flex-col
              `}
            >
              {
                Currencies.map((c,i)=>
                  <button key={i} className="py-2" onClick={()=>setcurrency(c.toLowerCase())}><p>{c}</p></button>)
              }
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <input
            type="date"
            className="h-[3rem] w-full rounded-xl ml-4 px-4 border border-gray-700 hover:border-blue-800 outline-none"
            placeholder="Date"
            onChange={(e)=>setDate(new Date(e.target.value))}
          />
        </div>
        <div className="col-span-2 flex-center-center">
          <input
            type="text"
            className="h-[3rem] rounded-xl w-full px-4 border border-gray-700 hover:border-blue-800 outline-none"
            placeholder="Description"
            onChange={(e)=>setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end items-center">
          <button className="px-[4rem] py-4 bg-blue-400 rounded-2xl hover:scale-105 ease-in-out duration-300">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
