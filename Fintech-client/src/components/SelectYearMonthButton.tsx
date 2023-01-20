import React, { useEffect, useState } from "react";
import axios from "axios";
import { HOST } from "../Host";
const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const SelectYearMonthButton = ({setMonth,setYear}:{setMonth:(val:number)=>void;setYear:(val:number)=>void}) => {
  const [ToggleMonth, setToggleMonth] = useState(false);
  const [ToggleYear, setToggleYear] = useState(false);
  const [SelectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [SelectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [Months, Years] = useGetActiveExpenseSession();

  return (
    <div className="grid grid-cols-2 px-2 gap-2">
      <div className="relative flex-center-center">
        <button
          onClick={() => setToggleYear((prev) => !prev)}
          className="bg-blue-300 w-full py-2 rounded-xl cursor-pointer"
        >
          {SelectedYear}
        </button>
        <div
          className={`${
            ToggleYear ? "block" : "hidden"
          } w-full overflow-hidden bg-gray-200 absolute top-[110%] right-0 rounded-xl flex flex-col items-centers`}
        >
          {Years.map((year, i) => {
            return (
              <button
                key={year}
                onClick={() => {
                  setYear(year);
                  setSelectedYear(year)
                  setToggleYear((prev) => !prev);
                }}
                className="flex-center-center flex-col"
              >
                <p className=" py-3 font-semibold">{year}</p>
                <Divider />
              </button>
            );
          })}
        </div>
      </div>
      <div className="relative flex-center-center">
        <button
          onClick={() => setToggleMonth((prev) => !prev)}
          className="bg-blue-300 w-full py-2 rounded-xl cursor-pointer"
        >
          {MONTH[SelectedMonth]}
        </button>
        <div
          className={`${
            ToggleMonth ? "block" : "hidden"
          } w-full overflow-hidden bg-gray-200 absolute top-[110%] right-0 rounded-xl flex flex-col items-centers`}
        >
          {Months.map((month, i) => {
            return (
              <button
                key={month}
                onClick={() => {
                  setMonth(month);
                  setSelectedMonth(month);
                  setToggleMonth((prev) => !prev);
                }}
                className="flex-center-center flex-col"
              >
                <p className=" py-3 font-semibold">{MONTH[month]}</p>
                <Divider />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const Divider = () => <div className="bg-gray-500 h-[1px] w-[50%]"></div>;
function useGetActiveExpenseSession() {
    const [months, setMonths] = useState<Array<number>>([]);
    const [years, setYears] = useState<Array<number>>([]);
    useEffect(() => {
      axios
        .get(`${HOST}/get/expense/active`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((res) => {
          setMonths(res.data.month);
          setYears(res.data.year);
        })
        .catch((e) => {
          // window.alert("ERR : error while getting data");
          console.log(e);
        });
    }, []);
    return [months, years];
  }
export default SelectYearMonthButton;
