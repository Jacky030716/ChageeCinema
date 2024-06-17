import React from 'react'
import Navbar from './Navbar'
import ProfileCard from './ProfileCard'

const MyTickets = () => {
  return (
    <div className='h-screen w-full bg-zinc-700'>
        <Navbar />
        <div className='flex pt-32 px-12 gap-4'>
            <div className='flex flex-col gap-4 w-full'>
                <ProfileCard />
                <div className='bg-zinc-900 rounded-md w-1/5 px-4 py-6'>
                    <h2 className='text-white'>Settings</h2>
                    <a href="/forgotpassword" className='flex w-full justify-between mt-4'>
                        <p className='text-gray-500 text-sm'>Change Password</p>
                        <span className="material-symbols-outlined text-gray-500 text-md"> 
                            arrow_forward
                        </span>
                    </a>
                </div>
            </div>
            
            {/* Tickets List */}
            <div className='bg-black'>

            </div>
        </div>
    </div>
  )
}

export default MyTickets