import { useState } from 'react'
import { formatDuration } from '../script/formatDuration';

const EditMovieForm = ({movie}) => {
    const [formData, setFormData] = useState({
        title: movie.movieTitle,
        duration: movie.duration,
        language: movie.language,
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleDurationChange = (e) => {
        const { name, value } = e.target;
        const newDuration = { ...formData.duration, [name]: value };
        const formattedDuration = formatDuration(newDuration);
        setFormData((prev) => ({
            ...prev,
            duration: formattedDuration,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost/Chagee%20Cinema/backend/editmovie.php?movieID=${movie.movieID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                movieTitle: formData.title,
                duration: formData.duration,
                language: formData.language
            }),
            credentials: "include" // Required for cookies
        });
        const data = await response.text();
        if (data.includes("Record updated successfully")) {
            setModalIsOpen(true);
            setTimeout(() => {
                setModalIsOpen(false);
                window.location.href = "/admin/index/editMovie";
            }, 2000);
        }
    };

    return (
        <form 
            className='flex justify-center w-full'
            onSubmit={handleSubmit}
        >
            <div className="fixed bottom-0 sm:bottom-10 sm:flex lg:flex-row flex-col w-2/3 h-3/4 gap-4 justify-center z-10">
                {/* Movie Poster */}
                <div className="lg:p-8 px-4 py-8 border-none bg-zinc-800 flex flex-col items-center justify-center lg:w-2/4 w-full lg:h-full sm:mb-0 mb-2 rounded-md">
                    <p className='text-white font-semibold mb-2 text-lg'>Movie Poster</p>
                    <img src={`data:image/jpeg;base64,${movie.moviePoster}`} alt={movie.movieTitle} className="lg:max-w-full max-w-[50%] lg:max-h-[90%] rounded-md"/>
                </div>

                <div className="p-8 bg-zinc-800 bg-opacity flex-1 rounded-md">
                    <h2 className="text-md text-white font-semibold mb-6">Movie Details</h2>

                    {/* Movie Title */}
                    <div className="mb-6">
                        <label htmlFor="movieTitle" className="text-gray-500">
                            Movie Title
                        </label>
                        <br />
                        <input
                            type="text"
                            name="movieTitle"
                            id="movieTitle"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white focus:border-yellow-300 outline-none"
                        />
                    </div>

                    {/* Movie Duration */}
                    <div className="mb-6 md:block flex-col">
                        <label htmlFor="duration" className="text-gray-500">
                            Movie Duration
                        </label>
                        <br />
                        <select
                            name="hour"
                            id="hour"
                            onChange={handleDurationChange}
                            className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-fit placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white focus:border-yellow-300 outline-none"
                        >
                            <option className="text-black" value="">
                                Select duration
                            </option>
                            <option className="text-black" value="1">
                                1 hour
                            </option>
                            <option className="text-black" value="2">
                                2 hours
                            </option>
                            <option className="text-black" value="3">
                                3 hours
                            </option>
                        </select>

                        <input
                            type="number"
                            min={0}
                            max={59}
                            id="minute"
                            onChange={handleDurationChange}
                            className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 ml-3 w-fit placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white focus:border-yellow-300 outline-none"
                        />
                        <span className="text-white ml-2">mins</span>
                    </div>

                    {/* Movie Language */}
                    <div className="mb-6">
                        <label htmlFor="language" className="text-gray-500">
                            Movie Language
                        </label>
                        <br />
                        <input
                            type="text"
                            name="language"
                            id="language"
                            value={formData.language}
                            onChange={(e) => setFormData({...formData, language: e.target.value})}
                            className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white focus:border-yellow-300 outline-none"
                        />
                    </div>
                    {/* Edit Movie Button */}
                    <input
                        type="submit"
                        className={`w-full text-black font-bold bg-yellow-300 mt-6 mb-10 rounded-md py-2.5 cursor-pointer`}
                        value="Save"
                        disabled={!(formData.duration && formData.language && formData.title)}
                    />
                </div>
            </div>

            {/* Modal */}
            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Movie Updated Successful!</h2>
                        <p className="text-lg">You will be redirected to the last page shortly.</p>
                    </div>
                </div>
            )}
        </form>
    )
}

export default EditMovieForm