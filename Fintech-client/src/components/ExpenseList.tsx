import React, { memo, useEffect, useState } from "react";
import Expenses from "../Data/EXPENSES_FILTERED.json";
import { FaRupeeSign } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(LocalizedFormat)


const Filters = ["All", "1 Day", "2 Days", "3 Days", "5 Days", "1 Week"];
const ExpenseListWrapper = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden grid grid-rows-[3rem_1fr] bg-white px-4 py-2">
      <div className="grid grid-flow-col overflow-x-scroll scrollbar-hidden py-2">
        {Filters.map((filter, i) => {
          return (
            <button key={i} className="rounded-md bg-blue-300 mx-1 px-3">
              <p className="whitespace-nowrap">{filter}</p>
            </button>
          );
        })}
      </div>
      <ExpenseList/>
    </div>
  );
};

const ExpenseList = memo(() => {
  return (
    <div className="grid-flow-row overflow-y-scroll gap-y-1 max-h-[40rem]">
      {Expenses.map((expense) => (
        <ExpenseTile {...expense} />
      ))}
    </div>
  );
});

interface ExpenseTileInterface {
  id: string | number;
  amount: string;
  description: string;
  cashFlow: string;
  date: string;
  moneyType: string;
}
export function ExpenseTile({
  id,
  amount,
  description,
  date,
  cashFlow,
  moneyType,
}: ExpenseTileInterface) {
  const [ExpandTile, setExpandTile] = useState(false);
  return (
    <div
      className={`relative ${
        ExpandTile ? "border border-gray-300 rounded-2xl" : ""
      } overflow-hidden`}
    >
      <div
        key={id}
        className=" grid grid-cols-[4rem_3fr_auto] cursor-pointer py-2 relative z-10"
        onClick={() => setExpandTile((prev) => !prev)}
      >
        <div className="flex-center-center">
          <div className="rounded-full bg-violet-400 p-6"></div>
        </div>
        <p className="text-overflow px-2 text-sm">{description}</p>
        <p
          className={`flex-center-center px-4 text-xl font-semibold ${
            cashFlow === "debit" ? "text-red-700" : "text-green-700"
          }`}
        >
          {moneyType === "rupee" ? (
            <FaRupeeSign size={12} />
          ) : (
            <BiDollar size={15} />
          )}
          {amount}
        </p>
      </div>
      <div
        className={`${
          ExpandTile ? "block" : "hidden"
        } bg-pink-100 w-full min-h-[100px] py-3 px-4`}
      >
        <p className="my-2">{dayjs(date).format('LL')}</p>
        <p>{description}</p>
        <p
          className={`flex items-center my-5 text-xl font-semibold text-green-700 ${
            cashFlow === "debit" ? "text-red-700" : "text-green-700"
          }`}
        >
          {moneyType === "rupee" ? (
            <FaRupeeSign size={12} />
          ) : (
            <BiDollar size={15} />
          )}
          {amount}
        </p>
      </div>
    </div>
  );
}

export default ExpenseListWrapper;
