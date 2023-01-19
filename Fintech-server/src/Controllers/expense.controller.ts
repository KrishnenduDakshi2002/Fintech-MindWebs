import { Request, Response } from "express";
import { messageCustom, messageError } from "../helpers/message";
import {
  BAD_REQUEST,
  CREATED,
  SERVER_ERROR,
  OK,
} from "../helpers/messageTypes";
import { ExpenseValidator } from "../Validation/expense.validation";
import { ExpenseModel } from "../Model/expense.model";
import { UserModel } from "../Model/auth.model";
import mongoose from "mongoose";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

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

export async function addExpense(req: Request, res: Response) {
  try {
    const ValidatedExpense = ExpenseValidator.safeParse(req.body);
    if (!ValidatedExpense.success)
      return messageError(
        res,
        BAD_REQUEST,
        "invalid inputs",
        ValidatedExpense.error
      );

    const id = new mongoose.Types.ObjectId(req.body.UserId);
    const new_expense = await new ExpenseModel({
      ...ValidatedExpense.data,
      amount: +ValidatedExpense.data.amount,
      date: new Date(ValidatedExpense.data.date),
      userid: id,
    }).save();

    return messageCustom(
      res,
      CREATED,
      "expense added successfully",
      new_expense
    );
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}

/*

        n = number of days or weeks or months
        p = period, possible values [ recent , day , week ]
    
    */

export async function getExpenses(req: Request, res: Response) {
  try {
    const period = (req.query.p as string).toLowerCase();
    const numberOfPeriod = req.query.n;
    const CurrentDate = new Date();
    const year = CurrentDate.getFullYear();
    const month = CurrentDate.getMonth();
    const date = CurrentDate.getDate();
    const userid = new mongoose.Types.ObjectId(req.body.UserId);

    if (period === "day" && numberOfPeriod != undefined) {
      const newDate = date - +numberOfPeriod;
      const filterDate = `${year}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${newDate.toString().padStart(2, "0")}`;
      const expenses = await ExpenseModel.find({
        date: { $eq: filterDate },
        userid: userid,
      });
      messageCustom(res, OK, "expenses", expenses);
    } else if (period === "week" && numberOfPeriod != undefined) {
      const newDate = date - +numberOfPeriod * 7;
      const filterDate = `${year}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${newDate.toString().padStart(2, "0")}`;
      const expenses = await ExpenseModel.find({
        date: { $eq: filterDate },
        userid: userid,
      });
      messageCustom(res, OK, "expenses", expenses);
    } else if (period === "recent") {
      const expenses = await ExpenseModel.find({ userid: userid }).limit(20);
      messageCustom(res, OK, "expenses", expenses);
    } else {
      messageCustom(res, BAD_REQUEST, "not valid query", {});
    }
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}

export async function getExpenseByMonth(req: Request, res: Response) {
  try {
    // this is month index [0 to 11]
    const monthFromQuery = req.query.m as string;
    const yearFromQuery = req.query.y as string;
    const sort = req.query.sort as string;
    // const userid = new mongoose.Types.ObjectId(req.body.UserId);
    if (monthFromQuery == undefined || yearFromQuery == undefined) {
      messageCustom(res, BAD_REQUEST, "invalid query", {});
      return;
    }
    const StartDate = new Date(+yearFromQuery, +monthFromQuery, 1);
    const StartDateOfNextMonth = new Date(+yearFromQuery,+monthFromQuery+1,1);
    const expenses = await ExpenseModel.find({
      $and: [
        { date: { $lte: StartDateOfNextMonth.toISOString() } },
        { date: { $gte: StartDate.toISOString() } },
      ],
    }).select(["date", "amount", "cashFlow", "moneyType"]);
    if (sort != undefined && sort === "true") {
      const sorted = expenses.sort((a: any, b: any) => b.date - a.date);
      messageCustom(res, OK, `Expenses for ${MONTH[+monthFromQuery]}`, sorted);
    } else {
      messageCustom(
        res,
        OK,
        `Expenses for ${MONTH[+monthFromQuery]}`,
        expenses
      );
    }
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}

export async function getExpensesActiveSession(req:Request,res:Response) {
    try {
        const MonthSet = new Set<number>();
        const YearSet = new Set<number>();
        (await ExpenseModel.find({}).select("date")).map(doc =>{
            MonthSet.add((doc.date.getMonth()));
            YearSet.add((doc.date.getFullYear()));
        });
        messageCustom(res,OK,'active months and year',{
            month : Array.from(MonthSet).sort((a,b)=> a-b),
            year : Array.from(YearSet).sort((a,b)=> a-b)
        });
    } catch (error) {
        messageError(res,SERVER_ERROR,'server error',error)
    }
}

// for now a bug causes missing out the last date
// FIX IT
export async function getAnalysisOfExpensesByWeek(req: Request, res: Response) {
  try {
    const year = req.query.y as string; // year
    const month = req.query.m as string; // month index

    if (year == undefined || month == undefined) {
      messageCustom(res, BAD_REQUEST, "invalid query", {});
      return;
    }

    let StartDateOfWeek = new Date(+year, +month, 1);
    let EndDateOfWeek = new Date(+year, +month, 7);
    let EndOfMonth = new Date(+year, +month + 1, 0);
    // let StartDateOfNextMonth = new Date(+year,+month+1,1)
    let isEndOfMonth = false;

    let FilteredResult = [];
    console.log(MONTH[+month])
    while (EndDateOfWeek <= EndOfMonth) {
        console.log(StartDateOfWeek,EndDateOfWeek);
      const expenses = await ExpenseModel.find({
        $and: [
          { date: { $gte: StartDateOfWeek.toISOString() } },
          { date: { $lte: EndDateOfWeek.toISOString() } },
        ],
      }).select(["date", "amount", "cashFlow", "moneyType"]);
      const sorted = expenses.sort((a: any, b: any) => a.date - b.date);
      FilteredResult.push(sorted);

      StartDateOfWeek = EndDateOfWeek;
      EndDateOfWeek = new Date(+year, +month, EndDateOfWeek.getDate() + 7);

      if((EndDateOfWeek > EndOfMonth) && !isEndOfMonth){
        EndDateOfWeek = EndOfMonth;
        isEndOfMonth = true
      }
    }


    // cleaning and getting desired output
    // getting total_debit, total_credit and current_balance
    let Result:any[] = [];
    FilteredResult.map((week,index) =>{
        let TotalDebit = 0;
        let TotalCrebit = 0;
        week.map(expense=>{
            if(expense.cashFlow === 'debit') TotalDebit += expense.amount;
            else if(expense.cashFlow === 'credit') TotalCrebit += expense.amount;
        });
        Result.push({
                TotalDebit : TotalDebit.toFixed(2),
                TotalCrebit : TotalCrebit.toFixed(2),
                CurrentBalance : (TotalCrebit - TotalDebit).toFixed(2)
        })
    })

    messageCustom(res, OK, "ok", {
        month: MONTH[+month],
        year : year,
        data : Result
    });
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}
