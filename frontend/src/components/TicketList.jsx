import React, { useState } from 'react'
import { formatTime, getFullShowTime } from '../script/formatDate'

const TicketList = ({ tickets, userData }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleCancelBooking = async (bookingID, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost/Chagee%20Cinema/backend/cancelBooking.php?userID=${userData.userID}&bookingID=${bookingID}`, {
                method: "DELETE",
                headers: {
                    // Ensure correct Content-Type for form data
                    "Content-Type": "application/json",
                },
            });
    
            const data = await response.json();
    
            if (data.status == "success") {
                setModalIsOpen(true);
                setTimeout(() => {
                    setModalIsOpen(false);
                    window.location.href = "/profile"; 
                }, 2000);
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    console.log(tickets)
    
    return (
        <div className='lg:w-3/6 w-full h-fit bg-black p-4 rounded-md shadow shadow-slate-400 animate-fade-in'>
            <h1 className="text-white font-bold text-lg ml-4">Ticket List</h1>
            {tickets.length > 0 ? tickets.map((ticket, index) => (
                <div key={index} className='flex gap-4 px-4 py-4 border-b-[1px] border-b-gray-500'>
                    <img src={`data:image/jpeg;base64,${ticket.moviePoster}`} alt={ticket.movieTitle} className='w-24 h-30 rounded-md' />
                    <div className='flex flex-col w-full'>
                        <h2 className='text-white'>{ticket.movieTitle} <span className='text-yellow-300 text-sm ml-2'>{ticket.locationName}</span></h2>
                        <p className='text-gray-400 text-sm'>{getFullShowTime(ticket.showtimeDate)} | {formatTime(ticket.showtime)} | {ticket.hallID}</p>
                        <p className='text-gray-500 text-sm'>Seat Number: {ticket.seatNumber}</p>
                        <button 
                            className='bg-yellow-300 w-full lg:w-1/2 mt-4 rounded-full py-1 text-sm font-semibold hover:bg-yellow-200 duration-100 transition-all hover:scale-105'
                            onClick={(e) => handleCancelBooking(ticket.bookingID, e)}
                        >
                                
                                Cancel Booking
                        </button>
                    </div>          
                </div>
            )) : (
                <p className="text-gray-500 text-center mt-4">No tickets found.</p>
            )}

            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl text-red-500 font-bold mb-4">You had cancel booking succesfully :(</h2>
                        <p className="text-lg">You will be redirected to the profile page shortly.</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TicketList