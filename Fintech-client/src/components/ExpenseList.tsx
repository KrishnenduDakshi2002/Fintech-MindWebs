import React, { memo, useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import axios from "axios";
dayjs.extend(LocalizedFormat)
import {HOST} from '../Host';

export interface ExpenseInterface{
  _id: string;
  description: string,
  date: string,
  amount: string,
  cashFlow: string,
  moneyType: string,
  createdAt: string;
  updatedAt : string;
}



const Filters = ["Recent", "1 Day", "2 Days", "3 Days", "4 Days", "1 Week"];
const ExpenseListWrapper = () => {
  const [SearchFilterPeriod, setSearchFilterPeriod] = useState("recent");
  const [SearchFilterNumber, setSearchFilterNumber] = useState("0");
  const Expenses = useGetExpense(SearchFilterPeriod,SearchFilterNumber);
  return (
    <div className="w-full h-full rounded-xl grid grid-rows-[3rem_1fr] bg-white px-4 py-2">
      <div className="grid grid-flow-col overflow-x-scroll scrollbar-hidden py-2">
        {Filters.map((filter, i) => {
          return (
            <button key={i} onClick={()=>{
              if(i == 0) setSearchFilterPeriod('recent');
              else if(i > 0 && i <=4 ){
                setSearchFilterPeriod('day');
                setSearchFilterNumber(i.toString());
              }
              else if(i === 5){
                setSearchFilterPeriod('week');
                setSearchFilterNumber('1');
              }
            }} className="rounded-md bg-blue-300 mx-1 px-3">
              <p className="whitespace-nowrap">{filter}</p>
            </button>
          );
        })}
      </div>
      <div className="overflow-auto">
        {
          Expenses != undefined && 
          <ExpenseList Expenses={Expenses}/>
        }
      </div>
    </div>
  );
};

function useGetExpense(SearchFilterPeriod : string, SearchFilterNumber: string){
  const [expenses, setExpenses] = useState<Array<ExpenseInterface>>();
  // console.log('get expenselist useeffect');
  useEffect(() => {
    if(SearchFilterPeriod === 'recent'){
      axios.get(`${HOST}/get/expense?p=recent`,{
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      }).then(res => {
        setExpenses(res.data);
      }).catch(e=> {
        console.log(e);
        window.alert('ERR : Error while getting expenses')
      });
    }else{
      axios.get(`${HOST}/get/expense?p=${SearchFilterPeriod}&n=${SearchFilterNumber}`,
      {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      }
      ).then(res => {
        setExpenses(res.data);
      }).catch(e=>{
        console.log(e);
        window.alert('ERR : Error while getting expenses')
      })
    }
  }, [SearchFilterNumber,SearchFilterPeriod])
  return expenses;
}

const ExpenseList = memo(({Expenses}:{Expenses: Array<ExpenseInterface>}) => {
  return (
    <div className="grid-flow-row overflow-y-scroll gap-y-1">
      {Expenses.map((expense,i) => (
        <ExpenseTile key={i} {...expense} />
      ))}
    </div>
  );
});

interface ExpenseTileInterface{
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
