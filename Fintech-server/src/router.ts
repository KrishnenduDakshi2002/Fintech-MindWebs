import { Request } from "express";
import * as express from 'express';
import { LoginController, SignUpController, getUserName, verifyToken } from "./Controllers/auth.controller";
import UserAuthentication from "./middleware/verifytoken";
import { addExpense, getAnalysisOfExpensesByWeek, getExpenseByMonth, getExpenses, getExpensesActiveSession } from "./Controllers/expense.controller";
const router = express.Router();

router.get('/',(req:Request,res:express.Response)=>{
    res.json('welcome to Fintech REST API');
})
router.get('/get/username',[UserAuthentication],getUserName);
router.get('/verifytoken',[UserAuthentication],verifyToken);
router.post('/login',LoginController);
router.post('/signup',SignUpController);

router.post('/post/expense',[UserAuthentication],addExpense);
router.get('/get/expense',[UserAuthentication],getExpenses);
router.get('/get/expense/month',[UserAuthentication],getExpenseByMonth);
router.get('/get/expense/analysis',[UserAuthentication],getAnalysisOfExpensesByWeek);
router.get('/get/expense/active',[UserAuthentication],getExpensesActiveSession);
export {router};

