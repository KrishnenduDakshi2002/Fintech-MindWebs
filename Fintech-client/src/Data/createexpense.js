import axios from 'axios';
import Expenses from './EXPENSES.json' assert { type : 'json'};

function AddExpense(description,
    date,
    amount,
    cashFlow,
    moneyType){
      axios.post(`http://localhost:3000/api/post/expense`,{
        description,
        amount: amount.toString(),
        cashFlow,
        moneyType,
        date
      },{
        headers: {
          'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M3ZmM2OTgyY2VlMjM2ZmJmYmE0MzIiLCJpYXQiOjE2NzQwNjQ3NTQsImV4cCI6MTY3NDE1MTE1NH0.y12UhqnLsavcqJ6ECvSXOuGx2tHX_yG7HSlrikBbDSE`
        }
      }).then(response => console.log(response)).catch(e=>console.log(e))
  }

  Expenses.map(expense => AddExpense(expense.description,new Date(expense.date),+expense.amount,expense.cashFlow,expense.moneyType))
