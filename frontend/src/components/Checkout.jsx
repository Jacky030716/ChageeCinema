import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetch } from '../script/useFetch';
import TicketCounter from './TicketCounter';
import Navbar from './Navbar';
import { formatTime, getFullShowTime } from '../script/formatDate';
import LoadingSpinner from './LoadingSpinner'; // Assuming you have a LoadingSpinner component

const Checkout = () => {
    // Navigate
    const navigate = useNavigate();

    // Retrieve the state from the previous page
    const location = useLocation();
    let selectedSeats, movie, selectedDate, selectedHallType, selectedShowTime, showtime;
    if (location.state) {
        ({ selectedSeats, movie, selectedDate, selectedHallType, selectedShowTime, showtime } = location.state);
    }

    // Fetch ticket price based on the selected hall type
    const { data: ticketprice, error } = useFetch('http://localhost/Chagee%20Cinema/backend/fetchTicketPrice.php');

    // Track the ticket number
    const [adultTickets, setAdultTickets] = useState(0);
    const [childrenTickets, setChildrenTickets] = useState(0);
    const [studentTickets, setStudentTickets] = useState(0);

    // Get price for specific audience type
    const getTicketPrice = (audienceType, hallType) => {
        if (!ticketprice) return 0;
        const price = ticketprice.find(price => price.audienceType === audienceType && price.hallType === hallType);
        return price ? price.price : 0;
    };

    // Set the ticket price for each category
    const adultPrice = getTicketPrice('Adult', selectedHallType);
    const childrenPrice = getTicketPrice('Children', selectedHallType);
    const studentPrice = getTicketPrice('Student', selectedHallType);

    // Calculate total price
    const totalPrice = (adultTickets * adultPrice) + (childrenTickets * childrenPrice) + (studentTickets * studentPrice);

    const totalTickets = adultTickets + childrenTickets + studentTickets;

    // Check if the total tickets exceed the selected seats
    useEffect(() => {
        if (totalTickets > selectedSeats.length) {
            alert('You have selected more tickets than seats');
            setAdultTickets(0);
            setChildrenTickets(0);
            setStudentTickets(0);
        }
    }, [adultTickets, childrenTickets, studentTickets, selectedSeats]);

    // Prepare the ticket counts to be passed to the next route
    const ticketCounts = [
        { type: 'Adult', count: adultTickets > 0 ? adultTickets : 0 },
        { type: 'Children', count: childrenTickets > 0 ? childrenTickets : 0 },
        { type: 'Student', count: studentTickets > 0 ? studentTickets : 0 },
    ];

    // Display loading spinner if data is not available yet
    if (!ticketprice) {
        return <LoadingSpinner />;
    }

    // Display error message if fetching ticket prices fails
    if (error) {
        return <div>Error loading ticket prices: {error}</div>;
    }

    return (
        <div className='min-h-screen min-w-max flex flex-col bg-black'>
            <Navbar />
            {/* Ticket Type */}
            <div className='bg-yellow-400 h-fit flex px-12 pt-24 pb-6 items-center'>
                <img src={`data:image/jpeg;base64,${movie?.moviePoster}`} alt="Poster" className='w-32 h-38 mr-4 rounded-md'/>
                <div className='flex flex-col gap-4 h-40 justify-around'>
                    <div>
                        <h2 className='font-bold text-xl leading-none'>{movie?.movieTitle}</h2>
                        <span className='text-sm'>{movie?.language} | {movie?.duration} | {selectedHallType}</span>
                    </div>
                    <div className='flex flex-col justify-evenly h-2/3'>
                        <p className='flex items-center gap-2'>
                            <span className="material-symbols-outlined">pin_drop</span> 
                            {showtime?.state} - {showtime?.locationName}
                        </p>
                        <p className='flex items-center gap-2'>
                            <span className="material-symbols-outlined">camera_outdoor</span>
                            Hall {showtime?.hallID}
                        </p>
                        <p className='flex items-center gap-2'>
                            <span className="material-symbols-outlined">date_range</span>
                            {selectedDate && getFullShowTime(selectedDate)}, 
                            {selectedShowTime && formatTime(selectedShowTime)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Ticket Details */}
            <div className='bg-black h-fit px-12 py-6'>
                <div className='w-full border-b-2 border-gray-500 pb-4 mb-4'>
                    <h3 className='text-gray-400'>Seat(s)</h3>
                    <p className='text-white'>
                        {selectedSeats.join(', ')}
                    </p>
                </div>
                <div className='w-full border-b-2 border-gray-500 pb-4 mb-4'>
                    <h3 className='text-gray-400'>Ticket(s)</h3>
                    <p className='text-white'>{adultTickets ? `Adult x ${adultTickets}` : ''}</p>
                    <p className='text-white'>{childrenTickets ? `Children x ${childrenTickets}` : ''}</p>
                    <p className='text-white'>{studentTickets ? `Student x ${studentTickets}` : ''}</p>
                </div>
                <div className='w-full'>
                    <h3 className='text-gray-400'>Total Price</h3>
                    <p className='text-white'>RM {totalPrice.toFixed(2)}</p>
                </div>
            </div>

            {/* Select Ticket Type Component */}
            <div className='bg-zinc-900 h-fit px-12 py-6 rounded-t-2xl flex-1'>
                <h2 className='text-gray-400 text-2xl font-semibold mb-4'>Select Ticket Type</h2>
                <div className='flex flex-col gap-6 items-center'>
                    <div className='flex sm:flex-row flex-col sm:items-center items-start justify-start w-full gap-6'>
                        <TicketCounter label="Adult" count={adultTickets} setCount={setAdultTickets}/>
                        <TicketCounter label="Children" count={childrenTickets} setCount={setChildrenTickets}/>
                        <TicketCounter label="Student" count={studentTickets} setCount={setStudentTickets}/>
                    </div>

                    <button 
                        className='bg-yellow-300 w-1/3 py-2 rounded-lg font-bold hover:scale-105 transition-all duration-100 mt-1'
                        onClick={() => navigate('/payment/confirmation',
                            {
                                state: {
                                    selectedSeats,
                                    movie,
                                    selectedDate,
                                    selectedHallType,
                                    selectedShowTime,
                                    showtime,
                                    totalPrice,
                                    ticketCounts
                                }
                            }
                        )}
                        disabled={totalTickets !== selectedSeats.length}
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
