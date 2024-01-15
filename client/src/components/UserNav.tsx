import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";

export default function UserNav({username} : {username?: string})
{

    function handleLogout() {
        // TODO: Implement logout
    }
    const [open, setOpen] = useState(false)
    return (
            <div className='flex items-center gap-x-2'>
                <div className='rounded-full w-8 h-8 overflow-hidden bg-white'>
                    <img 
                        alt="user profile"
                        src='https://clipart-library.com/images_k/head-silhouette-icon/head-silhouette-icon-22.png'></img>
                </div>
                <MdArrowDropDown 
                    className={`cursor-pointer transition-all duration-100 ${open ? 'transform -rotate-90' : ''}`}
                    onClick={() => setOpen(!open)}

                    size={20} />

                    <div className={`absolute transition-all ease-in-out duration-300 right-4 top-14 w-48 bg-neutral-900 rounded-md shadow-lg ${!open ? "translate-x-96 opacity-0" : ""}`}>
                        <p className="px-4 py-2 transition-colors hover:bg-neutral-800 rounded-t-md  text-gray-500">
                            {username || "User"}
                        </p>
                        
                        <hr className="h-[0.5px] opacity-50 bg-gray-200 bg-opacity-50"/>
                            
                        <Link to='/myaccount'  className='block transition-colors rounded-b-md px-4 py-2 hover:bg-gray-200 hover:bg-opacity-50 cursor-pointer'>My Account</Link>
                    
                        <Link to='/favorites' className='block transition-colors rounded-md px-4 py-2 hover:bg-gray-200 hover:bg-opacity-50 cursor-pointer'>Favorites</Link>
                    
                        <Link to='/orders' className='block px-4  transition-colors rounded-t-md py-2 hover:bg-gray-200 hover:bg-opacity-50 cursor-pointer'>Orders</Link>
                    
                        <hr className="h-[0.5px] opacity-50 text-gray-900"/>
                        <div onClick={handleLogout} 
                            className='px-4 py-2 hover:bg-red-200  transition-colors text-red-400 rounded-b-md hover:bg-opacity-50 cursor-pointer'>Logout</div>
                    </div>

            </div>
    
        
    )
}