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
    const increment = ( ValidatedExpense.data.cashFlow === 'credit' ? +ValidatedExpense.data.amount : 0-(+ValidatedExpense.data.amount))
    const updatedres = await UserModel.findByIdAndUpdate(id,{
        $inc : {
            balance : increment
        }
    });

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
    const limit = req.query.limit as string;
    const year = CurrentDate.getFullYear();
    const month = CurrentDate.getMonth();
    const date = CurrentDate.getDate()
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
      const expenses = await ExpenseModel.find({ userid: userid });
      const sortExpenses = expenses.sort((a:any,b:any)=> b.date - a.date).slice(0,(limit!= undefined ? +limit : 19));
      messageCustom(res, OK, "expenses", sortExpenses);
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
        const userId = new mongoose.Types.ObjectId(req.body.UserId)
        const MonthSet = new Set<number>();
        const YearSet = new Set<number>();
        (await ExpenseModel.find({userid : userId}).select("date")).map(doc =>{
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
    const userId = new mongoose.Types.ObjectId(req.body.UserId)

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
    while (EndDateOfWeek <= EndOfMonth) {
      const expenses = await ExpenseModel.find({
        $and: [
          { date: { $gte: StartDateOfWeek.toISOString() } },
          { date: { $lte: EndDateOfWeek.toISOString() } },
          { userid : { $eq : userId}}
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
    
    const userdata= await UserModel.findById(userId).select('balance');
    let userCurrentBalance = userdata?.balance;

    // cleaning and getting desired output
    // getting total_debit, total_credit and current_balance
    let Result:any[] = [];
    FilteredResult.map((week,index) =>{
        let TotalDebit = 0;
        let TotalCredit = 0;
        week.map(expense=>{
            if(expense.cashFlow === 'debit') TotalDebit += expense.amount;
            else if(expense.cashFlow === 'credit') TotalCredit += expense.amount;
        });
        if(userCurrentBalance != undefined) userCurrentBalance = userCurrentBalance + (TotalCredit - TotalDebit);
        Result.push({
                TotalDebit : TotalDebit.toFixed(2),
                TotalCredit : TotalCredit.toFixed(2),
                CurrentBalance : userdata?.balance.toFixed(2)
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


export async function getMAB(req:Request,res:Response) {
  try {
    const year = req.query.y as string;
    const month = req.query.m as string;
    const CurrentDate = new Date();
    const StartOfMonth = new Date(+year,+month,1);
    const NoOfDates = new Date(+year,+month+1,0).getDate();
    const StartDateOfNextMonth = new Date(+year,+month+1,1);
    const userId = new mongoose.Types.ObjectId(req.body.UserId);
    // getting all the document for that month and year
    const expenses = await ExpenseModel.find({
      $and:[
        {
          date : { $gt : StartOfMonth.toISOString()}
        },
        {
          date: {$lt : StartDateOfNextMonth.toISOString()}
        },
        {
          userid: userId
        }
      ]
    });

    let DatePointer = new Date(+year,+month,1);
    // time complexity : (no.of date in that month) * (total no. of expenses in month)
    // O(n)
    let TotalCashOfMonth=0;
    let results:any[]=[];
    let ClosingBalance = 0;
    let OpeningBalance = 0;
    Array.from({length: NoOfDates }).map((v,i)=>{
      let TotalDebit = 0;
      let TotalCredit = 0;
      expenses.map(expense=>{
        if(dayjs(expense.date).isSame(dayjs(DatePointer),'day'))
        {
          if(expense.cashFlow === 'debit') TotalDebit += expense.amount;
          else if(expense.cashFlow === 'credit') TotalCredit += expense.amount;
        }
      })

      TotalCashOfMonth += +(TotalCredit - TotalDebit).toFixed(2)
      OpeningBalance += TotalCredit - TotalDebit;
      ClosingBalance += OpeningBalance;
      results.push({
        TotalCredit,
        TotalDebit,
        OpeningBalance : OpeningBalance
      })
      DatePointer = new Date(+year,+month,i+2)
    })

    messageCustom(res,OK,'Monthly Average Balance',{
      MAB: ClosingBalance/NoOfDates,
      results,
      NoOfDates
    });
  } catch (error) {
    messageError(res,SERVER_ERROR,'server error',error);
  }
}