const CurrentDate = new Date();

const INITIAL_STATE ={
    description: "",
    currency : "rupee",
    cashFlow : "credit",
    amount : 0,
    date : new Date(CurrentDate.getFullYear(),CurrentDate.getMonth(),CurrentDate.getDate()),
}

export interface Expense{
    description: string;
    currency : string;
    cashFlow : string;
    amount : number,
    date : Date;
}

export interface DispatchAction{
    type: string;
    payload: any;
}

const AddExpenseActionTypes={
    DESCRIPION: 'DESCRIPTION',
    CURRENCY : 'CURRENCY',
    CASHFLOW : 'CASHFLOW',
    AMOUNT: 'AMOUNT',
    DATE : 'DATE',
    CLEAR : 'CLEAR'
}

function AddExpenseDispatchFunction(state:Expense,action:DispatchAction){
 switch(action.type){
    case AddExpenseActionTypes.DESCRIPION :
        return {...state,description: action.payload};
    case AddExpenseActionTypes.CURRENCY :
        return {...state,currency: action.payload};
    case AddExpenseActionTypes.CASHFLOW :
        return {...state,cashFlow: action.payload};
    case AddExpenseActionTypes.AMOUNT :
        return {...state,amount: action.payload};
    case AddExpenseActionTypes.DATE :
        return {...state,date: action.payload};
    case AddExpenseActionTypes.CLEAR :
        return INITIAL_STATE;
    default : 
        return state;
 }
}

export {
    AddExpenseActionTypes,
    AddExpenseDispatchFunction,
    INITIAL_STATE
}