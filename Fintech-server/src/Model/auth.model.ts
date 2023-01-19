import mongoose from "mongoose";
import { ExpenseInterface } from "./expense.model";

interface UserModelInterface{
    _id: mongoose.Types.ObjectId;
    name:string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
},{
    timestamps : true
})

export const UserModel = mongoose.model<UserModelInterface>('user',UserSchema)