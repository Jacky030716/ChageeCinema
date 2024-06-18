import React from 'react'
import { formatTime, getFullShowTime } from '../script/formatDate'

const TicketList = ({ tickets }) => {
  return (
    <div className='lg:w-3/6 w-full h-fit bg-black p-4 rounded-md shadow shadow-slate-400 animate-fade-in'>
        <h1 className="text-white font-bold text-lg ml-4">Ticket List</h1>
        {tickets.length > 0 ? tickets.map((ticket, index) => (
            <div key={index} className='flex gap-4 px-4 py-4 border-b-[1px] border-b-gray-500'>
                <img src={`data:image/jpeg;base64,${ticket.moviePoster}`} alt={ticket.movieTitle} className='w-24 h-30 rounded-md' />
                <div className='flex flex-col w-full'>
                    <h2 className='text-white'>{ticket.movieTitle}</h2>
                    <p className='text-gray-500 text-sm'>{getFullShowTime(ticket.showtimeDate)} | {formatTime(ticket.showtime)}</p>
                    <button className='bg-yellow-300 w-full lg:w-1/2 mt-4 rounded-full py-1 text-sm font-semibold hover:bg-yellow-200 duration-100 transition-all hover:scale-105'>View Ticket</button>
                </div>          
            </div>
        )) : (
            <p className="text-gray-500 text-center mt-4">No tickets found.</p>
        )}
    </div>
  )
}

export default TicketList