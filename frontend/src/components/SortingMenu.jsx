import React from "react";

const SortingMenu = ({ sortMenu, setSortMenu, handleSort }) => {
  return (
    <div className="relative">
      <button
        id="dropdownRadioButton"
        data-dropdown-toggle="dropdownRadio"
        className="inline-flex items-center text-white border border-gray-300 hover:bg-gray-300 hover:text-black bg-gray-600 font-medium rounded-lg text-sm px-3 py-1.5 outline-none"
        type="button"
        onClick={() => setSortMenu(!sortMenu)}
      >
        <span className="material-symbols-outlined text-md mr-2">filter_alt</span>
        Sort By
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Sorting Menu */}
      {sortMenu && (
        <div className="absolute inset-0 top-10 p-6 rounded-md bg-gray-700 w-[130%] h-fit z-10">
          <ul className="flex flex-col justify-center items-start gap-4 w-full text-white text-sm">
            <li
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Customer Name
            </li>
            <li
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => handleSort("movieTitle")}
            >
              Movie Title
            </li>
            <li
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              Booking Date
            </li>
            <li
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => handleSort("locationName")}
            >
              Cinema
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortingMenu;
