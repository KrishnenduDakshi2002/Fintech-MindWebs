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
      userid: id
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
      const expenses = await ExpenseModel.find({ date: { $eq: filterDate }, userid : userid });
      messageCustom(res, OK, "expenses", expenses);
    } else if (period === "week" && numberOfPeriod != undefined) {
      const newDate = date - +numberOfPeriod * 7;
      const filterDate = `${year}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${newDate.toString().padStart(2, "0")}`;
      const expenses = await ExpenseModel.find({ date: { $eq: filterDate }, userid : userid });
      messageCustom(res, OK, "expenses", expenses);
    } else if(period === 'recent'){
      const expenses = await ExpenseModel.find({userid : userid}).limit(20);
      messageCustom(res, OK, "expenses", expenses);
    }else{
        messageCustom(res,BAD_REQUEST,'not valid query',{});
    }
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}

export async function getExpenseByMonth(req: Request, res: Response) {
  try {
    // this is month index [0 to 11]
    const monthFromQuery = req.query.m as string;
    const yearFromQuery = req.query.y;
    const sort = req.query.sort as string;
    const CurrentDate = new Date();
    const userid = new mongoose.Types.ObjectId(req.body.UserId);
    const StartDate = new Date(CurrentDate.getFullYear(), +monthFromQuery, 1);
    const EndDate = new Date(CurrentDate.getFullYear(), +monthFromQuery + 1, 0);
    const expenses = await ExpenseModel.find({
      $and: [
        { date: { $lte: EndDate.toISOString() } },
        { date: { $gte: StartDate.toISOString() } },
      ],
      userid : userid
    });
    if (sort != undefined && sort === "true") {
      const sorted = expenses.sort((a: any, b: any) => a.date - b.date);
      messageCustom(res, OK, `Expenses for ${MONTH[+monthFromQuery]}`, sorted);
    } else {
        messageCustom(res, OK, `Expenses for ${MONTH[+monthFromQuery]}`, expenses);
    }
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}
