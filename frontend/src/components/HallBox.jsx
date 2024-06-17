import React from 'react'

const HallBox = ({type, selected}) => {
  return (
    <div className={`${selected === type ? 'bg-yellow-300 border-yellow-300' : 'border-white  '} border-2 shadow-neutral-30 rounded-md w-fit px-8 py-4 flex flex-col items-center cursor-pointer group hover:bg-yellow-300 hover:border-yellow-300`}>
        <h3 className={`${selected === type ? 'text-black' : 'text-yellow-300'} text-2xl font-bold group-active:text-black group-hover:text-black`}>{type}</h3>
    </div>
  )
}

export default HallBox