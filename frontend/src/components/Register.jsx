import { useEffect, useRef, useState } from "react";

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";

import { states } from "../constants/state";
import { validateNumber, validateEmail, validatePassword, formatDate } from "../script/formValidation";
import CustomDropdown from "./Options";
import { CinemaSeat, Logo } from "../images";

// Register Page
const Register = () => {

const [isContactNumValid, setIsContactNumValid] = useState(null)
const [isEmailValid, setIsEmailValid] = useState(null)
const [isPasswordValid, setIsPasswordValid] = useState(null)

const [showPassword, setShowPassword] = useState(false)
const [confirmPassword, setConfirmPassword] = useState(false)
const [passwordValue, setPasswordValue] = useState("");
const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
const [isPasswordMatch, setIsPasswordMatch] = useState(null)

const [isDate, setIsDate] = useState(false)
const [value, setValue] = useState(new Date())
const [selectedOption, setSelectedOption] = useState("")

const [modalIsOpen, setModalIsOpen] = useState(false)

const calendarRef = useRef()
const [isFormValid, setIsFormValid] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // Collect all form fields

    try {
        const response = await fetch("http://localhost/Chagee%20Cinema/backend/register.php", {
            method: "POST",
            headers: {
                // Ensure correct Content-Type for form data
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(formData).toString(), // Convert FormData to URLSearchParams
            credentials: "include" // Required for sending cookies
        });

        const data = await response.text();

        console.log(data);

        if (data.includes("New user created successfully")) {
            setModalIsOpen(true);
            setTimeout(() => {
                setModalIsOpen(false);
                window.location.href = "/login"; 
            }, 2000);
        }
    } catch (error) {
        console.error("Error occurred:", error);
        // Handle any unexpected errors, e.g., network issues or server errors
    }
};


const handleContactNumChange = (e) => {
    setIsContactNumValid(validateNumber(e.target.value))
}

const handleEmailChange = (e) => {
    setIsEmailValid(validateEmail(e.target.value))
}

const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordValue(password);
    setIsPasswordValid(validatePassword(password));
}

const validatePasswordSame = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPasswordValue(confirmPassword);
    setIsPasswordMatch(passwordValue === confirmPassword);
}

const handleCalendar = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsDate(false)
    }
}

useEffect(() => {
    document.addEventListener("mousedown", handleCalendar)
    return () => {
        document.removeEventListener("mousedown", handleCalendar)
    }
}, [])

useEffect(() => {
    if (
        passwordValue &&
        confirmPasswordValue &&
        isContactNumValid &&
        isEmailValid &&
        isPasswordValid &&
        isPasswordMatch &&
        selectedOption
    ) {
        setIsFormValid(true);
    } else {
        setIsFormValid(false);
    }
}, [
    passwordValue,
    confirmPasswordValue,
    isContactNumValid,
    isEmailValid,
    isPasswordValid,
    isPasswordMatch,
    selectedOption,
]);

