import { Link } from 'react-router-dom';
import UserNav from './UserNav';

const Navbar = ({isAuthenticated = true}: {
    isAuthenticated?: boolean;
} ) => {
    return (
        <nav className="bg-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex duration-200 items-center justify-between h-16">
                    <h1 className="text-white">GameStore</h1>
                    <div className="flex">
                        <Link to="/" className="text-gray-300 hover:bg-neutral-700 px-3 py-2 rounded-md ">Home</Link>
                        <Link to="/products" className="text-gray-300 hover:bg-neutral-700 px-3 py-2 rounded-md">Products</Link>
                        <Link to="/categories" className="text-gray-300 hover:bg-neutral-700 px-3 py-2 rounded-md ">Categories</Link>
                    </div>
                    <div>
                        {isAuthenticated ? (
                            <UserNav />
                        ) : (
                            
                            <div className='flex gap-x-2 items-center'>
                                <Link to="/login">
                                    <button className='bg-green-300 bg-opacity-70 transition-all hover:bg-green-700 hover:bg-opacity-100 text-white px-4 py-2 rounded-md'>Log in</button>
                                </Link>
                                <Link to="/register">
                                    <button className='hover:bg-neutral-900 transition-colors text-white px-4 py-2 rounded-md'>Register</button>
                                </Link>

                            </div>
                        )}
                        </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
