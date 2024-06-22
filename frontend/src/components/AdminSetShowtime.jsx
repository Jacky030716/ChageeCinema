import { useLocation } from 'react-router-dom';
import { IoCalendarNumber } from 'react-icons/io5';
import Calendar from 'react-calendar';
import { useEffect, useRef, useState } from 'react';
import { useFetch } from '../script/useFetch';
import { formatDateYMD } from '../script/formValidation';

const API_BASE_URL = 'http://localhost/Chagee%20Cinema/backend/';

const Input = ({ label, type = "text", value, onChange, ...props }) => (
    <div className="mb-6">
        <label className="text-gray-500">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full text-white focus:border-yellow-300 outline-none"
            {...props}
        />
    </div>
);

const Select = ({ label, options, value, onChange }) => (
    <div className="mb-6 w-1/2 flex flex-col">
        <label className="text-gray-500">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className='p-3 outline-none border-none rounded-md font-semibold'
        >
            {options.map((option, i) => (
                <option key={i} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

const AdminSetShowtime = () => {
    const location = useLocation();
    const movie = location.state.movie;

    const [formError, setFormError] = useState('');
    const [isDate, setIsDate] = useState(false);
    const [value, setValue] = useState(new Date());
    const calendarRef = useRef();

    const [formData, setFormData] = useState({
        locationID: "",
        hallID: "",
        showtimeDate: "",
        showtime: "",
    });

    const handleCalendar = (e) => {
        if (calendarRef.current && !calendarRef.current.contains(e.target)) {
            setIsDate(false);
        }
    };

    const combineTime24Format = () => {
        let hour = document.getElementById("hour").value;
        let minute = document.getElementById("minute").value;

        hour = hour < 10 ? `0${hour}` : hour;
        minute = minute < 10 ? `0${minute}` : minute;

        return `${hour}${minute}`;
    };

    const handleTimeChange = () => {
        const time = combineTime24Format();
        setFormData((pre) => ({
            ...pre,
            showtime: time
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.locationID || !formData.hallID || !formData.showtimeDate || !formData.showtime) {
            setFormError("Please fill in all the fields.");
            return;
        }

        const response = await fetch(`${API_BASE_URL}setShowtime.php?movieID=${movie.movieID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData),
            credentials: 'include',
        });

        const data = await response.text();
        if (data.includes('Movie showtime added successfully')) {
            setTimeout(() => {
                window.location.href = '/admin/index';
            }, 2000);
        } else {
            console.error('Error adding movie showtime:', data);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleCalendar);
        return () => {
            document.removeEventListener("mousedown", handleCalendar);
        };
    }, []);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            showtimeDate: formatDateYMD(value),
        }));
    }, [value]);

    const { data: selections, error } = useFetch(`${API_BASE_URL}fetchDefaultSelection.php`);

    if (!selections) return <div>Loading...</div>;

    return (
        <div className="w-3/4 flex flex-col mx-auto h-fit mt-24 bg-black p-8 rounded-md shadow shadow-slate-400 animate-fade-in">
            <h2 className="text-white text-xl font-semibold mb-6">Set Movie Showtime</h2>
            <form className='w-full' onSubmit={handleSubmit}>
                <div className="sm:flex w-full gap-4 justify-around">
                    <div className="lg:p-6 px-4 py-6 border-none bg-zinc-800 flex flex-col items-center sm:w-1/4 w-full sm:mb-0 mb-2 rounded-md">
                        <img src={`data:image/jpeg;base64,${movie.moviePoster}`} alt={movie.movieTitle} className='rounded-md' />
                        <p className='text-white font-semibold mt-2 text-center'>{movie.movieTitle}</p>
                        <p className='text-white text-sm'>{movie.duration} | {movie.language}</p>
                    </div>

                    <div className="p-8 bg-zinc-800 bg-opacity flex-1 flex flex-col rounded-md">
                        <div className='flex gap-8'>
                            <div className="mb-6 w-1/2">
                                <label htmlFor="movieDate" className="text-gray-500">
                                    Enter Movie Date
                                </label>
                                <div className="border-2 border-gray-400 bg-transparent mt-2 h-10 rounded-md p-1.5 w-full relative">
                                    <IoCalendarNumber className="text-gray-400 cursor-pointer absolute right-2 top-2.5" onClick={() => setIsDate(!isDate)} />
                                    {isDate &&
                                        <div ref={calendarRef}>
                                            <Calendar className="bg-white w-3/5 text-black rounded-lg p-4 flex flex-col items-center justify-center max-w-max absolute right-0 top-0"
                                                onChange={setValue}
                                                value={value}
                                                minDate={new Date()}
                                            />
                                        </div>
                                    }
                                    <span className="text-white">{formatDateYMD(value)}</span>
                                    <input type="hidden" name="showtimeDate" value={formatDateYMD(value)} />
                                </div>
                            </div>

                            <div className="mb-6 flex-col">
                                <label htmlFor="showtime" className="text-gray-500">
                                    Enter Movie Showtime
                                </label>
                                <br />
                                <input
                                    type="number"
                                    min={0}
                                    max={24}
                                    name="hour"
                                    id="hour"
                                    onChange={handleTimeChange}
                                    className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-fit placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white focus:border-yellow-300 outline-none"
                                />
                                <span className="text-white ml-2">:</span>
                                <input
                                    type="number"
                                    min={0}
                                    max={59}
                                    name="minute"
                                    id="minute"
                                    onChange={handleTimeChange}
                                    className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 ml-3 w-fit placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white focus:border-yellow-300 outline-none"
                                />
                            </div>
                        </div>

                        <div className='flex gap-8'>
                            <Select
                                label="Select Location"
                                options={selections.location.map(loc => ({ value: loc.locationID, label: `${loc.locationName} - ${loc.state}` }))}
                                value={formData.locationID}
                                onChange={(e) => setFormData({ ...formData, locationID: e.target.value })}
                            />
                            <Select
                                label="Select Hall"
                                options={selections.hall.map(hall => ({ value: hall.hallID, label: `${hall.hallID} - ${hall.hallType}` }))}
                                value={formData.hallID}
                                onChange={(e) => setFormData({ ...formData, hallID: e.target.value })}
                            />
                        </div>
                        {formError && <p className="text-red-500 text-sm">{formError}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    className={`w-full text-black font-bold bg-yellow-300 mt-6 mb-10 rounded-md py-2.5 cursor-pointer`}
                >
                    Set Showtime
                </button>
            </form>
        </div>
    );
};

export default AdminSetShowtime;
