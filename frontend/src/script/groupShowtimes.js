export const groupShowtimesByLocation = (showtimes, selectedDate, selectedHallType, activeIndex) => {
    const grouped = {};

    showtimes.forEach((movie) => {
        if ((movie.movieID) === activeIndex && movie.showtimeDate === selectedDate && movie.hallType === selectedHallType) {
            if (!grouped[movie.locationName]) {
                grouped[movie.locationName] = {
                    state: movie.state,
                    times: []
                };
            }
            grouped[movie.locationName].times.push({time: movie.showtime, hallType: movie.hallType});
        }
    });

    return grouped;
};
