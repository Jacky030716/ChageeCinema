const TicketCounter = ({ label, count, setCount }) => {
    const handleIncrement = () => {
        setCount(count + 1)
    }

    const handleDecrement = () => {
        if(count === 0) return
        setCount(count - 1)
    }

    return(
    <div className='flex justify-between items-center w-1/3'>
        <p className='text-white inline sm:mr-0 mr-3'>{label}</p>
        <div className='flex items-center gap-3'>
        <button 
            className='text-black bg-yellow-300 rounded-full w-8 h-8 text-center text-xl font-bold flex items-center justify-center'
            onClick={handleDecrement}
        >
            -
        </button>
        <span 
            className='text-white '
        >
            {count}
        </span>
        <button 
            className='text-black bg-yellow-300 rounded-full w-8 h-8 text-center text-xl font-bold flex items-center justify-center'
            onClick={handleIncrement}
        >
            +
        </button>
        </div>
    </div>
    )
}

export default TicketCounter