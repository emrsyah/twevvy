import React from 'react'
import { Icon } from '@iconify/react';

const Navbar = () => {
  return (
    <nav className='containerKu py-5 justify-between bg-transparent flex items-center'>
        <h1 className='text-xl font-bold'>Twevvy🦜</h1>
        <button className='bg-sky-400 hover:bg-sky-500 py-2 flex items-center gap-2 px-6 font-semibold rounded text-white'>
            <p>Login</p>
            <Icon icon="akar-icons:arrow-right" width={18} />
        </button>
    </nav>
  )
}

export default Navbar