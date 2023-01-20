"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ExpenseSchema = new mongoose_1.default.Schema({
    userid: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user'
    },
    description: String,
    date: Date,
    amount: Number,
    cashFlow: String,
    moneyType: String,
}, {
    timestamps: true
});
exports.ExpenseModel = mongoose_1.default.model('expense', ExpenseSchema);
//# sourceMappingURL=expense.model.js.map