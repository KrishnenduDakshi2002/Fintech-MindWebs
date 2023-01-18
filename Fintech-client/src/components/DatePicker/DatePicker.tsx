import React, { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import "./DatePicker.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const WEEKS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Props{
  value : Date;
  onChange : (val : Date) => void;
}

export const DatePicker:React.FC<Props> = React.memo(({value,onChange}) => {
  const [currentDate, setCurrentDate] = useState(value);
  const HandleChangeDate = (value: Date) => setCurrentDate(value);
  return <RenderCalendar value={currentDate} onChange={HandleChangeDate} setDate={onChange}/>;
});

interface RenderCalendarProps {
  value: Date;
  onChange: (value: Date) => void;
  setDate : (val : Date) => void;
}

const RenderCalendar: React.FC<RenderCalendarProps> = ({
  value,
  onChange,
  setDate,
}) => {
  const [onClickDate, setOnClickDate] = useState<number>();
  const [onClickStyle, setOnClickStyle] = useState("");
  const currentMonthRef = useRef<HTMLParagraphElement>(null);

  const HandleOnClick = (date:number,dateString : string) =>{
    setOnClickDate(date);
    setOnClickStyle("datePicker-days-active");
    setDate(new Date(dateString));
  }

  //getting new date
    let currYear = value.getFullYear(),
    currMonth = value.getMonth(),
    currDate = value.getDate();

  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // first date of current month
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // last date of current month
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); // last date of last month

  let PrefixDates: Array<number> = [];
  let PostfixDates: Array<number> = [];

  for (let i = 0; i < firstDayOfMonth; i++)
    PrefixDates.push(lastDateOfLastMonth - firstDayOfMonth + i + 1);

  for (let i = 1; i <= 42 - (PrefixDates.length + lastDateOfMonth); i++)
    PostfixDates.push(i);

  if (currentMonthRef.current != null) {
    currentMonthRef.current.innerText = `${MONTHS[currMonth]} ${currYear}`;
  }

  return (
    <div className="datePicker-wrapper">
      <header>
        <div className="datePicker-change-left-arrow">
          <button
            className="datePicker-change-btn"
            onClick={() => onChange(new Date(currYear, currMonth - 1, 1))}
          >
            <AiOutlineArrowLeft size={25} color="white"/>
          </button>
        </div>
        <div className="datePicker-change-right-arrow">
          <button
            className="datePicker-change-btn"
            onClick={() => onChange(new Date(currYear, currMonth + 1, 1))}
          >
            <AiOutlineArrowRight size={25} color="white"/>
          </button>
        </div>
        <div className="datePicker-current-date">
          <p ref={currentMonthRef} >
            {`${MONTHS[currMonth]} ${currYear}`}
          </p>
        </div>
      </header>
      <div className="datePicker-body">
        <ul className="datePicker-weeks">
          {WEEKS.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
        <ul className="datePicker-days">
          {/* last days of past month */}
          {PrefixDates.map((date, i) => (
            <li key={i} className="datePicker-days-inactive">
              {date}
            </li>
          ))}

          {/* days of current month */}
          {Array.from({ length: lastDateOfMonth }).map((_, i) => {
            const date = i + 1;

            const monthString = `${currMonth+1}`,
            paddedMonthString = monthString.padStart(2,'0');

            const dateString = `${currYear}-${paddedMonthString}-${date}`;

            return <li className={(onClickDate == date ? onClickStyle : "")} key={i}
            onClick={() => HandleOnClick(date,dateString)}
            >{date}</li>;
          })}
          {/* days of next month */}
          {PostfixDates.map((d, i) => (
            <li key={i} className="datePicker-days-inactive">
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
