import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminAddMovie from './AdminAddMovie'
import PosterCarousel from './PosterCarousel'
import BookingList from './AdminBookingList'

const AdminHome = () => {
  return (
    <div className='min-h-screen w-auto bg-zinc-900'>
        <AdminNavbar />

        {location.pathname === '/admin/index/addMovie' && (
            <div className='w-full px-12 py-6'>
                <AdminAddMovie />
            </div>
        )}

      {location.pathname === '/admin/index/viewBooking' && (
            <div className='w-full px-12 py-6'>
                <BookingList />
            </div>
        )}
    </div>
  )
}

export default AdminHome