import React from 'react'
import menuIcon from  '../../assets/menu.svg'

export default function Navbar() {
  return (
    <nav className='flex justify-between p-4 text-grey-400'>
        <button>
            <img src={menuIcon} alt="" />
        </button>
        <span>Today - 11 Oct</span>
        <span></span>
    </nav>

    
  )
}
