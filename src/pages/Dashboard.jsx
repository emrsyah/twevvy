import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  return (
    <>
        <Helmet>
            <title>Dashboard | Twevvy</title>
        </Helmet>
        <Navbar />
        <div className='containerKu'>
            Dashboard
        </div>
    </>
  )
}

export default Dashboard