return (
    <div className="flex max-h-screen">
        {/* Register Page */}
        <div className="px-16 py-2 bg-black md:w-[50%] w-full">
            <div className="flex justify-start items-center">
                <img className="w-36 h-36" src={Logo} alt="Logo" />
                <span className="text-white font-bold italic font-mono md:text-xl lg:block hidden">Chagee Cinema</span>
            </div>

            {/* Register Form */}
            <h2 className="text-white font-bold text-2xl mb-1">Sign Up</h2>
            <p className="text-gray-500 mb-8">Already a member?<a className="text-yellow-300 underline ml-2" href="/login">Log In Now</a></p>
            <div className="flex flex-col h-3/5 overflow-y-auto pr-4">
                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mb-6">2
                        <label htmlFor="name" className="text-gray-500">Full Name</label><br />
                        <input type="text" name="name" id="name" placeholder="eg: Loh Chee Huan" className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white focus:border-yellow-300 outline-none"/>
                    </div>

                    {/* Mobile Number */}
                    <div className="mb-6">
                        <label className="text-gray-500" htmlFor="contactNum">Mobile Number</label><br />
                        <input 
                            type="text" 
                            name="contactNum" 
                            id="contactNum" 
                            placeholder="e.g. 0123456789" 
                            className={`border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white outline-none ${isContactNumValid === false ? "focus:border-red-600" : "focus:border-yellow-300"}`} 
                            onChange={handleContactNumChange}
                            />

                        {isContactNumValid === false && <span className="text-red-600 text-sm">Mobile number must between 10-11 digits.</span>}
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label className="text-gray-500" htmlFor="email">Email</label><br />
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="e.g. huan03@gmail.com" 
                            className={`border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white outline-none ${isEmailValid === false ?  "focus:border-red-600" : "focus:border-yellow-300"}`}
                            onChange={handleEmailChange}
                            />
                        {isEmailValid === false && <span className="text-red-600 text-sm">Invalid Email Format</span>}
                    </div>
                    
                    {/* Password */}
                    <div className="mb-6">
                        <label className="text-gray-500" htmlFor="password">Password</label><br />
                        <div>
                            <div className="relative">
                                <input 
                                    type={ showPassword ? "text" : "password"} 
                                    name="password" 
                                    id="password" 
                                    className={`border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white outline-none ${isPasswordValid === false ? "focus:border-red-600" : "focus:border-yellow-300"}`}
                                    onChange={handlePasswordChange}    
                                />
                                {confirmPassword ? 
                                    <FaEye className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/> 
                                    : 
                                    <FaEyeSlash className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/>
                                }
                            </div>
                            {isPasswordValid === false && <span className="text-red-600 text-sm">Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.</span>}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="text-gray-500" htmlFor="confirmPassword">Confirm Password</label><br />
                        <div>
                            <div className="relative">
                                <input 
                                    type={confirmPassword ? "text" : "password"} 
                                    name="confirmPassword" 
                                    id="confirmPassword" 
                                    className={`border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 text-white outline-none ${isPasswordMatch === false ? "focus:border-red-600" : "focus:border-yellow-300"}`}
                                    onChange={validatePasswordSame}
                                    />
                                {showPassword ? 
                                    <FaEye className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setConfirmPassword(!confirmPassword)}/> 
                                    : 
                                    <FaEyeSlash className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setConfirmPassword(!confirmPassword)}/>
                                }
                            </div>

                            {isPasswordMatch === false && <span className="text-red-600 text-sm">Password does not match.</span>}
                        </div>
                    </div>
                    
                    {/* Date of Birth */}
                    <div className="mb-6">
                        <label className="text-gray-500" htmlFor="dob">Date of Birth</label><br />
                        <div className="border-2 border-gray-400 bg-transparent mt-2 h-10 rounded-md p-1.5 w-full relative">
                            < IoCalendarNumber className="text-gray-400 cursor-pointer absolute right-2 top-2.5" onClick={() => setIsDate(!isDate)} />
                            {isDate ? 
                            <div ref={calendarRef}>
                                <Calendar 
                                    className="bg-white w-3/5 text-black rounded-lg p-4 flex flex-col items-center justify-center max-w-max absolute right-0 bottom-10" 
                                    onChange={setValue} 
                                    value={value} 
                                    maxDate={new Date()}
                                />
                            </div>
                                : ""
                            }
                            <span className="text-white">{formatDate(value)}</span>
                            <input type="hidden" name="dob" value={formatDate(value)}/>
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="mb-6">
                        <label className="text-gray-500" htmlFor="gender">Gender</label><br />
                        <div className="flex md:min-w-2/4 w-3/4 justify-between mt-2">
                            <div className="flex items-center justify-center">
                                <input type="radio" id="male" name="gender" value="male" className="h-4 w-4 checked:bg-yellow-300"/>
                                <label htmlFor="male" className="text-white lg:text-lg text-md ml-2">Male</label>
                            </div>
                            <div className="flex items-center justify-center">
                                <input type="radio" id="female" name="gender" value="female" className="h-4 w-4 checked:bg-yellow-300"/>
                                <label htmlFor="female" className="text-white lg:text-lg text-md ml-2">Female</label>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mb-6">
                        <label className="text-gray-500" htmlFor="gender">Location</label><br />
                        <CustomDropdown options={states} selectedOption={selectedOption} onOptionClicked={setSelectedOption} />
                        <input type="hidden" name="location" value={selectedOption}/>
                    </div>
                    
                    {/* Register Button */}
                    <input 
                        type="submit" 
                        className={`w-full text-black font-bold bg-yellow-300 mt-6 mb-10 rounded-md py-2.5 cursor-pointer ${isFormValid ? "opacity-100" : "opacity-30 pointer-events-none"}`} 
                        value="Register"
                        disabled={!isFormValid}
                    />
                </form>
            </div>
            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">New Account Created Successful!</h2>
                        <p className="text-lg">You will be redirected to the login page shortly.</p>
                    </div>
                </div>
            )}
        </div>

        {/* Image */}
        <div className="h-screen w-[65%] md:block hidden bg-slate-900 overflow-hidden bg-blend-overlay">
            <img src={CinemaSeat} alt="Cinema Background" className="w-full h-full object-cover object-center"/>
        </div>
    </div>
    )
}

export default Register