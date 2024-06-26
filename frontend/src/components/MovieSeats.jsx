import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetch } from '../script/useFetch';

const MovieSeats = () => {
    const [seats, setSeats] = useState(Array(50).fill('available'));
    const navigate = useNavigate();
    const location = useLocation();

    const { movie, selectedDate, selectedHallType, selectedShowTime, showtime } = location.state;

    // Fetch seat status
    const { data: seatData, error } = useFetch(`http://localhost/Chagee%20Cinema/backend/fetchSeatStatus.php?showID=${showtime.showID}`);

    // Update seats state based on fetched data
    useEffect(() => {
        if (seatData && seatData.length > 0) {
            const updatedSeats = [...seats];
            seatData.forEach(seat => {
                const seatNumbers = seat.seatNumber.split(', ');
                seatNumbers.forEach(seatNumber => {
                    const row = seatNumber.charCodeAt(0) - 65; // Convert row letter to index (A -> 0, B -> 1)
                    const col = parseInt(seatNumber.slice(1)) - 1; // Get column number (1-based to 0-based) (5 -> 4)
                    const seatIndex = row * 10 + col;
                    updatedSeats[seatIndex] = 'occupied';
                });
            });
            setSeats(updatedSeats);
        }
    }, [seatData]);

    const toggleSeat = (index) => {
        setSeats(
            seats.map((seat, i) => (i === index ? (seat === 'selected' ? 'available' : 'selected') : seat))
        );
    };

    // Function to render the seats
    const renderSeats = (start, end, rowLabel) => (
        <div className='flex gap-2 justify-center'>
            {seats.slice(start, end).map((seat, index) => (
                <button
                    key={index + start}
                    className={`lg:w-10 lg:h-10 w-8 h-8 rounded-full lg:text-lg text-xs ${
                        seat === 'available'
                            ? 'bg-white'
                            : seat === 'selected'
                            ? 'bg-yellow-300'
                            : 'bg-gray-500'
                    }`}
                    onClick={() => (seat === 'available' || seat === 'selected') && toggleSeat(index + start)}
                    disabled={seat === 'occupied'} // disable occupied seats
                >
                    {rowLabel}{(start + index) % 10 + 1}
                </button>
            ))}
        </div>
    );

    const getSeatLabel = (index) => {
        const row = Math.floor(index / 10);
        const seatNumber = (index % 10) + 1;
        const rowLabel = String.fromCharCode(65 + row);
        return `${rowLabel}${seatNumber}`;
    };

    const selectedSeatLabels = seats
        .map((seat, index) => (seat === 'selected' ? getSeatLabel(index) : null))
        .filter(seat => seat !== null);
    
    return (
        <div className="flex flex-col items-center min-w-max min-h-[100vh] bg-black">
            <div className="bg-zinc-800 h-[10%] shadow-white shadow-md text-white font-bold py-2 w-full mb-12 text-center flex items-center justify-center text-xl">SCREEN</div>
            <div className="flex items-center justify-center p-4 bg-black">
                <div className="flex flex-col gap-2 items-center">
                    {[...Array(5)].map((_, rowIndex) => (
                        <div key={rowIndex} className='flex items-center gap-6 w-full'>
                            <div className='basis-1/5'>{renderSeats(rowIndex * 10, rowIndex * 10 + 2, String.fromCharCode(65 + rowIndex))}</div>
                            <div className='basis-3/5'>{renderSeats(rowIndex * 10 + 2, rowIndex * 10 + 8, String.fromCharCode(65 + rowIndex))}</div>
                            <div className='basis-1/5'>{renderSeats(rowIndex * 10 + 8, rowIndex * 10 + 10, String.fromCharCode(65 + rowIndex))}</div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedSeatLabels.length > 0 ? (
                <div className="flex flex-col items-center gap-4 mt-4">
                    <h2 className="text-white text-xl leading-none">Selected Seats</h2>
                    <div className="flex gap-4 bg-slate-300 px-4 py-2 rounded-md">
                        {selectedSeatLabels.map((seat, index) => (
                            <span key={index} className="text-black font-bold">{seat}</span>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 mt-4">
                    <h2 className="text-white text-xl leading-none">Selected Seats</h2>
                    <div className="flex gap-4 bg-slate-300 px-4 py-2 rounded-md">
                        <span className="text-black font-bold">No seats selected</span>
                    </div>
                </div>
            
            )}
            <div className='flex sm:flex-row items-center justify-center gap-6 mt-8 w-1/2'>
                <div className='border-2 border-gray-400 px-6 py-2 flex items-center gap-3 shadow-gray-500 shadow-md rounded-md cursor-pointer'>
                    <div className='rounded-full bg-yellow-300 lg:w-6 lg:h-6 w-4 h-4'></div>
                    <span className='text-gray-300 lg:text-md text-sm'>Selected</span>
                </div>
                <div className='border-2 border-gray-400 px-6 py-2 flex items-center gap-3 shadow-gray-500 shadow-md rounded-md cursor-pointer'>
                    <div className='rounded-full bg-white lg:w-6 lg:h-6 w-4 h-4'></div>
                    <span className='text-gray-300 lg:text-md text-sm'>Available</span>
                </div>
                <div className='border-2 border-gray-400 px-6 py-2 flex items-center gap-3 shadow-gray-500 shadow-md rounded-md cursor-pointer'>
                    <div className='rounded-full bg-gray-500 lg:w-6 lg:h-6 w-4 h-4'></div>
                    <span className='text-gray-300 lg:text-md text-sm'>Occupied</span>
                </div>
            </div>
            <div className='flex w-full justify-center gap-2'>
                <button
                    className='lg:w-1/5 w-1/4 mt-12 px-6 py-2 font-semibold rounded-md bg-yellow-300 text-center hover:bg-yellow-200'
                    onClick={() => navigate('/')}
                >
                    Back
                </button>
                <button
                    className='lg:w-1/5 w-1/4 mt-12 px-6 py-2 font-semibold rounded-md bg-yellow-300 text-center hover:bg-yellow-200'
                    onClick={() => navigate('/payment', 
                        { state: { 
                            selectedSeats: selectedSeatLabels, 
                            movie, 
                            selectedDate, 
                            selectedHallType, 
                            selectedShowTime, 
                            showtime
                        }})}
                    disabled={selectedSeatLabels.length === 0}
                >
                    Proceed
                </button>
            </div>
            
        </div>
    );
};

export default MovieSeats;
