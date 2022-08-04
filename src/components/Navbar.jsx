import React from 'react'

const Navbar = () => {
  return (
    <nav className='containerKu py-5 justify-between bg-transparent flex items-center'>
        <h1 className='text-xl font-semibold'>Twevvy🦜</h1>
        <button className='bg-sky-400 hover:bg-sky-500 py-2 px-6 font-semibold rounded text-white'>Login</button>
    </nav>
  )
}

export default Navbar