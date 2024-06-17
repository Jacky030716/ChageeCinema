import { Profile } from "../images"

const ProfileCard = () => {
  return (
    <div class="max-w-sm flex flex-col items-center bg-zinc-900 rounded-lg w-1/5 relative">
        <div className="flex flex-col items-center w-full border-b-yellow-300 border-b py-4">
            <img className="w-24 h-22 border-2 mt-4 border-yellow-300 rounded-full translate-y-[-55%]" src={Profile} alt="Profile Picture" />
            <h3 className='text-white font-bold mt-[-40px]'>Jacky</h3>
            <span className='text-gray-500 text-xs'>017-2990617</span>
            <span className='text-gray-300 text-sm'>16 July 2003</span>
        </div>
        <div class="p-5 flex flex-col items-center w-full">
            {/* Basic Information */}
            <a href="/profile" class="inline-flex items-center px-5 py-2 text-sm font-semibold text-center text-black bg-yellow-300 hover:bg-yellow-200 rounded-full">
                <button>
                    Edit Profile
                </button>
            </a>
        </div>
    </div>
  )
}

export default ProfileCard