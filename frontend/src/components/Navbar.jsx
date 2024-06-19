import React, { useEffect, useState } from 'react';
import { Logo, Profile } from '../images';
import { fetchSessionData } from '../script/fetchSessionData';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../script/useFetch';

const Navbar = () => {
    const [userData, setUserData] = useState(null); // Initialize to null for proper loading state handling
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const getSessionData = async () => {
            const result = await fetchSessionData();
            if (result.success) {
                setUserData(result.data);
            }
        };

        getSessionData();
    }, []);

    // Fetch user data when userData.userID changes
    const { data: user, error } = useFetch(userData ? `http://localhost/Chagee%20Cinema/backend/getUserData.php?userID=${userData.userID}` : null);

    const handleLogout = async () => {
        const response = await fetch("http://localhost/Chagee%20Cinema/backend/logout.php", {
            method: "GET",
            credentials: "include"
        });
        const data = await response.json();
        if (data.status === "success") {
            navigate("/login");
        } else {
            console.error("Logout failed:", data.message);
        }
    };

    return (
        <nav className="bg-zinc-800 flex items-center justify-between h-[80px] p-8 fixed w-full z-10 shadow-sm shadow-gray-500">
            {/* Logo */}
            <a href="/" className='flex items-center'>
                <img src={Logo} alt="Cinema Logo" className='w-32 h-32'/>
                <span className="text-white font-bold italic font-mono md:text-lg lg:block hidden">Chagee Cinema</span>
            </a>

            {/* Quick Links */}
            <div className='md:flex hidden'>
                <ul className='flex items-center gap-8 text-white'>
                    <li className='nav-item hover:text-yellow-300 cursor-pointer'><a href="/">Showtime by Movies</a></li>
                    <li className='nav-item hover:text-yellow-300 cursor-pointer'><a href={`${user ? '/profile' : '/login'}`}>My Profile</a></li>
                </ul>
            </div>

            {/* Profile Account */}
            
            <div className='flex items-center gap-4'>
                <div className='md:flex hidden items-center'>
                    {user ? 
                    <>
                    <a href="/profile" className='flex items-center gap-4'>
                        <img src={Profile} alt="Profile Picture" className='h-8 w-8'/>
                        <span className='text-white'>{user?.name}</span>
                    </a> 
                        <button 
                            className='text-white ml-6 hover:text-yellow-300'
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                    :
                    <button 
                    className='text-white ml-6 hover:text-yellow-300'
                    >
                        <a href="/login">Login</a>
                    </button>
                    }
                    
                </div>
            </div>

            <button 
                className='md:hidden text-white'
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span class="material-symbols-outlined">
                    menu
                </span>
            </button>

            {/* Hamburger menu */}
            {
                menuOpen && 
                <div className='md:hidden fixed w-full top-20 right-0 bg-zinc-900 px-12 py-6 rounded-lg z-10 shadow-md shadow-white'>
                    <ul className='flex flex-col items-center gap-8 text-white'>
                        <li className='nav-item hover:text-yellow-300 cursor-pointer'><a href="/">Showtime by Movies</a></li>
                        <li className='nav-item hover:text-yellow-300 cursor-pointer'><a href="/profile">My Profile</a></li>
                        {user ? 
                            <>
                                <button 
                                    className='bg-white px-4 py-1 text-red-500 rounded-md shadow flex items-center gap-2'
                                    onClick={handleLogout}
                                >
                                    <span class="material-symbols-outlined">logout</span>
                                    Logout
                                </button>
                            </>
                            :
                            <button 
                            className='text-white hover:text-yellow-300'
                            >
                                <a href="/login">Login</a>
                            </button>
                            }
                    </ul>
                </div>
            }
        </nav>
    );
};

export default Navbar;
