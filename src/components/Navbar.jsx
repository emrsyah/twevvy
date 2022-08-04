import React from 'react'

const Navbar = () => {
  return (
    <nav className='containerKu py-5 justify-between flex items-center'>
        <h1 className='text-xl font-semibold'>Twevvy🦜</h1>
        <button className='bg-teal-400 hover:bg-teal-500 py-2 px-6 font-semibold rounded text-white'>Try Now</button>
    </nav>
  )
}

export default Navbar