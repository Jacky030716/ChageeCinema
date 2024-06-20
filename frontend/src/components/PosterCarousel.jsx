import { useEffect, useState } from 'react';
import axios from 'axios'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function MovieSwiper({ activeIndex, setActive }) {
  const [swiper, setSwiper] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/Chagee%20Cinema/backend/fetchMovieData.php')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setMovies(response.data);
        } else {
          console.error('Fetched data is not an array:', response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        setActive(swiper.activeIndex);
      });
    }
  }, [swiper]);

  const handleSlideClick = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  return (
    <Swiper
      onSwiper={setSwiper}
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
      effect={'coverflow'}
      coverflowEffect={{
        rotate: 25,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 100,
        },
      }}
      slidesPerView={5}
      spaceBetween={50}
      navigation
      centeredSlides={true}
    >
      {movies.map((movie, index) => {
        return(
        <SwiperSlide key={index} onClick={() => handleSlideClick(index)}>
          <div className='mt-8 flex flex-col items-center justify-center'>
            <div
              className={`cursor-pointer transition-opacity duration-300 ${
                activeIndex === index ? 'opacity-100' : 'opacity-20'
              }`}
            >
              <img src={`data:image/jpeg;base64,${movie.moviePoster}`} alt={movie.movietiTle} className={`${activeIndex === index ? 'border-2 border-yellow-300' : ''} object-cover xl:h-[405px] xl:min-w-[300px] lg:min-w-[260px] w-[360px] h-[400px] rounded-md`} />
              <div className={`flex flex-col justify-center items-center mt-2 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className='text-white text-center font-semibold text-xs'>{movie.movieTitle.toUpperCase()}</h3>
                <span className='text-white text-sm'>{movie.duration} | {movie.language}</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
      })}
    </Swiper>
  );
}
