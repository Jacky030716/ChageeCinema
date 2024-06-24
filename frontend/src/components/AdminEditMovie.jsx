import React, { useState } from "react";
import { useFetch } from "../script/useFetch";
import LoadingSpinner from "./LoadingSpinner";
import EditMovieForm from "./EditMovieForm";

const AdminEditMovie = () => {
    // Fetch booking data
    const { data: movies, error } = useFetch(
        `http://localhost/Chagee%20Cinema/backend/fetchMovieData.php`
    );

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);

    const handleEditClick = (movie) => {
        setCurrentMovie(movie);
        setIsEditing(true);
    };

    const handleDeleteMovie = async (movieID) => {
        try {
            const response = await fetch(`http://localhost/Chagee%20Cinema/backend/deleteMovie.php?movieID=${movieID}`, {
                method: "DELETE",
                headers: {
                    // Ensure correct Content-Type for form data
                    "Content-Type": "application/json",
                },
            });
    
            const data = await response.json();
    
            if (data.status == "success") {
                setModalIsOpen(true);
                setTimeout(() => {
                    setModalIsOpen(false);
                    window.location.href = "/admin/index/editMovie"; 
                }, 2000);
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    if (!movies) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen md:min-w-min border border-gray-700 mt-24 overflow-auto">
            {isEditing && <EditMovieForm movie={currentMovie} />}
            <table className={`${isEditing ? 'opacity-30' : 'opacity-100'} w-full h-full text-sm text-left text-gray-400`}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-900 dark:text-gray-400">
                <tr>
                <th scope="col" className="pl-6 py-3">
                    No
                </th>
                <th scope="col" className="px-6 py-3">
                    Movie Poster
                </th>
                <th scope="col" className="px-6 py-3">
                    Movie Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Language
                </th>
                <th scope="col" className="px-6 py-3">
                    Duration
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie, index) => (
                <tr
                    key={index}
                    className="bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600"
                >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4"><img src={`data:image/jpeg;base64,${movie.moviePoster}`} alt={movie.movieTitle} className="max-h-[140px] w-[100px] rounded-md"/></td>
                    <td className="px-6 py-4">{movie.movieTitle.toUpperCase()}</td>
                    <td className="px-6 py-4">{movie.language}</td>
                    <td className="px-6 py-4">{movie.duration}</td>
                    <td className="px-6 py-4">
                        <span 
                            className="material-symbols-outlined mr-2 cursor-pointer hover:text-yellow-300"
                            onClick={() => handleEditClick(movie)}
                        >
                            edit
                        </span>
                        <span 
                            className="material-symbols-outlined text-red-500 cursor-pointer hover:text-red-300"
                            onClick={() => handleDeleteMovie(movie.movieID)}
                        >
                            delete
                        </span>
                    </td>
                    {modalIsOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <h2 className="text-2xl text-red-500 font-bold mb-4">You had deleted {movie.movieTitle}</h2>
                            <p className="text-lg">You will be redirected to the profile page shortly.</p>
                        </div>
                    </div>
                )}
                </tr>
                
                ))}
            </tbody>
            </table>
            
        </div>
  );
};

export default AdminEditMovie;
