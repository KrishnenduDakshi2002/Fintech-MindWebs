import React, { useReducer, useRef, useState } from "react";
import Card from "./CreditCard";
import axios from "axios";
import { HOST } from "../Host";
import {
  AddExpenseDispatchFunction,
  INITIAL_STATE,
  AddExpenseActionTypes,
  Expense,
} from "../utils/AddExpenseReducer";
import { useSuccessExpenseContext } from "../Context/ExpenseContext";

const AddExpenseForm = () => {
    const CurrentDate = new Date();
  const AmountRef = useRef<HTMLInputElement | null>(null);
  const DateRef = useRef<HTMLInputElement | null>(null);
  const DescriptionRef = useRef<HTMLInputElement | null>(null);
  const [ToggleCurrencySelector, setToggleCurrencySelector] = useState(false);
  const [state, dispatch] = useReducer(
    AddExpenseDispatchFunction,
    INITIAL_STATE
  );
  const { reloadOnSuccess, setReloadOnSuccess } = useSuccessExpenseContext();
  return (
    <div
      className="bg-white rounded-xl 2xl:px-10 px-5 py-5 grid xl:grid-rows-[15rem_4rem_4rem_5rem] 
      grid-rows-[12rem_12rem_repeat(4,4rem)] xl:grid-cols-2 gap-x-2
      grid-cols-1 scrollbar-hidden"
    >
      <div className="flex-center-center">
        <Card
          isActive={state.cashFlow === "credit" ? true : false}
          onClick={(val) => {
            dispatch({ type: AddExpenseActionTypes.CASHFLOW, payload: val });
          }}
          isCredit
          userName="Krishnendu Dakshi"
        />
      </div>
      <div className="flex-center-center">
        <Card
          isActive={state.cashFlow === "debit" ? true : false}
          onClick={(val) =>
            dispatch({ type: AddExpenseActionTypes.CASHFLOW, payload: val })
          }
          isCredit={false}
          userName="Krishnendu Dakshi"
        />
      </div>
      <div className="flex-center-center">
        <input
          ref={AmountRef}
          type="number"
          className="h-[3rem] w-full rounded-xl mr-4 px-4 border border-gray-700 hover:border-blue-800 outline-none"
          placeholder="Amount"
          // toFixed() returns string when passed number
          onChange={(e) =>
            dispatch({
              type: AddExpenseActionTypes.AMOUNT,
              payload: +(+e.target.value).toFixed(2),
            })
          }
        />
        <div
          onClick={() =>
            setTimeout(() => setToggleCurrencySelector((prev) => !prev), 100)
          }
          className="px-4 bg-gray-300 py-1 rounded-md cursor-pointer text-sm flex items-center relative"
        >
          <span className="mr-2">{state.currency}</span>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <input
          ref={DateRef}
          type="datetime-local"
          className="h-[3rem] w-full rounded-xl px-4 border border-gray-700 hover:border-blue-800 outline-none"
          placeholder="Date"
          onChange={(e) =>
            dispatch({
              type: AddExpenseActionTypes.DATE,
              payload: new Date(e.target.value),
            })
          }
        />
      </div>
      <div className="xl:col-span-2 col-span-1 flex-center-center">
        <input
          ref={DescriptionRef}
          type="text"
          className="h-[3rem] rounded-xl w-full px-4 border border-gray-700 hover:border-blue-800 outline-none"
          placeholder="Description"
          onChange={(e) =>
            dispatch({
              type: AddExpenseActionTypes.DESCRIPION,
              payload: e.target.value,
            })
          }
        />
      </div>
      <div className="xl:col-start-2 flex justify-end items-center">
        <button
          onClick={() => {
            AddExpense(state, (status) => {
              if (status === 201) {
                setReloadOnSuccess((prev) => !prev);
              } else {
                window.alert("ERR : error while adding expense");
              }
            });
            if (AmountRef.current) AmountRef.current.value = "";
            if (DateRef.current) DateRef.current.value = "";
            if (DescriptionRef.current) DescriptionRef.current.value = "";
          }}
          className="px-[4rem] py-3 bg-blue-300 rounded-2xl hover:scale-105 ease-in-out duration-300"
        >
          Add
        </button>
      </div>
    </div>
  );
};

function AddExpense(state: Expense, setStatus: (val: number) => void) {
  axios
    .post(
      `${HOST}/post/expense`,
      {
        description: state.description,
        amount: state.amount.toString(),
        cashFlow: state.cashFlow,
        moneyType: state.currency,
        date: state.date,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    )
    .then((response) => {
      setStatus(response.status);
    })
    .catch((e) => {
      console.log(e);
      setStatus(e.response.status);
    });
}

export default AddExpenseForm;
