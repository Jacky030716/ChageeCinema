import React from 'react';
import '../css/Navbar.css';
import { Logo, Profile } from '../images';

const Navbar = () => {
    return (
        <nav className="bg-zinc-800 flex items-center justify-between h-[80px] p-8 fixed w-full z-10 shadow-sm shadow-gray-500">
            {/* Logo */}
            <a href="/" className='flex items-center'>
                <img src={Logo} alt="Cinema Logo" className='w-32 h-32'/>
                <span className="text-white font-bold italic font-mono md:text-lg lg:block hidden">Cinema Booking System</span>
            </a>

            {/* Quick Links */}
            <div>
                <ul className='flex items-center gap-8 text-white'>
                    <li className='nav-item hover:text-yellow-300 cursor-pointer'><a href="/">Showtime by Movies</a></li>
                    <li className='nav-item hover:text-yellow-300 cursor-pointer'><a href="/mytickets">My Tickets</a></li>
                </ul>
            </div>

            {/* Profile Account */}
            <div className='flex items-center gap-4'>
                <img src={Profile} alt="Profile Picture" className='h-8 w-8'/>
                <span className='text-white'>Name</span>
            </div>
        </nav>
    );
};

export default Navbar;
