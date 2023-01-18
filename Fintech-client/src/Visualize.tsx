import React from 'react'
import { ExpenseTile } from './components/ExpenseList'

const Visualize = () => {
  return (
    <div className='grid grid-cols-2 w-full h-full'>
      <div className=""></div>
      <div className="bg-pink-400 grid grid-flow-row overflow-y-scroll h-[20rem]">
        {
          Array.from({length:20},(v,i)=> <ExpenseTile id={i}/>)
        }
      </div>
    </div>
  )
}

export default Visualize