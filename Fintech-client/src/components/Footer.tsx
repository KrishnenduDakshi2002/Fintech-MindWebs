import React from 'react'
import {MdCopyright} from 'react-icons/md'
export const Footer = () => {
  return (
    <div className='bg-white w-full h-full rounded-xl p-7'>
      <div className="flex items-center">
        <MdCopyright color='gray' size={22}/>
        <p className='px-5'>2023</p>
        <p className='pl-10'>Made By FinTech Labs</p>
      </div>
    </div>
  )
}
