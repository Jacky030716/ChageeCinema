import { useState } from 'react'
import { useFetch } from '../script/useFetch'

import Navbar from './Navbar'
import DateBox from './DateBox'
import PosterCarousel from './PosterCarousel'
import HallBox from './HallBox'
import CinemaSlot from './CinemaSlot'
import MovieModalBox from './MovieModalBox'

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const [selectedDate, setSelectedDate] = useState('')
    const [selectedHallType, setSelectedHallType] = useState('')
    const [selectedShowTime, setSelectedShowTime] = useState('')

    const { data: movieShowTimes, error } = useFetch('http://localhost/Chagee%20Cinema/backend/fetchMovieShowTime.php');
    const { data: movie, movieError } = useFetch('http://localhost/Chagee%20Cinema/backend/fetchMovieData.php');

    return (
        <div className='h-full w-auto bg-black'>
            {/* Navbar Section */}
            <Navbar />

            {/* Poster Carousel */}
            <div className='bg-black h-[600px] p-8 py-20'>
                <PosterCarousel activeIndex={activeIndex} setActive={setActiveIndex}/>
            </div>

            {/* Select Date, Hall Type, Cinema Location based on matching activeindex and movieID */}
            <div className='bg-zinc-800 py-8 px-12'>
                {/* Select Date Based on selected movie */}
                <h2 className='text-white text-2xl font-semibold mb-4'>Select Date</h2>
                <div className='flex gap-6'>
                    {movieShowTimes.find(movie => (movie.movieID - 1) === activeIndex) === undefined && <p className='text-gray-500'>No showtimes available :(</p>}
                    {movieShowTimes.map((movie, index) => (
                        (movie.movieID - 1) === activeIndex &&
                        <div key={index}
                            onClick={() => setSelectedDate(movie.showtimeDate)}
                        >
                            <DateBox date={movie.showtimeDate} selected={selectedDate}/>
                        </div>
                    ))}
                </div>

                {/* Select Hall Type */}
                <h2 className='text-white text-2xl font-semibold mb-4 mt-8'>Select Hall Type</h2>
                <div className='flex gap-6'>
                    {/* No movies */}
                    {movieShowTimes.find(movie => (movie.movieID - 1) === activeIndex) === undefined && <p className='text-gray-500'>No showtimes available :(</p>}

                    {/* Render the halltype based on the movie selected */}
                    {movieShowTimes.reduce((unique, movie) => {
                    if ((movie.movieID - 1) !== activeIndex) {
                        return unique;
                    }
                        return unique.includes(movie.hallType) ? unique : [...unique, movie.hallType];
                    }, []).map((hallType, index) => (
                        <div key={index} 
                            onClick={() => setSelectedHallType(hallType)}
                        >
                            <HallBox type={hallType} selected={selectedHallType}/>
                        </div>
                    ))}
                </div>
            </div>

            {/* Select Cinema Location */}
            <div className='bg-black py-8 px-12'>
                <h2 className='text-white text-2xl font-semibold mb-8'>Select Cinema & Times</h2>
                <div className='flex flex-col gap-8'>
                    {movieShowTimes.find(movie => (movie.movieID - 1) === activeIndex) === undefined && <p className='text-gray-500'>No showtimes available :(</p>}
                    {movieShowTimes.map((movie, index) => (
                        (movie.movieID - 1) === activeIndex && movie.showtimeDate === selectedDate && movie.hallType === selectedHallType &&

                        // Render the cinema slot based on the selected date and hall type
                        <div
                            key={index}
                            onClick={() => setSelectedShowTime(movie.showtime)}
                        >
                            <CinemaSlot cinema={movie.locationName} time={movie.showtime} hallType={movie.hallType} state={movie.state} selected={selectedShowTime}/>
                        </div>
                        
                    ))}
                </div>
            </div>
            
            {selectedDate && selectedHallType && selectedShowTime &&
                <MovieModalBox 
                    movie={movie.find(movie => (movie.movieID - 1) === activeIndex)}
                    showtime={movieShowTimes.find(movie => (movie.movieID - 1) === activeIndex && movie.showtimeDate === selectedDate && movie.hallType === selectedHallType && movie.showtime === selectedShowTime)}
                    selectedDate={selectedDate}
                    selectedHallType={selectedHallType}
                    selectedShowTime={selectedShowTime}
                />
            }
            
        </div>
    )
}

export default Home