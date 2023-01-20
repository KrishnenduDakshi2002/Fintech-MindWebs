import React, { memo, useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import axios from "axios";
dayjs.extend(LocalizedFormat);
import { HOST } from "../Host";
import { useSuccessExpenseContext } from "../Context/ExpenseContext";

export interface ExpenseInterface {
  _id: string;
  description: string;
  date: string;
  amount: string;
  cashFlow: string;
  moneyType: string;
  createdAt: string;
  updatedAt: string;
}

const Filters = ["Recent", "1 Day", "2 Days", "3 Days", "4 Days", "1 Week"];
const ExpenseListWrapper = ({ refresh }: { refresh: boolean }) => {
  const [SearchFilterPeriod, setSearchFilterPeriod] = useState("recent");
  const [SearchFilterNumber, setSearchFilterNumber] = useState("0");
  const [RecentExpenseLimit, setRecentExpenseLimit] = useState<number>(20);
  const [ToggleRecentLimitMenu, setToggleRecentLimitMenu] = useState(false);

  const Expenses = useGetExpense(SearchFilterPeriod, SearchFilterNumber, true);
  return (
    <div className="w-full h-full rounded-xl grid grid-rows-[5rem_1fr] bg-white px-4 py-2 relative">
      <div className="grid grid-flow-col gap-x-2 overflow-x-scroll scrollbar-hidden py-2 relative z-20">
        {Filters.map((filter, i) => {
          return (
            <div key={i} className="relative flex-center-center">
              <button
                onClick={() => {
                  if (i == 0) {
                    setSearchFilterPeriod("recent");
                    setToggleRecentLimitMenu(prev=> !prev)
                  } else if (i > 0 && i <= 4) {
                    setSearchFilterPeriod("day");
                    setSearchFilterNumber(i.toString());
                  } else if (i === 5) {
                    setSearchFilterPeriod("week");
                    setSearchFilterNumber("1");
                  }
                }}
                className="rounded-md bg-blue-300 px-5 py-2"
              >
                <p className="whitespace-nowrap">{filter}</p>
              </button>

            </div>
          );
        })}
      </div>
      {/* <div className={`${ToggleRecentLimitMenu ? 'block':'hidden'} bg-green-300 w-full h-20 absolute top-[5rem] left-0 z-30`}>
        <input type={'range'} defaultValue={0} max={100} min={20}/>
      </div> */}
      <div className="overflow-auto">
        {Expenses != undefined && <ExpenseList Expenses={Expenses} />}
      </div>
    </div>
  );
};

function useGetExpense(
  SearchFilterPeriod: string,
  SearchFilterNumber: string,
  refresh: boolean
) {
  const [expenses, setExpenses] = useState<Array<ExpenseInterface>>();
  const {reloadOnSuccess} = useSuccessExpenseContext();
  // console.log('get expenselist useeffect');
  useEffect(() => {
    if (SearchFilterPeriod === "recent") {
      axios
        .get(`${HOST}/get/expense?p=recent`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((res) => {
          setExpenses(res.data);
        })
        .catch((e) => {
          console.log(e);
          // window.alert("ERR : Error while getting expenses");
        });
    } else {
      axios
        .get(
          `${HOST}/get/expense?p=${SearchFilterPeriod}&n=${SearchFilterNumber}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        )
        .then((res) => {
          setExpenses(res.data);
        })
        .catch((e) => {
          console.log(e);
          // window.alert("ERR : Error while getting expenses");
        });
    }
  }, [SearchFilterNumber, SearchFilterPeriod,reloadOnSuccess]);
  return expenses;
}

const ExpenseList = memo(
  ({ Expenses }: { Expenses: Array<ExpenseInterface> }) => {
    return (
      <div className="grid-flow-row overflow-y-scroll gap-y-1">
        {Expenses.map((expense, i) => (
          <ExpenseTile key={i} {...expense} />
        ))}
      </div>
    );
  }
);

interface ExpenseTileInterface {
  key: string | number;
  _id: string;
  amount: string;
  description: string;
  cashFlow: string;
  date: string;
  moneyType: string;
}
export function ExpenseTile({
  _id,
  amount,
  description,
  date,
  cashFlow,
  moneyType,
}: ExpenseTileInterface) {
  const [ExpandTile, setExpandTile] = useState(false);
  return (
    <div
      key={_id}
      className={`relative ${
        ExpandTile ? "border border-gray-300 rounded-2xl" : ""
      } overflow-hidden`}
    >
      <div
        className=" grid lg:grid-cols-[4rem_3fr_auto] grid-cols-[3fr_auto] cursor-pointer py-2 relative z-10"
        onClick={() => setExpandTile((prev) => !prev)}
      >
        <div className="lg:flex hidden justify-center items-center">
          <div className="rounded-full bg-violet-400 p-5"></div>
        </div>
        <p className="text-overflow px-2 text-sm">{description}</p>
        <p
          className={`flex-center-center px-4 lg:text-xl text-md font-semibold ${
            cashFlow === "debit" ? "text-red-700" : "text-green-700"
          }`}
        >
          {/* {moneyType === "rupee" ? (
            <FaRupeeSign size={12} />
          ) : (
            <BiDollar size={15} />
          )} */}
          <FaRupeeSign size={12} />

          {amount}
        </p>
      </div>
      <div
        className={`${
          ExpandTile ? "block" : "hidden"
        } bg-pink-100 w-full min-h-[100px] py-3 px-4`}
      >
        <p className="my-2">{dayjs(date).format("LL")}</p>
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
