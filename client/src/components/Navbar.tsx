import { Link, NavLink } from 'react-router-dom';
import UserNav from './UserNav';
import { useCurrentUser } from '../hooks/useCurrentUser';
import AuthTriggers from './AuthTriggers';

const Navbar = () => {
    const { user } = useCurrentUser();
    console.log(user)
    return (
        <>
        <nav className="bg-neutral-800 z-50 fixed w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex duration-200 items-center justify-between h-16">
                    <h1 className="text-white"><Link to="/">Game Store</Link></h1>
                    <div className="flex">
                        <NavLink to="/" className={({isActive}) =>`hover:bg-neutral-700 transition-colors px-3 py-2 rounded-md ${!isActive ? "text-gray-300" : "text-indigo-400"}`}>Home</NavLink>
                        <NavLink to="/products" className={({isActive}) =>`hover:bg-neutral-700 transition-colors px-3 py-2 rounded-md ${!isActive ? "text-gray-300" : "text-indigo-400"}`}>Products</NavLink>

                    </div>
                    <div>
                        {user ? (
                            <UserNav isAdmin={user.role === 'admin'} avatarUrl={user.avatarUrl} username={user.name}/>
                        ) : (
                            
                            <AuthTriggers />
                        )}
                        </div>
                </div>
            </div>
        </nav>
    
        </>
        );
};

export default Navbar;
