import { useNavigate } from 'react-router-dom';
import { formatTime, getFullShowTime } from '../script/formatDate';
import { useEffect, useState } from 'react';
import { fetchSessionData } from '../script/fetchSessionData';

const MovieModalBox = ({ movie, selectedDate, selectedHallType, selectedShowTime, showtime }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getSessionData = async () => {
            const result = await fetchSessionData();
            if (result.success) {
                setUserData(result.data);
            }
        };
    
        getSessionData();
    }, []);

    return (
        <>
            <div className='flex justify-center'>
                <button
                    className="bg-yellow-300 text-black hover:bg-yellow-200 hover:scale-110 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none mr-1 mb-4 ease-linear transition-all duration-150 lg:w-1/4 w-1/2"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Confirm Details
                </button>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none shadow-xl"
                    >
                        <div className="relative my-6 mx-auto max-h-[50%] min-w-[400px]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col max-w-xl bg-black outline-none focus:outline-none"> 
                                {/*header*/}
                                <div className="flex items-start justify-between p-6 border-b border-solid border-blueGray-200 rounded-t relative">
                                    <div className='flex flex-col items-center justify-center text-white w-full'>
                                        <img src={`data:image/jpeg;base64,${movie.moviePoster}`} alt="Poster" className='w-1/3 border-2 border-yellow-300 rounded-md absolute left-1/2 translate-x-[-50%] top-[-50%] h-[156px]'/>
                                        <div className='flex flex-col justify-center items-center pt-16 w-full'>
                                            <h2 className='font-semibold mt-2 text-wrap break-words'>{movie.movieTitle}</h2>
                                            <p className='text-sm'><span>{movie.duration}</span> | <span>{movie.language}</span></p>
                                            <p className='font-bold'>{selectedHallType}</p>
                                        </div>
                                    </div>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none absolute right-2 top-2"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-gray-500 opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            x
                                        </span>
                                    </button>
                                </div>

                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className='mb-4'>
                                        <p className='text-gray-400'>Cinema</p>
                                        <p className='text-yellow-300'>{showtime.state} - {showtime.locationName}</p>
                                    </div>
                                    <div className='mb-4'>
                                        <p className='text-gray-400'>Hall</p>
                                        <p className='text-yellow-300'>{showtime.hallID}</p>
                                    </div>
                                    <div>
                                        <p className='text-gray-400'>Time & Date</p>
                                        <p className='text-yellow-300'>{getFullShowTime(selectedDate)}, {formatTime(selectedShowTime)}</p>
                                    </div>
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-yellow-300 text-black active:bg-yellow-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full"
                                        onClick={() => {
                                            if (userData === null) {
                                                setModalIsOpen(true);
                                                setTimeout(() => {
                                                    setModalIsOpen(false);
                                                    navigate('/login');
                                                },1500);
                                            } else {
                                                navigate('/seat', { state: { movie, selectedDate, selectedHallType, selectedShowTime, showtime }});
                                            }
                                        }}
                                    >
                                        Select Seats
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    {modalIsOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                                <h2 className="text-2xl font-bold mb-4">You haven't login yet!</h2>
                                <p className="text-lg">You will be redirected to the login page shortly.</p>
                            </div>
                        </div>
                    )}
                </>
            ) : null}
        </>
    );
}

export default MovieModalBox;
