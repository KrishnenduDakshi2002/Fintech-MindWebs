"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMAB = exports.getAnalysisOfExpensesByWeek = exports.getExpensesActiveSession = exports.getExpenseByMonth = exports.getExpenses = exports.addExpense = void 0;
const message_1 = require("../helpers/message");
const messageTypes_1 = require("../helpers/messageTypes");
const expense_validation_1 = require("../Validation/expense.validation");
const expense_model_1 = require("../Model/expense.model");
const auth_model_1 = require("../Model/auth.model");
const mongoose_1 = __importDefault(require("mongoose"));
const dayjs_1 = __importDefault(require("dayjs"));
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
async function addExpense(req, res) {
    try {
        const ValidatedExpense = expense_validation_1.ExpenseValidator.safeParse(req.body);
        if (!ValidatedExpense.success)
            return (0, message_1.messageError)(res, messageTypes_1.BAD_REQUEST, "invalid inputs", ValidatedExpense.error);
        const id = new mongoose_1.default.Types.ObjectId(req.body.UserId);
        const new_expense = await new expense_model_1.ExpenseModel(Object.assign(Object.assign({}, ValidatedExpense.data), { amount: +ValidatedExpense.data.amount, date: new Date(ValidatedExpense.data.date), userid: id })).save();
        const increment = (ValidatedExpense.data.cashFlow === 'credit' ? +ValidatedExpense.data.amount : 0 - (+ValidatedExpense.data.amount));
        const updatedres = await auth_model_1.UserModel.findByIdAndUpdate(id, {
            $inc: {
                balance: increment
            }
        });
        return (0, message_1.messageCustom)(res, messageTypes_1.CREATED, "expense added successfully", new_expense);
    }
    catch (error) {
        (0, message_1.messageError)(res, messageTypes_1.SERVER_ERROR, "server error", error);
    }
}
exports.addExpense = addExpense;
/*

        n = number of days or weeks or months
        p = period, possible values [ recent , day , week ]
    
    */
