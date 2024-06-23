export const groupShowtimesByLocation = (showtimes, selectedDate, selectedHallType, activeIndex) => {
    const grouped = {};

    // Sort the showtimes first by showtimeDate, then by showtime
    showtimes.sort((a, b) => {
        if (a.showtimeDate < b.showtimeDate) return -1;
        if (a.showtimeDate > b.showtimeDate) return 1;
        // Dates are equal, compare showtime
        return a.showtime - b.showtime;
    });

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