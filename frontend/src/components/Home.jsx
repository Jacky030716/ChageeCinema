import { useState } from 'react';
import { useFetch } from '../script/useFetch';
import Navbar from './Navbar';
import DateBox from './DateBox';
import PosterCarousel from './PosterCarousel';
import HallBox from './HallBox';
import CinemaSlot from './CinemaSlot';
import MovieModalBox from './MovieModalBox';
import LoadingSpinner from './LoadingSpinner';
import { groupShowtimesByLocation } from '../script/groupShowtimes';

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHallType, setSelectedHallType] = useState('');
    const [selectedShowTime, setSelectedShowTime] = useState('');
    
    const { data: movie, error: movieError } = useFetch('http://localhost/Chagee%20Cinema/backend/fetchMovieData.php');
    const { data: movieShowTimes, error: movieShowTimesError } = useFetch('http://localhost/Chagee%20Cinema/backend/fetchMovieShowTime.php');

    if (movieShowTimesError || movieError) {
        return <div>Error loading data: {movieShowTimesError || movieError}</div>;
    }

    if (!movieShowTimes || !movie) {
        return <LoadingSpinner />;
    }

    const groupedShowtimes = groupShowtimesByLocation(movieShowTimes, selectedDate, selectedHallType, activeIndex);

    const handleSelectShowTime = (time) => {
        setSelectedShowTime(time);
    };

    return (
        <div className='h-full w-auto bg-black'>
            {/* Navbar Section */}
            <Navbar />

            {/* Poster Carousel */}
            <div className='bg-black h-[600px] p-8 py-20'>
                <PosterCarousel activeIndex={activeIndex} setActive={setActiveIndex} />
            </div>

            {/* Select Date, Hall Type, Cinema Location based on matching activeindex and movieID */}
            <div className='bg-zinc-800 py-8 px-12'>
                {/* Select Date Based on selected movie */}
                <h2 className='text-white text-2xl font-semibold mb-4'>Select Date</h2>
                <div className='flex flex-wrap gap-6'>
                    {movieShowTimes.find(movie => (movie.movieID - 1) === activeIndex) === undefined && <p className='text-gray-500'>No showtimes available :(</p>}

                    {movieShowTimes.reduce((unique, movie) => {
                        if ((movie.movieID - 1) !== activeIndex) {
                            return unique;
                        }
                        return unique.includes(movie.showtimeDate) ? unique : [...unique, movie.showtimeDate];
                    }, []).map((showtimeDate, index) => (
                        <div key={index} onClick={() => setSelectedDate(showtimeDate)}>
                            <DateBox date={showtimeDate} selected={selectedDate} />
                        </div>
                    ))}
                </div>

                {/* Select Hall Type */}
                <h2 className='text-white text-2xl font-semibold mb-4 mt-8'>Select Hall Type</h2>
                <div className='flex gap-6'>
                    {/* No movies */}
                    {movieShowTimes.find(movie => (movie.movieID - 1) === activeIndex) === undefined && <p className='text-gray-500'>No showtimes available :(</p>}

                    {/* Render the hall type based on the movie selected */}
                    {movieShowTimes.reduce((unique, movie) => {
                        // If the movie ID does not match the active index, return the current unique array
                        if ((movie.movieID - 1) !== activeIndex) {
                            return unique;
                        }

                        // If the hall type is already in the unique array, return the current unique array
                        // Otherwise, return a new array with the current hall type added
                        return unique.includes(movie.hallType) ? unique : [...unique, movie.hallType];
                    }, []).map((hallType, index) => {
                        // Count the number of shows for the current hall type
                        const showCount = movieShowTimes.filter(movie => (movie.movieID - 1) === activeIndex && movie.showtimeDate === selectedDate && movie.hallType === hallType).length;

                        // If there is at least one show for the current hall type, render the HallBox
                        // Otherwise, render nothing
                        return showCount >= 1 ? (
                            <div key={index} onClick={() => setSelectedHallType(hallType)}>
                                <HallBox type={hallType} selected={selectedHallType} />
                            </div>
                        ) : null;
                    })}
                </div>
            </div>

            {/* Select Cinema Location */}
            <div className='bg-black py-8 px-12'>
                <h2 className='text-white text-2xl font-semibold mb-8'>Select Cinema & Times</h2>
                <div className='flex flex-col flex-wrap gap-8'>
                    {Object.keys(groupedShowtimes).length === 0 && <p className='text-gray-500'>No showtimes available :(</p>}

                    {Object.entries(groupedShowtimes).map(([locationName, { state, times }], index) => (
                        <div key={index}>
                            <CinemaSlot
                                cinema={locationName}
                                times={times}
                                state={state}
                                selectedShowTime={selectedShowTime}
                                onSelectShowTime={(time) => handleSelectShowTime(time)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {selectedDate && selectedHallType && Object.keys(selectedShowTime).length > 0 &&
                <MovieModalBox 
                    movie={movie.find(movie => (movie.movieID - 1) === activeIndex)}
                    showtime={movieShowTimes.find(movie => (movie.movieID - 1) === activeIndex && movie.showtimeDate === selectedDate && movie.hallType === selectedHallType)}
                    selectedDate={selectedDate}
                    selectedHallType={selectedHallType}
                    selectedShowTime={selectedShowTime}
                />
            }
        </div>
    );
};

export default Home;
