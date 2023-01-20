import React, { useEffect, useState } from "react";
import SelectYearMonthButton from "./SelectYearMonthButton";
import axios from "axios";
import { HOST } from "../Host";

const MAB = () => {
  const [SelectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [SelectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const mab = useGetMAB(SelectedMonth, SelectedYear);
  return (
    <div className="bg-purple-50 w-full h-full rounded-[inherit] grid grid-rows-2">
      <p className="p-3 font-semibold text-violet-900 lg:text-[1rem] text-[0.75rem] leading-6">
        Monthly Average Balance{" "}
        <span className="bg-purple-400 px-4 py-1 rounded-xl text-white">
          {mab?.toFixed(2)}
        </span>
      </p>
      <SelectYearMonthButton
        setMonth={(val) => setSelectedMonth(val)}
        setYear={(val) => setSelectedYear(val)}
      />
    </div>
  );
};

function useGetMAB(month: number, year: number) {
  const [MAB, setMAB] = useState<number>();
  useEffect(() => {
    setTimeout(()=>{
      axios
        .get(`${HOST}/get/expense/mab?y=${year}&m=${month}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((res) => setMAB(res.data.MAB))
        .catch((e) => console.log(e));
    },1500)
  }, [month, year]);
  return MAB;
}

export default MAB;
