import { getExactDay, getDay, getMonth } from "../script/formatDate";

const DateBox = ({date, selected}) => {
  return (
    <div className={`${date === selected ? 'bg-yellow-300 border-yellow-300 border-none': ''}border-white border-2 shadow-neutral-300 rounded-md px-4 py-2 flex flex-col items-center cursor-pointer  hover:bg-yellow-300 hover:border-yellow-300 group w-[75px]`}>
        <h3 className='text-gray-500'>{getExactDay(date)}</h3>
        <h2 className={`${date === selected ? 'text-black' : 'text-white'} text-2xl font-bold group-active:text-black group-hover:text-black`}>{getDay(date)}</h2>
        <p className={`${date === selected ? 'text-black' : 'text-yellow-300'} text-sm group-active:text-black group-hover:text-black`}>{getMonth(date)}</p>
    </div>
  )
}   

export default DateBox