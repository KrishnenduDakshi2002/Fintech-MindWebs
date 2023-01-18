import mongoose from "mongoose";

export interface ExpenseInterface{
    _id: mongoose.Types.ObjectId;
    description: string,
    date: string,
    amount: number,
    cashFlow: string,
    moneyType: string,
    createdAt: Date;
    updatedAt : Date;
}

const ExpenseSchema = new mongoose.Schema({
    description: String,
    date: Date,
    amount: Number,
    cashFlow: String,
    moneyType: String,

},{
    timestamps : true
})

export const ExpenseModel = mongoose.model<ExpenseInterface>('expense',ExpenseSchema)