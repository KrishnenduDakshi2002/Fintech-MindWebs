import mongoose from "mongoose";
import { ExpenseInterface } from "./expense.model";

interface UserModelInterface{
    _id: mongoose.Types.ObjectId;
    name:string;
    email: string;
    balance: number;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    balance: Number
},{
    timestamps : true
})

export const UserModel = mongoose.model<UserModelInterface>('user',UserSchema)