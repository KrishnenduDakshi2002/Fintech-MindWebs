import { useEffect, useState } from "react";
import LinePlot from "../components/LinePlot";
import axios from "axios";
import { HOST } from "../Host";
import { Footer } from "../components/Footer";

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
export default function Visualize() {
  const [ToggleMonth, setToggleMonth] = useState(false);
  const [ToggleYear, setToggleYear] = useState(false);
  const [SelectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [SelectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const AnalysisData = useGetExpenseAnalyzeData(SelectedMonth, SelectedYear);
  const [Months, Years] = useGetActiveExpenseSession();

  return (
    <div className="bg-gray-200 h-full grid 2xl:grid-cols-[3fr_1fr] 2xl:grid-rows-[1fr_4rem] grid-cols-1 grid-rows-[1fr_10rem_4rem] gap-2 p-3">
      {/* Visualization chart */}
      <div className="bg-white rounded-xl h-full grid grid-rows-[4rem_1fr]">
        <div className="flex items-center">
          <div className="relative  ml-5">
            <button
              onClick={() => setToggleYear((prev) => !prev)}
              className="bg-blue-300 py-3 px-16 rounded-xl cursor-pointer"
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
                      setSelectedYear(year);
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
          <div className="relative  ml-5">
            <button
              onClick={() => setToggleMonth((prev) => !prev)}
              className="bg-blue-300 py-3 px-16 rounded-xl cursor-pointer"
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
        {/* passing raw data, will process in LinePlot component */}
        <LinePlot values={AnalysisData} />
      </div>

      {/* MAB Calculator */}
      <div className="bg-yellow-300 rounded-xl h-full p-3 overflow-auto"></div>
      {/* Footer */}
      <div className="2xl:col-span-2 col-span-1">
        <Footer />
      </div>
    </div>
  );
}

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
        window.alert("ERR : error while getting data");
        console.log(e);
      });
  }, []);
  return [months, years];
}

function useGetExpenseAnalyzeData(month: number, year: number) {
  const [data, setData] = useState<
    Array<{
      CurrentBalance: string;
      TotalCrebit: string;
      TotalDebit: string;
    }>
  >([]);
  useEffect(() => {
    // Debouncer
    setTimeout(() => {
      axios
        .get(`${HOST}/get/expense/analysis?y=${year}&m=${month}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((res) => {
          console.log(res);
          setData(res.data.data);
        })
        .catch((e) => {
          window.alert("ERR : error while getting data");
          console.log(e);
        });
    }, 1500);
  }, [month, year]);

  return data;
}

const Divider = () => <div className="bg-gray-500 h-[1px] w-[50%]"></div>;
