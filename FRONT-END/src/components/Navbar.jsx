import React from 'react'
import { FaGithub } from "react-icons/fa";

function Navbar() {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className='mycontainer flex items-center justify-between py-5 px-4 h-14'>
        <div className='logo font-bold text-2xl'>
          <span className='text-green-700'> &lt; / </span>
          Password
          <span className='text-green-700'> Store /&gt;</span>
        </div>
        <ul>
          {/* <li className='flex gap-4'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
            <a className='hover:font-bold' href="#">Home</a>
          </li> */}
        </ul>
        <button className='text-white font-semibold flex justify-center gap-2 box-border my-5 bg-green-00 hover:bg-blue-500 rounded-lg p-1 ring-white ring-1'>
          <FaGithub className=' h-[1.5rem]'/>
            Github
        </button>
      </div>
    </nav>
  )
}

export default Navbar
