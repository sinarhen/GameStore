import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({isAuthenticated = true}: {
    isAuthenticated?: boolean;
} ) => {
    return (
        <nav className="bg-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex transition-all duration-200 items-center justify-between h-16">
                    <h1 className="text-white">GameStore</h1>
                    <div className="flex">
                        <Link to="/" className="text-gray-300 hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/products" className="text-gray-300 hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Products</Link>
                        <Link to="/categories" className="text-gray-300 hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Categories</Link>
                    </div>
                    <div>
                        {isAuthenticated ? (
                            <>
                            
                            </>
                        ) : (
                            
                            <>
                            
                            </>
                        )}
                        </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
