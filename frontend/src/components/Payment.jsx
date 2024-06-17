import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { formatTime, getFullShowTime } from "../script/formatDate";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { 
        selectedSeats,
        movie, 
        selectedDate, 
        selectedHallType, 
        selectedShowTime, 
        showtime, 
        totalPrice,
        ticketCounts
    } = location.state;

    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Make booking request to backend using async and await
    const makeBooking = async (bookingData) => {
        const response = await fetch('http://localhost/Chagee%20Cinema/backend/booking.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });
        const data = await response.text();
        return data;
    };

    // Handle payment and exception handling
    const handlePayment = async () => {
        const bookingData = {
            showID: showtime.showID,
            hallID: showtime.hallID,
            locationID: showtime.locationID,
            seatNumber: selectedSeats.join(', '),
            movieID: movie.movieID,
            totalPrice
        };
    
        try {
            const data = await makeBooking(bookingData);
            console.log(data);
            if (data === 'New record created successfully') {
                setModalIsOpen(true);
                setTimeout(() => {
                    setModalIsOpen(false);
                    navigate('/');
                }, 3000); // Close modal after 3 seconds and navigate to homepage
            } else {
                alert('Booking failed: ' + data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-8 w-full bg-black h-screen px-12 py-28">
                <div className="flex gap-8">
                    <div>
                        <img src={`data:image/jpeg;base64,${movie?.moviePoster}`} alt={movie.movieTitle} className="rounded-md border-2 border-yellow-300 min-h-1/2 max-h-[500px]"/>
                    </div>
                    <div className="w-full h-1/2 ">
                        {/* Movie Booking Details */}
                        <div className="w-full flex flex-col gap-4 border-b-[1px] pb-8 border-b-gray-500">
                            <div className="mb-4">
                                <h2 className="text-white text-xl">{movie.movieTitle}</h2>
                                <p className="text-gray-500 text-sm">{movie.language} | {movie.duration} | {selectedHallType}</p>
                            </div>
                            <div className="w-full gap-x-4 gap-y-6 flex flex-wrap">
                                <div className="basis-1/3">
                                    <p className="text-gray-500 text-md">Cinema</p>
                                    <p className="text-white text-md font-semibold">{showtime.state} - {showtime.locationName}</p>
                                </div>
                                <div className="basis-1/3">
                                    <p className="text-gray-500 text-md">Hall</p>
                                    <p className="text-white text-md font-semibold">Hall {showtime.hallID}</p>
                                </div>
                                <div className="basis-1/3">
                                    <p className="text-gray-500 text-md">Showtime</p>
                                    <p className="text-white text-md font-semibold">{getFullShowTime(selectedDate)}, {formatTime(selectedShowTime)}</p>
                                </div>
                                <div className="basis-1/3">
                                    <p className="text-gray-500 text-md">Seats</p>
                                    <p className="text-white text-md font-semibold">{selectedSeats.join(', ')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="flex flex-col w-full mt-4">
                            <h2 className="text-white text-2xl font-semibold mb-4">Payment Details</h2>
                            <div className="flex justify-between">
                                <div>
                                    <h2 className="text-gray-500">Ticket(s)</h2>
                                    {ticketCounts.map((ticket, index) => (
                                        <p key={index} className="text-white">{ticket.count > 0 ? `${ticket.type} x ${ticket.count}` : ''}</p>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-yellow-300">
                                        RM{totalPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button 
                    className="text-black bg-yellow-300 font-semibold w-1/3 mx-auto py-2 rounded-md hover:bg-yellow-200 duration-100 transition-all hover:scale-105"
                    onClick={handlePayment}
                >
                    Checkout And Pay
                </button>
            </div>

            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Booking Successful!</h2>
                        <p className="text-lg">Your booking has been confirmed. You will be redirected to the homepage shortly.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Payment;
