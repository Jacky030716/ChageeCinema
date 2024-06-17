import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CinemaSeat, Logo } from "../images";

// Login Page
const Login = () => {

const [showPassword, setShowPassword] = useState(false)

return (
    <div className="flex">
        {/* Login Page */}
        <div className="px-8 py-2 bg-black h-screen md:w-[50%] w-full">
            <div className="flex justify-start items-center">
                <img className="w-36 h-36" src={Logo} alt="Logo" />
                <span className="text-white font-bold italic font-mono md:text-xl lg:block hidden">Cinema Booking System</span>
            </div>

            {/* Login Form */}
            <div className="flex flex-col">
                <h2 className="text-white font-bold text-2xl mb-8">Sign In</h2>
                <form action="" className="text-gray-500">
                    <div>
                        <label htmlFor="contactNum">Mobile Number</label><br />
                        <input type="text" name="contactNum" id="contactNum" placeholder="Enter your mobile number" className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1" />
                    </div>

                    <div className="mt-6">
                        <label htmlFor="contactNum">Password</label><br />
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter your password" className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1"/>
                            {showPassword ? 
                                <FaEye className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/> 
                                : 
                                <FaEyeSlash className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/>
                            }
                        </div>
                        <a href="#" className="text-yellow-300 text-sm underline mt-2 block text-right">Forgot Password?</a>
                    </div>

                    <button className="w-full text-black font-bold bg-yellow-300 mt-6 mb-10 rounded-md py-2.5">Login</button>

                    <p className="text-center">Not a member yet? <a href="#" className="text-yellow-300 underline items-center ">Sign Up now</a></p>
                </form>
            </div>
        </div>

        {/* Image */}
        <div className="h-screen w-[65%] md:block hidden bg-slate-900 overflow-hidden bg-blend-overlay">
            <img src={CinemaSeat} alt="" />
        </div>
    </div>
    )
}

export default Login