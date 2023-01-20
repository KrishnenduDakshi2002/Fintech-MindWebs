import {z} from 'zod';

export const ExpenseValidator = z.object({
    description: z.string(),
    date: z.string(),
    amount: z.string(),
    cashFlow: z.string(),
    moneyType: z.string(),
})