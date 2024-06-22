import React, { useState } from "react";
import { useFetch } from "../script/useFetch";
import LoadingSpinner from "./LoadingSpinner";
import SortingMenu from "./SortingMenu";

const AdminBookingList = () => {
  // Fetch booking data
  const { data: bookings, error } = useFetch(
    `http://localhost/Chagee%20Cinema/backend/fetchBookingList.php`
  );

  // State variables for sorting and searching
  const [sortMenu, setSortMenu] = useState(false)
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle sorting
  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      // Toggle between ascending and descending order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sorting criteria and default to ascending order
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Function to filter bookings based on search term
  const filteredBookings = bookings
    ? bookings.filter(
        (booking) =>
          booking.name.toLowerCase().includes(searchTerm) ||
          booking.movieTitle.toLowerCase().includes(searchTerm) ||
          booking.createdAt.toLowerCase().includes(searchTerm) ||
          `${booking.locationName} - ${booking.hallID}`
            .toLowerCase()
            .includes(searchTerm)
      )
    : [];

  // Function to sort bookings based on current criteria and order
  const sortedBookings = () => {
    if (!sortBy) return filteredBookings;

    return [...filteredBookings].sort((a, b) => {
      const firstValue = a[sortBy];
      const secondValue = b[sortBy];

      if (sortOrder === "asc") {
        return firstValue > secondValue ? 1 : -1;
      } else {
        return firstValue < secondValue ? 1 : -1;
      }
    });
  };

  if (!bookings) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="relative h-full overflow-y-auto shadow-md sm:rounded-lg py-12 px-8 mt-24 max-w-full bg-black">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <SortingMenu sortMenu={sortMenu} setSortMenu={setSortMenu} handleSort={handleSort}/>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="pl-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Movie Title
              </th>
              <th scope="col" className="px-6 py-3">
                Booking Date
              </th>
              <th scope="col" className="px-6 py-3">
                Cinema
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {sortedBookings().map((booking, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{booking.name.toUpperCase()}</td>
                <td className="px-6 py-4">{booking.movieTitle.toUpperCase()}</td>
                <td className="px-6 py-4">{booking.createdAt}</td>
                <td className="px-6 py-4">{booking.locationName} - {booking.hallID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminBookingList;
