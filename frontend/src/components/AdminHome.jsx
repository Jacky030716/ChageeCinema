import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminAddMovie from './AdminAddMovie'
import PosterCarousel from './PosterCarousel'

const AdminHome = () => {
  return (
    <div className='min-h-screen w-auto bg-zinc-900'>
        <AdminNavbar />

        {location.pathname === '/admin/index/addMovie' && (
            <div className='w-full px-12 py-6'>
                <AdminAddMovie />
            </div>
        )}
    </div>
  )
}

export default AdminHome