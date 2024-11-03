import React from 'react'
import { PiCopyrightThin } from "react-icons/pi";

function Footer() {
  return (
    <div className='flex justify-center items-center gap-1 italic bg-green-50'>
      <h1>Copyright </h1>
      <PiCopyrightThin />
      <h1>2024 Simson Parajuli</h1>
    </div>
  )
}

export default Footer
