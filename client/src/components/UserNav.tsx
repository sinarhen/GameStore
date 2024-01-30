import {useState} from "react";
import {MdArrowDropDown} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import {removeCookie} from "../lib/auth";
import toast from "react-hot-toast";
import {FaUser} from "react-icons/fa";

export default function UserNav({username, avatarUrl, isAdmin}: {
  username?: string,
  avatarUrl?: string | null,
  isAdmin?: boolean
}) {

  function handleLogout() {
    removeCookie()
    window.location.replace("/")
    toast.success("Успішний вихід")
  }
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  return (
    <div className='flex items-center gap-x-2'>
      {isAdmin && <span className="px-1 text-xs rounded-sm py-0.5 bg-green-600 ">Admin</span>}
      <div onClick={() => navigate('/me')} className='rounded-full w-10 h-10 overflow-hidden flex items-center justify-center bg-neutral-900'>
        {avatarUrl ? (
          <img className="w-full h-full object-cover bg-center rounded-3xl" src={avatarUrl} alt={"avatar"}/>
        ) : (
          <FaUser className="w-[66%] h-[66%]"/>

        )}
      </div>
      <MdArrowDropDown
        className={`cursor-pointer transition-all duration-100 ${open ? 'transform -rotate-90' : ''}`}
        onClick={() => setOpen(!open)}

        size={20}/>

      <div
        className={`absolute transition-all group ease-in-out duration-300 right-4 top-14 w-48 bg-neutral-900 rounded-md shadow-lg ${!open ? "translate-x-96 opacity-0" : ""}`}>
        <p className="px-4 py-2 transition-colors hover:bg-neutral-800 rounded-t-md  text-gray-500">
          {username || "User"}
        </p>

        <hr className="h-[0.5px] opacity-50  bg-gray-200 bg-opacity-50"/>

        <Link to='/me'
              className='block transition-colors px-4 py-2 hover:bg-gray-200 hover:bg-opacity-50 cursor-pointer'>Профіль</Link>

        <div onClick={handleLogout}
             className='px-4 py-2 hover:bg-red-200  transition-colors text-red-400 rounded-b-md hover:bg-opacity-50 cursor-pointer'>Вихід
        </div>
      </div>

    </div>


  )
}