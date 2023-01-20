import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Visualize Total Debit, Total Credit and Current Balance",
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
    y2: {
      type: "linear" as const,
      display: false,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default function LinePlot({
  values,
}: {
  values: Array<{
    CurrentBalance: string;
    TotalCrebit: string;
    TotalDebit: string;
  }>;
}) {
    let total_debit:number[] =[], total_credit:number[] =[],current_balance:number[] = [];
    values.map(val=>{
        total_credit.push(+val.TotalCrebit);
        total_debit.push(+val.TotalDebit);
        current_balance.push(+val.CurrentBalance);
    });
    const labels = Array.from({length : values.length}).map((v,i)=> `Week-${i+1}`)
    const data = {
        labels,
        datasets: [
          {
            label: "Total Credit",
            data: total_credit,
            borderColor: "rgb(11, 161, 14)",
            backgroundColor: "rgb(11, 161, 14)",
            yAxisID: "y",
            tension: 0.2,
        },
        {
            label: "Total Debit",
            data: total_debit,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgb(255, 99, 132)",
            yAxisID: "y1",
            tension: 0.2,
          },
        {
            label: "Current Balance",
            data: current_balance,
            borderColor: "rgb(16, 105, 230)",
            backgroundColor: "rgb(16, 105, 230)",
            yAxisID: "y2",
            tension: 0.2,
          },
        ],
      };
      
  return (
    <div className="w-full h-full">
      <Line options={options} data={data} />
    </div>
  );
}
