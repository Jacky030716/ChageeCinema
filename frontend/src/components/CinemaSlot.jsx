import React from 'react';
import TimeSlot from './TimeSlot';

const CinemaSlot = ({ cinema, times, state, selectedShowTime, onSelectShowTime }) => {
    return (
        <div className='flex flex-col border-b-[1px] border-gray-500 pb-8'>
            <h2 className='text-yellow-300 text-lg mb-4'>
                {cinema} - {state}
            </h2>
            <div className='flex gap-8 flex-wrap'>
                {times.map((showtime, idx) => (
                    <div key={idx} onClick={() => onSelectShowTime(showtime.time)}>
                        <TimeSlot time={showtime.time} type={showtime.hallType} selected={selectedShowTime} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CinemaSlot;
