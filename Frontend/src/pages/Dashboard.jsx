import React from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {

  const { logoutUser } = useAuth();

  return (
    <div className='bg-zinc-800 text-white h-screen w-full'>
      Dashboard
      <button
        className='bg-blue-500 text-white px-3 py-2 rounded-md ml-2 font-semibold'
        onClick={logoutUser}>Logout User</button>
    </div>
  )
}

export default Dashboard