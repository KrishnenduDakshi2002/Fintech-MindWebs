import * as fs from 'fs';
import Expenses from './EXPENSES.json' assert { type : 'json'};


function WriteToFile(filename,content){
    fs.writeFileSync(filename,JSON.stringify(content),'utf-8',(e)=>{
        console.log(e);
    })
}

const newval = Expenses;


newval.sort((a,b)=> new Date(b.date) - new Date(a.date));

WriteToFile('./EXPENSES.json',newval);