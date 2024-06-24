import React, { useState } from 'react';

const AdminAddMovie = () => {
    const [image, setImage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        language: '',
        poster: '',
    });

    const formatDuration = () => {
        const hour = document.getElementById('hour').value;
        const minutes = document.getElementById('minute').value;

        if (minutes == 0) {
            return `${hour}h`;
        } else if (minutes < 10) {
            return `${hour}h0${minutes}m`;
        } else {
            return `${hour}h${minutes}m`;
        }
    };

    const handleDurationChange = () => {
        const formattedDuration = formatDuration();
        setFormData((pre) => ({
            ...pre,
            duration: formattedDuration,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                setImage(reader.result);
                setFormData((pre) => ({
                    ...pre,
                    poster: base64String,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setFormData((pre) => ({
            ...pre,
            title: value,
        }));
    };

    const handleLangChange = (e) => {
        const value = e.target.value;
        setFormData((pre) => ({
            ...pre,
            language: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost/Chagee%20Cinema/backend/addNewMovie.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                movieTitle: formData.title,
                duration: formData.duration,
                language: formData.language,
                moviePoster: formData.poster,
            }),
            credentials: 'include', // Required for cookies
        });
        const data = await response.text();
        if (data.includes('New movie added successfully')) {
            setModalIsOpen(true);
            setTimeout(() => {
                setModalIsOpen(false);
                window.location.href = '/admin/index';
            }, 2000);
        }
    };

    return (
        <div className="w-full h-fit mt-24 bg-black p-8 rounded-md shadow shadow-slate-400 animate-fade-in">
            <h2 className="text-white text-xl font-semibold mb-6">Add New Movie</h2>
            <form onSubmit={handleSubmit}>
                <div className="md:flex w-full gap-4 justify-around">
                    {/* Movie Poster */}
                    <div className="lg:p-8 px-4 py-8 border-none bg-zinc-800 flex flex-col items-center md:w-1/4 w-full md:mb-0 mb-2 rounded-md">
                        <p className="text-white text-md font-bold text-center" htmlFor="moviePoster">
                            Upload Movie Poster
                        </p>
                        <br />
                        {image && (
                            <div className="mt-2 w-full">
                                <img src={image} alt="Preview" className="w-full h-full rounded-md border-yellow-300 border" />
                            </div>
                        )}
                        <input
                            type="file"
                            id="moviePoster"
                            name="moviePoster"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="moviePoster"
                            className="lg:w-3/4 w-full font-semibold text-black cursor-pointer border-none p-2 mt-4 bg-yellow-300 rounded-lg hover:bg-yellow-200"
                        >
                            <span className="w-full text-center flex justify-center lg:text-md text-sm">Choose File</span>
                        </label>
                    </div>

                    <div className="p-8 bg-zinc-800 bg-opacity flex-1 rounded-md">
                        <h2 className="text-md text-white font-semibold mb-6">Enter Movie Details</h2>

                        {/* Movie Title */}
                        <div className="mb-6">
                            <label htmlFor="movieTitle" className="text-gray-500">
                                Enter Movie Title
                            </label>
                            <br />
                            <input
                                type="text"
                                name="movieTitle"
                                id="movieTitle"
                                onChange={handleTitleChange}
                                className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white focus:border-yellow-300 outline-none"
                            />
                        </div>

                        {/* Movie Duration */}
                        <div className="mb-6 md:block flex-col">
                            <label htmlFor="duration" className="text-gray-500">
                                Enter Movie Duration
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
                                name="minute"
                                id="minute"
                                onChange={handleDurationChange}
                                className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 ml-3 w-fit placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white focus:border-yellow-300 outline-none"
                            />
                            <span className="text-white ml-2">mins</span>
                        </div>

                        {/* Movie Language */}
                        <div className="mb-6">
                            <label htmlFor="language" className="text-gray-500">
                                Enter Movie Language
                            </label>
                            <br />
                            <input
                                type="text"
                                name="language"
                                id="language"
                                onChange={handleLangChange}
                                className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white focus:border-yellow-300 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Add New Movie Button */}
                <input
                    type="submit"
                    className={`w-full text-black font-bold bg-yellow-300 mt-6 mb-10 rounded-md py-2.5 cursor-pointer`}
                    value="Add New Movie"
                    disabled={!(formData.duration && formData.language && formData.poster && formData.title)}
                />
            </form>

            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Add Movie Successful!</h2>
                        <p className="text-lg">You will be redirected to the admin homepage shortly.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAddMovie;