async function getExpenses(req, res) {
    try {
        const period = req.query.p.toLowerCase();
        const numberOfPeriod = req.query.n;
        const CurrentDate = new Date();
        const limit = req.query.limit;
        const year = CurrentDate.getFullYear();
        const month = CurrentDate.getMonth();
        const date = CurrentDate.getDate();
        const userid = new mongoose_1.default.Types.ObjectId(req.body.UserId);
        if (period === "day" && numberOfPeriod != undefined) {
            const newDate = date - +numberOfPeriod;
            const filterDate = `${year}-${(month + 1)
                .toString()
                .padStart(2, "0")}-${newDate.toString().padStart(2, "0")}`;
            const expenses = await expense_model_1.ExpenseModel.find({
                date: { $eq: filterDate },
                userid: userid,
            });
            (0, message_1.messageCustom)(res, messageTypes_1.OK, "expenses", expenses);
        }
        else if (period === "week" && numberOfPeriod != undefined) {
            const newDate = date - +numberOfPeriod * 7;
            const filterDate = `${year}-${(month + 1)
                .toString()
                .padStart(2, "0")}-${newDate.toString().padStart(2, "0")}`;
            const expenses = await expense_model_1.ExpenseModel.find({
                date: { $eq: filterDate },
                userid: userid,
            });
            (0, message_1.messageCustom)(res, messageTypes_1.OK, "expenses", expenses);
        }
        else if (period === "recent") {
            const expenses = await expense_model_1.ExpenseModel.find({ userid: userid });
            const sortExpenses = expenses.sort((a, b) => b.date - a.date).slice(0, (limit != undefined ? +limit : 19));
            (0, message_1.messageCustom)(res, messageTypes_1.OK, "expenses", sortExpenses);
        }
        else {
            (0, message_1.messageCustom)(res, messageTypes_1.BAD_REQUEST, "not valid query", {});
        }
    }
    catch (error) {
        (0, message_1.messageError)(res, messageTypes_1.SERVER_ERROR, "server error", error);
    }
}
exports.getExpenses = getExpenses;
async function getExpenseByMonth(req, res) {
    try {
        // this is month index [0 to 11]
        const monthFromQuery = req.query.m;
        const yearFromQuery = req.query.y;
        const sort = req.query.sort;
        // const userid = new mongoose.Types.ObjectId(req.body.UserId);
        if (monthFromQuery == undefined || yearFromQuery == undefined) {
            (0, message_1.messageCustom)(res, messageTypes_1.BAD_REQUEST, "invalid query", {});
            return;
        }
        const StartDate = new Date(+yearFromQuery, +monthFromQuery, 1);
        const StartDateOfNextMonth = new Date(+yearFromQuery, +monthFromQuery + 1, 1);
        const expenses = await expense_model_1.ExpenseModel.find({
            $and: [
                { date: { $lte: StartDateOfNextMonth.toISOString() } },
                { date: { $gte: StartDate.toISOString() } },
            ],
        }).select(["date", "amount", "cashFlow", "moneyType"]);
        if (sort != undefined && sort === "true") {
            const sorted = expenses.sort((a, b) => b.date - a.date);
            (0, message_1.messageCustom)(res, messageTypes_1.OK, `Expenses for ${MONTH[+monthFromQuery]}`, sorted);
        }
        else {
            (0, message_1.messageCustom)(res, messageTypes_1.OK, `Expenses for ${MONTH[+monthFromQuery]}`, expenses);
        }
    }
    catch (error) {
        (0, message_1.messageError)(res, messageTypes_1.SERVER_ERROR, "server error", error);
    }
}
exports.getExpenseByMonth = getExpenseByMonth;
async function getExpensesActiveSession(req, res) {
    try {
        const userId = new mongoose_1.default.Types.ObjectId(req.body.UserId);
        const MonthSet = new Set();
        const YearSet = new Set();
        (await expense_model_1.ExpenseModel.find({ userid: userId }).select("date")).map(doc => {
            MonthSet.add((doc.date.getMonth()));
            YearSet.add((doc.date.getFullYear()));
        });
        (0, message_1.messageCustom)(res, messageTypes_1.OK, 'active months and year', {
            month: Array.from(MonthSet).sort((a, b) => a - b),
            year: Array.from(YearSet).sort((a, b) => a - b)
        });
    }
    catch (error) {
        (0, message_1.messageError)(res, messageTypes_1.SERVER_ERROR, 'server error', error);
    }
}
exports.getExpensesActiveSession = getExpensesActiveSession;
// for now a bug causes missing out the last date
// FIX IT
async function getAnalysisOfExpensesByWeek(req, res) {
    try {
        const year = req.query.y; // year
        const month = req.query.m; // month index
        const userId = new mongoose_1.default.Types.ObjectId(req.body.UserId);
        if (year == undefined || month == undefined) {
            (0, message_1.messageCustom)(res, messageTypes_1.BAD_REQUEST, "invalid query", {});
            return;
        }
        let StartDateOfWeek = new Date(+year, +month, 1);
        let EndDateOfWeek = new Date(+year, +month, 7);
        let EndOfMonth = new Date(+year, +month + 1, 0);
        // let StartDateOfNextMonth = new Date(+year,+month+1,1)
        let isEndOfMonth = false;
        let FilteredResult = [];
        while (EndDateOfWeek <= EndOfMonth) {
            const expenses = await expense_model_1.ExpenseModel.find({
                $and: [
                    { date: { $gte: StartDateOfWeek.toISOString() } },
                    { date: { $lte: EndDateOfWeek.toISOString() } },
                    { userid: { $eq: userId } }
                ],
            }).select(["date", "amount", "cashFlow", "moneyType"]);
            const sorted = expenses.sort((a, b) => a.date - b.date);
            FilteredResult.push(sorted);
            StartDateOfWeek = EndDateOfWeek;
            EndDateOfWeek = new Date(+year, +month, EndDateOfWeek.getDate() + 7);
            if ((EndDateOfWeek > EndOfMonth) && !isEndOfMonth) {
                EndDateOfWeek = EndOfMonth;
                isEndOfMonth = true;
            }
        }
        const userdata = await auth_model_1.UserModel.findById(userId).select('balance');
        let userCurrentBalance = userdata === null || userdata === void 0 ? void 0 : userdata.balance;
        // cleaning and getting desired output
        // getting total_debit, total_credit and current_balance
        let Result = [];
        FilteredResult.map((week, index) => {
            let TotalDebit = 0;
            let TotalCredit = 0;
            week.map(expense => {
                if (expense.cashFlow === 'debit')
                    TotalDebit += expense.amount;
                else if (expense.cashFlow === 'credit')
                    TotalCredit += expense.amount;
            });
            if (userCurrentBalance != undefined)
                userCurrentBalance = userCurrentBalance + (TotalCredit - TotalDebit);
            Result.push({
                TotalDebit: TotalDebit.toFixed(2),
                TotalCredit: TotalCredit.toFixed(2),
                CurrentBalance: userdata === null || userdata === void 0 ? void 0 : userdata.balance.toFixed(2)
            });
        });
        (0, message_1.messageCustom)(res, messageTypes_1.OK, "ok", {
            month: MONTH[+month],
            year: year,
            data: Result
        });
    }
    catch (error) {
        (0, message_1.messageError)(res, messageTypes_1.SERVER_ERROR, "server error", error);
    }
}
exports.getAnalysisOfExpensesByWeek = getAnalysisOfExpensesByWeek;
async function getMAB(req, res) {
    try {
        const year = req.query.y;
        const month = req.query.m;
        const CurrentDate = new Date();
        const StartOfMonth = new Date(+year, +month, 1);
        const NoOfDates = new Date(+year, +month + 1, 0).getDate();
        const StartDateOfNextMonth = new Date(+year, +month + 1, 1);
        // getting all the document for that month and year
        const expenses = await expense_model_1.ExpenseModel.find({
            $and: [
                {
                    date: { $gt: StartOfMonth.toISOString() }
                },
                {
                    date: { $lt: StartDateOfNextMonth.toISOString() }
                }
            ]
        });
        let DatePointer = new Date(+year, +month, 1);
        // time complexity : (no.of date in that month) * (total no. of expenses in month)
        // O(n)
        let TotalCashOfMonth = 0;
        let results = [];
        let ClosingBalance = 0;
        let OpeningBalance = 0;
        Array.from({ length: NoOfDates }).map((v, i) => {
            let TotalDebit = 0;
            let TotalCredit = 0;
            expenses.map(expense => {
                if ((0, dayjs_1.default)(expense.date).isSame((0, dayjs_1.default)(DatePointer), 'day')) {
                    if (expense.cashFlow === 'debit')
                        TotalDebit += expense.amount;
                    else if (expense.cashFlow === 'credit')
                        TotalCredit += expense.amount;
                }
            });
            TotalCashOfMonth += +(TotalCredit - TotalDebit).toFixed(2);
            OpeningBalance += TotalCredit - TotalDebit;
            ClosingBalance += OpeningBalance;
            results.push({
                TotalCredit,
                TotalDebit,
                OpeningBalance: OpeningBalance
            });
            DatePointer = new Date(+year, +month, i + 2);
        });
        (0, message_1.messageCustom)(res, messageTypes_1.OK, 'Monthly Average Balance', {
            MAB: ClosingBalance / NoOfDates,
            results,
            NoOfDates
        });
    }
    catch (error) {
        (0, message_1.messageError)(res, messageTypes_1.SERVER_ERROR, 'server error', error);
    }
}
exports.getMAB = getMAB;
//# sourceMappingURL=expense.controller.js.map