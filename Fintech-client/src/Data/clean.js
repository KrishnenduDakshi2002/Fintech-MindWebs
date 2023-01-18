import * as fs from 'fs';
import Expenses from './EXPENSES.json' assert { type : 'json'};


function WriteToFile(filename,content){
    fs.writeFileSync(filename,JSON.stringify(content),'utf-8',(e)=>{
        console.log(e);
    })
}
const Currencies = [
    "rupee",
    "dollar"
]
const CashFlow = [
    "credit","debit"
]
function getRandom(maxVal){
    return Math.floor(Math.random() * maxVal);
}
const data = Expenses.map(e=>{
    const amount = e.amount.split('$')[1];
    const newAmount = (+amount)*100 + 0.90;
    const money_rand = getRandom(2) // 0,1,2
    const cashflow_rand = getRandom(2) // 0,1

    return {
        ...e,
        amount: newAmount.toFixed(2),
        cashFlow : CashFlow[cashflow_rand],
        moneyType : Currencies[money_rand],
        date : new Date(e.date)
    }

})

WriteToFile('./EXPENSES_FILTERED.json',data);