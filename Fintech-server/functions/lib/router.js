"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = __importStar(require("express"));
const auth_controller_1 = require("./Controllers/auth.controller");
const verifytoken_1 = __importDefault(require("./middleware/verifytoken"));
const expense_controller_1 = require("./Controllers/expense.controller");
const router = express.Router();
exports.router = router;
router.get('/', (req, res) => {
    res.json('welcome to Fintech REST API');
});
router.get('/get/userdetails', [verifytoken_1.default], auth_controller_1.getUserDetail);
router.get('/verifytoken', [verifytoken_1.default], auth_controller_1.verifyToken);
router.post('/login', auth_controller_1.LoginController);
router.post('/signup', auth_controller_1.SignUpController);
router.post('/post/expense', [verifytoken_1.default], expense_controller_1.addExpense);
router.get('/get/expense', [verifytoken_1.default], expense_controller_1.getExpenses);
router.get('/get/expense/month', [verifytoken_1.default], expense_controller_1.getExpenseByMonth);
router.get('/get/expense/analysis', [verifytoken_1.default], expense_controller_1.getAnalysisOfExpensesByWeek);
router.get('/get/expense/active', [verifytoken_1.default], expense_controller_1.getExpensesActiveSession);
//# sourceMappingURL=router.js.map