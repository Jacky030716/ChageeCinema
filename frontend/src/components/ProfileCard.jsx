import { Profile } from "../images"
import { formatContactNumber } from "../script/formatContactNumber"
import { useFetch } from "../script/useFetch"
import LoadingSpinner from "./LoadingSpinner"

const ProfileCard = ({userData}) => {
    // Fetch user data
    const { data: user, error } = useFetch(`http://localhost/Chagee%20Cinema/backend/getUserData.php?userID=${userData.userID}`)

    if(!user) {
        return <LoadingSpinner />
    }

    const { name, contactNum, dob, userPic } = user

    return (
        <div className="flex flex-col items-center bg-zinc-900 rounded-lg w-full relative shadow shadow-slate-400">
            <div className="flex flex-col items-center w-full border-b-yellow-300 border-b py-4">
                {
                    user.userPic === null ? 
                    <img className="w-24 h-22 border-2 mt-4 border-yellow-300 rounded-full translate-y-[-55%]" src={Profile} alt="Profile Picture" /> 
                    : 
                    <img className="w-24 h-22 border-2 mt-4 border-yellow-300 rounded-full translate-y-[-55%]" src={`data:image/jpeg;base64,${user.userPic}`} alt="Profile Picture" />
                }
                <h3 className='text-white font-bold mt-[-40px]'>{name}</h3>
                <span className='text-gray-500 text-xs'>{formatContactNumber(contactNum)}</span>
                <span className='text-gray-300 text-sm'>{dob}</span>
            </div>
            <div className="p-5 flex flex-col items-center w-full">
                {/* Basic Information */}
                <a href="/profile/editprofile" className="inline-flex items-center px-5 py-2 text-sm font-semibold text-center text-black bg-yellow-300 hover:bg-yellow-200 rounded-full">
                    <button>
                        Edit Profile
                    </button>
                </a>
            </div>
        </div>
    )
}

export default ProfileCard