import React, { useEffect, useState } from 'react';
import { Logo, Profile } from '../images';
import { fetchSessionData } from '../script/fetchSessionData';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../script/useFetch';

const AdminNavbar = () => {
    const [adminData, setAdminData] = useState(null); // Initialize to null for proper loading state handling
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const getSessionData = async () => {
            const result = await fetchSessionData();
            if (result.success) {
                setAdminData(result.data);
            }
        };

        getSessionData();
    }, []);

    // Fetch user data when userData.userID changes
    const { data: admin, error } = useFetch(adminData ? `http://localhost/Chagee%20Cinema/backend/getAdminData.php?adminID=${adminData.adminID}` : null);

    const handleLogout = async () => {
        const response = await fetch("http://localhost/Chagee%20Cinema/backend/logout.php", {
            method: "GET",
            credentials: "include"
        });
        const data = await response.json();
        if (data.status === "success") {
            navigate("/admin/login");
        } else {
            console.error("Logout failed:", data.message);
        }
    };

    return (
        <nav className="fixed bg-zinc-800 flex items-center justify-between h-[80px] p-8 w-full z-10 shadow-sm shadow-gray-500">
            {/* Logo */}
            <a href="/admin/index" className='flex items-center'>
                <img src={Logo} alt="Cinema Logo" className='w-32 h-32'/>
                <span className="text-white font-bold italic font-mono md:text-lg lg:block hidden">Chagee Cinema</span>
            </a>

            {/* Quick Links */}
            <div className='lg:flex hidden'>
                <ul className='flex items-center gap-8 text-white md:text-sm'>
                    <li className='nav-item hover:text-yellow-300 cursor-pointer'><a href="/admin/index/addMovie">Add New Movie</a></li>
                    <li className='nav-item hover:text-yellow-300 cursor-pointer'><a href="/admin/index/viewBooking">View Booking</a></li>
                    <li className='nav-item hover:text-yellow-300 cursor-pointer'><a href="/admin/index/editMovie">Edit Movie</a></li>
                </ul>
            </div>

            {/* Profile Account */}
            
            <div className='flex items-center gap-4'>
                <div className='lg:flex hidden items-center'>
                    {admin ? 
                    <>
                    <a href="/admin/index" className='flex items-center gap-4'>
                        <img src={Profile} alt="Profile Picture" className='h-8 w-8'/>
                        <span className='text-white'>{admin.adminUsername}</span>
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
                        <a href="/admin/login">Login</a>
                    </button>
                    }
                    
                </div>
            </div>

            <button 
                className='lg:hidden text-white'
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span className="material-symbols-outlined">
                    menu
                </span>
            </button>

            {/* Hamburger menu */}
            {
                menuOpen && 
                <div className='lg:hidden fixed w-full top-20 right-0 bg-zinc-900 px-12 py-6 rounded-lg z-10 shadow-md shadow-white'>
                    <ul className='flex flex-col items-center gap-8 text-white'>
                        <li className='hover:text-yellow-300 cursor-pointer'><a href="/admin/index/addMovie">Add New Movie</a></li>
                        <li className='hover:text-yellow-300 cursor-pointer'><a href="/admin/index/viewBooking">View Booking</a></li>
                        <li className='hover:text-yellow-300 cursor-pointer'><a href="/admin/index/editMovie">Edit Movie</a></li>
                        {admin ? 
                            <>
                                <button 
                                    className='bg-white px-4 py-1 text-red-500 rounded-md shadow flex items-center gap-2'
                                    onClick={handleLogout}
                                >
                                    <span className="material-symbols-outlined">logout</span>
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
}

export default AdminNavbar