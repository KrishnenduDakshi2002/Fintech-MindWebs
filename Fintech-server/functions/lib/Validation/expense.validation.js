"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseValidator = void 0;
const zod_1 = require("zod");
exports.ExpenseValidator = zod_1.z.object({
    description: zod_1.z.string(),
    date: zod_1.z.string(),
    amount: zod_1.z.string(),
    cashFlow: zod_1.z.string(),
    moneyType: zod_1.z.string(),
});
//# sourceMappingURL=expense.validation.js.map