import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CinemaSeat, Logo } from "../images";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [contactNum, setContactNum] = useState("");
    const [password, setPassword] = useState("");

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost/Chagee%20Cinema/backend/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                contactNum,
                password,
            }),
            credentials: "include" // Required for cookies
        });
        const data = await response.text();
        if (data.includes("Login successful")) {
            setModalIsOpen(true);
            setTimeout(() => {
                setModalIsOpen(false);
                window.location.href = "/";
            }, 2000);
        }else if(data.includes("Invalid password")) {
            setError("Invalid password");
            setTimeout(() => {
                setError("");
            }, 2000);
        }else{
            setError("User not found! Register now!");
            setTimeout(() => {
                setError("");
            }, 2000);
        }
    };

    return (
        <div className="flex">
            <div className="px-8 py-2 bg-black h-screen md:w-[50%] w-full">
                <div className="flex justify-start items-center">
                    <img className="w-36 h-36" src={Logo} alt="Logo" />
                    <span className="text-white font-bold italic font-mono md:text-xl lg:block hidden">
                        Chagee Cinema
                    </span>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-white font-bold text-2xl mb-8">Sign In</h2>
                    <form className="text-gray-500" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="contactNum">Mobile Number</label><br />
                            <input 
                                type="text" 
                                name="contactNum" 
                                id="contactNum" 
                                placeholder="Enter your mobile number" 
                                className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 focus:border-yellow-300 outline-none" 
                                value={contactNum}
                                onChange={(e) => setContactNum(e.target.value)}
                            />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="password">Password</label><br />
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    id="password" 
                                    placeholder="Enter your password" 
                                    className="border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 focus:border-yellow-300 outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {showPassword ? 
                                    <FaEye className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/> 
                                    : 
                                    <FaEyeSlash className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/>
                                }
                            </div>
                            <a href="#" className="text-yellow-300 text-sm underline mt-2 block text-right">Forgot Password?</a>
                        </div>
                        <button className="w-full text-black font-bold bg-yellow-300 mt-6 mb-10 rounded-md py-2.5">Login</button>
                        <p className="text-center">Not a member yet? <a href="/register" className="text-yellow-300 underline items-center ">Sign Up now</a></p>
                    </form>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </div>
            </div>
            <div className="h-screen w-[65%] md:block hidden bg-slate-900 overflow-hidden bg-blend-overlay">
                <img src={CinemaSeat} alt="Cinema Seat Picture" />
            </div>

            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Login Successful!</h2>
                        <p className="text-lg">You will be redirected to the homepage shortly.</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;
