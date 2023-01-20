import { useEffect, useState } from "react";
import LinePlot from "../components/LinePlot";
import axios from "axios";
import { HOST } from "../Host";
import { Footer } from "../components/Footer";
import useVerfiyUser from "../CustomHooks/GetverifiedUser";
import SelectYearMonthButton from "../components/SelectYearMonthButton";

export default function Visualize() {
  const [SelectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [SelectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // this custom hook will verify whether user authorized or not
  // on tha basis it will navigate to login
  useVerfiyUser();
  const AnalysisData = useGetExpenseAnalyzeData(SelectedMonth, SelectedYear);
  return (
    <div className="bg-gray-200 h-full grid grid-cols-1 grid-rows-[1fr_4rem] gap-2 p-3">
      {/* Visualization chart */}
      <div className="bg-white rounded-xl h-full grid grid-rows-[4rem_1fr]">
        <div className="w-[30%] py-2">
        <SelectYearMonthButton
        setMonth={(val)=> setSelectedMonth(val)}
        setYear = {(val)=> setSelectedYear(val)}
        />
        </div>
        {/* passing raw data, will process in LinePlot component */}
        <LinePlot values={AnalysisData} />
      </div>
      {/* Footer */}
      <div className="2xl:col-span-2 col-span-1">
        <Footer />
      </div>
    </div>
  );
}



function useGetExpenseAnalyzeData(month: number, year: number) {
  const [data, setData] = useState<
    Array<{
      CurrentBalance: string;
      TotalCredit: string;
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
          setData(res.data.data);
        })
        .catch((e) => {
          // window.alert("ERR : error while getting data");
          console.log(e);
        });
    }, 1500);
  }, [month, year]);

  return data;
}
