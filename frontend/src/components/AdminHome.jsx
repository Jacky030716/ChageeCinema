import AdminNavbar from './AdminNavbar'
import AdminAddMovie from './AdminAddMovie'
import AdminEditMovie from './AdminEditMovie'
import BookingList from './AdminBookingList'
import AdminPosterCarousel from './AdminPosterCarousel'
import { useState } from 'react'
import AdminSetShowtime from './AdminSetShowtime'
import { useLocation } from 'react-router-dom'

const AdminHome = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const location = useLocation();

    return (
        <div className='min-h-screen w-auto bg-zinc-900'>
            <AdminNavbar />

            {/* Poster Carousel */}
            {location.pathname === '/admin/index' && (
                <div className='bg-black h-[670px] p-8 py-20'>
                    <AdminPosterCarousel activeIndex={activeIndex} setActive={setActiveIndex} />
                </div>
            )}
            
            {/* Add New Movie */}
            {location.pathname === '/admin/index/addMovie' && (
                <div className='w-full px-12 py-6'>
                    <AdminAddMovie />
                </div>
            )}

            {/* View Booking */}
            {location.pathname === '/admin/index/viewBooking' && (
                <div className='w-full px-12 py-6'>
                    <BookingList />
                </div>
            )}

            {/* Edit Movie */}
            {location.pathname === '/admin/index/editMovie' && (
                <div className='w-full px-12 py-6'>
                    <AdminEditMovie />
                </div>
            )}

            {/* Add Showtime */}
            {location.pathname === '/admin/index/setShowtime' && (
                <div className='w-full px-12 py-6'>
                    <AdminSetShowtime />
                </div>
            )}
        </div>
  )
}

export default AdminHome