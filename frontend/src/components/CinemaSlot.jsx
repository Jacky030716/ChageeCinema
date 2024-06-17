import React from 'react'
import TimeSlot from './TimeSlot'

const CinemaSlot = ({cinema, time, hallType, state, selected}) => {
  return (
    <div className='flex flex-col border-b-[1px] border-gray-500 pb-8'>
        <h2 className='text-yellow-300 text-lg mb-4'> 
            {cinema} - {state}
        </h2>
        <div className='flex gap-8'>
            <TimeSlot time={time} type={hallType} selected={selected}/>
        </div>
    </div>
  )
}

export default CinemaSlot