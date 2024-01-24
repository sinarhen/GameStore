import { Link, NavLink } from 'react-router-dom';
import UserNav from './UserNav';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useAuthDialog } from '../hooks/useAuthDialog';

const Navbar = () => {
    const { user, isAdmin } = useCurrentUser();
    const { openAuthDialog } = useAuthDialog();
    console.log(user);
    return (
        <>
        <nav className="bg-neutral-800 z-50 fixed w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex duration-200 items-center justify-between h-16">
                    <h1 className="text-white"><Link to="/">Game Store</Link></h1>
                    <div className="flex">
                        <NavLink to="/" className={({isActive}) =>`hover:bg-neutral-700 transition-colors px-3 py-2 rounded-md ${!isActive ? "text-gray-300" : "text-indigo-400"}`}>Home</NavLink>
                        <NavLink to="/products" className={({isActive}) =>`hover:bg-neutral-700 transition-colors px-3 py-2 rounded-md ${!isActive ? "text-gray-300" : "text-indigo-400"}`}>Products</NavLink>
                        {isAdmin && <NavLink to="/admin" className={({isActive}) =>`hover:bg-neutral-700 transition-colors px-3 py-2 rounded-md ${!isActive ? "text-gray-300" : "text-indigo-400"}`}>Admin Panel</NavLink>}
                    </div>
                    <div>
                        {user ? (
                            <UserNav isAdmin={user.role === 'admin'} avatarUrl={user.avatarUrl} username={user.name}/>
                        ) : (
                            
                            
                            <div className='flex gap-x-2 items-center'>

                                <button 
                                onClick={() => {
                                    openAuthDialog('login');
                                }}
                                className='bg-green-300 bg-opacity-70 transition-all hover:bg-green-700 hover:bg-opacity-100 text-white px-4 py-2 rounded-md'>Log in</button>
                                <button 
                                onClick={() => {
                                    openAuthDialog('register');
                                }}
                                className='hover:bg-neutral-900 transition-colors text-white px-4 py-2 rounded-md'>Register</button>

                            </div>
                        )}
                        </div>
                </div>
            </div>
        </nav>
    
        </>
        );
};

export default Navbar;
