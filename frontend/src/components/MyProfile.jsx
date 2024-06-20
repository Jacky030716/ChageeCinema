import Navbar from './Navbar';
import ProfileCard from './ProfileCard';

import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import TicketList from './TicketList';
import { useLocation } from 'react-router-dom';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';

const MyProfile = () => {
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchSessionAndTickets = async () => {
            try {
                // Fetch session data
                const sessionResponse = await fetch("http://localhost/Chagee%20Cinema/backend/getSession.php", {
                    method: "GET",
                    credentials: "include",
                });
                const sessionResult = await sessionResponse.json();

                if (sessionResult.status === "success") {
                    setUserData(sessionResult);

                    // Fetch tickets based on userID
                    const ticketResponse = await fetch(`http://localhost/Chagee%20Cinema/backend/fetchTicket.php?userID=${sessionResult.userID}`);
                    const ticketResult = await ticketResponse.json();

                    if (ticketResponse.ok) {
                        setTickets(ticketResult);
                    } else {
                        setError("Failed to fetch tickets");
                    }
                } else {
                    setError("Failed to fetch session data");
                }
            } catch (error) {
                console.error("Error fetching session and ticket data:", error);
                setError("An error occurred while fetching session and ticket data");
            } finally {
                setLoading(false);
            }
        };

        fetchSessionAndTickets();
    }, []);

    if (loading) {
        return <LoadingSpinner />; // Add loading indicator
    }

    if (error) {
        return <p>{error}</p>; // Display error message
    }

    return (
        <div className='min-h-screen w-full bg-zinc-700'>
            <Navbar />
            <div className='flex flex-col md:flex-row justify-center pt-32 px-12 gap-4 w-full'>
                <div className='flex flex-col gap-4 lg:w-1/5 w-full animate-fade-in'>
                    <ProfileCard userData={userData} />
                    <div className='bg-zinc-900 rounded-md w-full px-4 py-6 shadow shadow-slate-400'>
                        <h2 className='text-white'>Quick Links</h2>
                        <a href="/profile/forgotpassword" className='flex w-full justify-between mt-4'>
                            <p className='text-gray-500 text-sm'>Change Password</p>
                            <span className="material-symbols-outlined text-gray-500 text-md"> 
                                arrow_forward
                            </span>
                        </a>
                        <a href="/profile/mytickets" className='flex w-full justify-between mt-4'>
                            <p className='text-gray-500 text-sm'>View Tickets</p>
                            <span className="material-symbols-outlined text-gray-500 text-md"> 
                                arrow_forward
                            </span>
                        </a>
                    </div>
                </div>

                {/* Tell user to use the quick links */}
                {location.pathname === '/profile' && (
                    <div className='flex flex-col items-center justify-center lg:w-3/6 w-full bg-black p-4 rounded-md shadow shadow-slate-400 animate-fade-in'>
                        <h1 className="text-white font-bold text-xl">Welcome! Explore your profile here</h1>
                        <p className="text-gray-500 text-center">Use the quick links to manage your profile</p>
                </div>
                )}

                {/* Tickets List */}
                {location.pathname === '/profile/mytickets' && (
                    <TicketList tickets={tickets} userData={userData} />
                )}

                {/* Edit Profile */}
                {location.pathname === '/profile/editprofile' && (
                    <EditProfile userData={userData}/>
                )}

                {/* Change Password */}
                {location.pathname === '/profile/forgotpassword' && (
                    <ChangePassword userData={userData}/>)    
                }
                
            </div>
        </div>
    );
}

export default MyProfile;
