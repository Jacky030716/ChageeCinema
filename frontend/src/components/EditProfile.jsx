import React, { useEffect, useRef, useState } from 'react';
import { IoCalendarNumber } from 'react-icons/io5';
import { formatDate, validateEmail, validateNumber } from '../script/formValidation';
import { useFetch } from '../script/useFetch';
import LoadingSpinner from './LoadingSpinner';
import Calendar from 'react-calendar';

const EditProfile = ({ userData }) => {
    const { data: user, error } = useFetch(`http://localhost/Chagee%20Cinema/backend/getUserData.php?userID=${userData.userID}`);
    
    const [formData, setFormData] = useState({
        name: '',
        contactNum: '',
        email: '',
        dob: new Date(),
        gender: ''
    });

    const [isContactNumValid, setIsContactNumValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isDate, setIsDate] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const calendarRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost/Chagee%20Cinema/backend/editprofile.php?userID=${user.userID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                name: formData.name,
                contactNum: formData.contactNum,
                email: formData.email,
                gender: formData.gender,
                dob: formatDate(formData.dob),
            }),
            credentials: "include" // Required for cookies
        });
        const data = await response.text();
        if (data.includes("Record updated successfully")) {
            setModalIsOpen(true);
            setTimeout(() => {
                setModalIsOpen(false);
                window.location.href = "/profile";
            }, 2000);
        }
    };

    useEffect(() => {
        if (user) {
            const [day, month, year] = user.dob.split("/");
            setFormData({
                name: user.name,
                contactNum: user.contactNum,
                email: user.email,
                dob: new Date(year, month - 1, day),
                gender: user.gender
            });
        }
    }, [user]);

    const handleContactNumChange = (e) => {
        const value = e.target.value;
        setFormData(prevState => ({ ...prevState, contactNum: value }));
        setIsContactNumValid(validateNumber(value));
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setFormData(prevState => ({ ...prevState, email: value }));
        setIsEmailValid(validateEmail(value));
    };

    const handleCalendarChange = (date) => {
        setFormData(prevState => ({ ...prevState, dob: date }));
    };

    const handleGenderChange = (e) => {
        const value = e.target.value;
        setFormData(prevState => ({ ...prevState, gender: value }));
    };

    const handleCalendar = (e) => {
        if (calendarRef.current && !calendarRef.current.contains(e.target)) {
            setIsDate(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleCalendar);
        return () => {
            document.removeEventListener("mousedown", handleCalendar);
        };
    }, []);

    useEffect(() => {
        if (
            isContactNumValid &&
            isEmailValid &&
            formData.gender
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [isContactNumValid, isEmailValid, formData.gender]);

    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <div className="lg:w-3/6 w-full h-fit bg-black p-4 rounded-md shadow shadow-slate-400 animate-fade-in">
            <h2 className='text-white text-xl font-semibold mb-6'>Edit Profile</h2>
            <form
                onSubmit={handleSubmit}
            >
                {/* Full Name */}
                <div className="mb-6">
                    <label htmlFor="name" className="text-gray-500">Full Name</label><br />
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white focus:border-yellow-300 outline-none"
                    />
                </div>

                {/* Mobile Number */}
                <div className="mb-6">
                    <label className="text-gray-500" htmlFor="contactNum">Mobile Number</label><br />
                    <input 
                        type="text" 
                        name="contactNum" 
                        id="contactNum" 
                        value={formData.contactNum}
                        onChange={handleContactNumChange}
                        className={`border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white outline-none ${isContactNumValid === false ? "focus:border-red-600" : "focus:border-yellow-300"}`} 
                    />
                    {!isContactNumValid && <span className="text-red-600 text-sm">Mobile number must between 10-11 digits.</span>}
                </div>

                {/* Email */}
                <div className="mb-6">
                    <label className="text-gray-500" htmlFor="email">Email</label><br />
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                        className={`border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white outline-none ${isEmailValid === false ?  "focus:border-red-600" : "focus:border-yellow-300"}`}
                    />
                    {!isEmailValid && <span className="text-red-600 text-sm">Invalid email address.</span>}
                </div>
                
                {/* Date of Birth */}
                <div className="mb-6">
                    <label className="text-gray-500" htmlFor="dob">Date of Birth</label><br />
                    <div className="border-2 border-gray-400 bg-transparent mt-2 h-10 rounded-md p-1.5 w-full relative">
                        <IoCalendarNumber className="text-gray-400 cursor-pointer absolute right-2 top-2.5" onClick={() => setIsDate(!isDate)} />
                        {isDate && 
                        <div ref={calendarRef}>
                            <Calendar 
                                className="bg-white w-3/5 text-black rounded-lg p-4 flex flex-col items-center justify-center max-w-max absolute right-0 bottom-10" 
                                onChange={handleCalendarChange} 
                                value={formData.dob} 
                            />
                        </div>
                        }
                        <span className="text-white">{formatDate(formData.dob)}</span>
                        <input type="hidden" name="dob" value={formatDate(formData.dob)}/>
                    </div>
                </div>

                {/* Gender */}
                <div className="mb-6">
                    <label className="text-gray-500" htmlFor="gender">Gender</label><br />
                    <div className="flex w-2/4 justify-between mt-2">
                        <div className="flex items-center justify-center">
                            <input 
                                type="radio" 
                                id="male" 
                                name="gender" 
                                value="male" 
                                checked={formData.gender === 'male'} 
                                onChange={handleGenderChange}
                                className="h-4 w-4 checked:bg-yellow-300"
                            />
                            <label htmlFor="male" className="text-white text-lg ml-2">Male</label>
                        </div>
                        <div className="flex items-center justify-center">
                            <input 
                                type="radio" 
                                id="female" 
                                name="gender" 
                                value="female" 
                                checked={formData.gender === 'female'} 
                                onChange={handleGenderChange}
                                className="h-4 w-4 checked:bg-yellow-300"
                            />
                            <label htmlFor="female" className="text-white text-lg ml-2">Female</label>
                        </div>
                    </div>
                </div>

                {/* Register Button */}
                <input 
                    type="submit" 
                    className={`w-full text-black font-bold bg-yellow-300 mt-6 mb-10 rounded-md py-2.5 cursor-pointer ${isFormValid ? "opacity-100" : "opacity-30 pointer-events-none"}`} 
                    value="Save"
                    disabled={!isFormValid}
                />
            </form>

            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Edit Successful!</h2>
                        <p className="text-lg">You will be redirected to the profile page shortly.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;