import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { validatePassword } from '../script/formValidation';

const ChangePassword = ({ userData }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Old password
    const [oldPassword, setOldPassword] = useState("") 
    const [oldPasswordValue, setOldPasswordValue] = useState("");
    const [isOldPasswordValid, setIsOldPasswordValid] = useState(null);

    // New password
    const [showPassword, setShowPassword] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(null)
    const [passwordValue, setPasswordValue] = useState("");

    // Confirm password
    const [confirmPassword, setConfirmPassword] = useState(false)
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
    const [isPasswordMatch, setIsPasswordMatch] = useState(null)

    const [isFormValid, setIsFormValid] = useState(false);

    const handleOldPasswordChange = (e) => {
        const password = e.target.value;
        setOldPasswordValue(password);
        setIsOldPasswordValid(validatePassword(password));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost/Chagee%20Cinema/backend/changePassword.php?userID=${userData.userID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                oldPassword: oldPasswordValue,
                newPassword: passwordValue,
                confirmPassword: confirmPasswordValue,

            }),
            credentials: "include" // Required for cookies
        });
        const data = await response.text();
        if (data.includes("Password updated successfully")) {
            setModalIsOpen(true);
            setTimeout(() => {
                setModalIsOpen(false);
                window.location.href = "/profile";
            }, 2000);
        }else if(data.includes("Old password is incorrect")){
            alert("Old password is incorrect")
        }
    };

    useEffect(() => {
        if (
            passwordValue &&
            confirmPasswordValue &&
            isPasswordValid &&
            isPasswordMatch
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [
        passwordValue,
        confirmPasswordValue,
        isPasswordValid,
        isPasswordMatch,
    ]);

    return (
        <div className="lg:w-3/6 w-full h-fit bg-black p-4 rounded-md shadow shadow-slate-400 animate-fade-in">
                <h2 className='text-white text-xl font-semibold mb-6'>Change Password</h2>
                <form
                    onSubmit={handleSubmit}
                >
                    {/* Old Password */}
                    <div className="mb-6">
                        <label className="text-gray-500" htmlFor="oldPassword">Old Password</label><br />
                        <div>
                            <div className="relative">
                                <input
                                    type={oldPassword ? "text" : "password"}
                                    name="oldPassword"
                                    id="oldPassword"
                                    className={`border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 text-white outline-none ${isOldPasswordValid === false ? "focus:border-red-600" : "focus:border-yellow-300"}`}
                                    onChange={handleOldPasswordChange}
                                />
                                {oldPassword ?
                                    <FaEye className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setOldPassword(!oldPassword)} />
                                    :
                                    <FaEyeSlash className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setOldPassword(!oldPassword)} />
                                }
                            </div>
                            {isOldPasswordValid === false && <span className="text-red-600 text-sm">Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.</span>}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="text-gray-500" htmlFor="password">New Password</label><br />
                        <div>
                            <div className="relative">
                                <input 
                                    type={ showPassword ? "text" : "password"} 
                                    name="password" 
                                    id="password" 
                                    className={`border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 placeholder:opacity-40 text-white outline-none ${isPasswordValid === false ? "focus:border-red-600" : "focus:border-yellow-300"}`}
                                    onChange={handlePasswordChange}    
                                />
                                {showPassword ? 
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
                        <label className="text-gray-500" htmlFor="confirmPassword">Confirm New Password</label><br />
                        <div>
                            <div className="relative">
                                <input 
                                    type={confirmPassword ? "text" : "password"} 
                                    name="confirmPassword" 
                                    id="confirmPassword" 
                                    className={`border-2 border-gray-400 bg-transparent mt-2 rounded-md p-1.5 w-full placeholder:text-sm placeholder:px-1 text-white outline-none ${isPasswordMatch === false ? "focus:border-red-600" : "focus:border-yellow-300"}`}
                                    onChange={validatePasswordSame}
                                    />
                                {confirmPassword ? 
                                    <FaEye className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setConfirmPassword(!confirmPassword)}/> 
                                    : 
                                    <FaEyeSlash className="absolute top-[40%] right-3 text-gray-400 cursor-pointer" onClick={() => setConfirmPassword(!confirmPassword)}/>
                                }
                            </div>

                            {isPasswordMatch === false && <span className="text-red-600 text-sm">Password does not match.</span>}
                        </div>
                    </div>

                    {/* Register Button */}
                    <input 
                        type="submit" 
                        className={`w-full text-black font-bold bg-yellow-300 mt-6 mb-10 rounded-md py-2.5 cursor-pointer ${isFormValid ? "opacity-100" : "opacity-30 pointer-events-none"}`} 
                        value="Change"
                        disabled={!isFormValid}
                    />
                </form>

                {modalIsOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <h2 className="text-2xl font-bold mb-4">Password Change Successful!</h2>
                            <p className="text-lg">You will be redirected to the profile page shortly.</p>
                        </div>
                    </div>
                )}
            </div>
    )
}

export default ChangePassword