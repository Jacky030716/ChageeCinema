import React, { useState } from 'react';

const CustomDropdown = ({ options, selectedOption, onOptionClicked }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);

    const handleOptionClicked = (o) => {
        onOptionClicked(o);
        setIsOpen(false);
    }

    return (
        <div className="w-full relative flex">
            <span onClick={toggling} className="w-full px-4 py-2 text-white bg-gray-800 rounded-md cursor-pointer text-center">
                {selectedOption || "Select an Option"}
            </span>
            {isOpen && (
                <ul className="absolute text-white pt-2 w-full border rounded-md bg-gray-800 bottom-0 overflow-y-auto max-h-52">
                    {options.map(option => (
                        <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={() => handleOptionClicked(option)} key={Math.random()}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;