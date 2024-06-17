import { formatTime } from "../script/formatDate"

const TimeSlot = ({time, type, selected}) => {
  const isSelected = time === selected;
  
  return (
    <div className={`${isSelected ? 'border-yellow-300 bg-yellow-300' : ''} border-[2px] flex flex-col items-center justify-center px-12 py-4 cursor-pointer rounded-xl hover:bg-yellow-300 hover:border-yellow-300 group`}>
        <h2 className={`${isSelected ? 'text-black' : 'text-white'} font-semibold  group-hover:text-black`}>{formatTime(time)}</h2>
        <h3 className={`${isSelected ? 'text-black' : 'text-white'} group-hover:text-black`}>{type}</h3>
    </div>
  )
}

export default TimeSlot