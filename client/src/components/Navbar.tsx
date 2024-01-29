import {Link, NavLink} from 'react-router-dom';
import UserNav from './UserNav';
import {useCurrentUser} from '../hooks/useCurrentUser';
import {useAuthDialog} from '../hooks/useAuthDialog';
import useCart from '../hooks/useCart';
import {ShoppingBag} from 'lucide-react';

const Navbar = () => {
  const {user, isAdmin} = useCurrentUser();
  const {openAuthDialog} = useAuthDialog();
  const {setOpen, cart} = useCart();
  return (
    <>
      <nav className="bg-neutral-800 z-50 fixed w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex duration-200 items-center justify-between h-16">
            <Link className='flex gap-x-2 items-center' to="/">
              <img className={"h-12 w-auto"} src="/logo.png" alt={"not found"} />
              <h1 className="text-white">MKm-Shop</h1>
            </Link>
            <div className="flex">
              <NavLink to="/"
                       className={({isActive}) => `hover:bg-neutral-700 transition-colors px-3 py-2 rounded-md ${!isActive ? "text-gray-300" : "text-indigo-400"}`}>Home</NavLink>
              <NavLink to="/products"
                       className={({isActive}) => `hover:bg-neutral-700 transition-colors px-3 py-2 rounded-md ${!isActive ? "text-gray-300" : "text-indigo-400"}`}>Продукти</NavLink>
              {isAdmin && <NavLink to="/admin"
                                   className={({isActive}) => `hover:bg-neutral-700 transition-colors px-3 py-2 rounded-md ${!isActive ? "text-gray-300" : "text-indigo-400"}`}>Admin
                  Panel</NavLink>}

            </div>
            <div>
              {user ? (
                <div className='flex items-center cursor-pointer gap-x-5'>
                  <div onClick={() => setOpen(true)} className='relative group'>
                    <ShoppingBag size={30} className=' group-hover:text-indigo-600 transition-colors '/>
                    <div
                      className='absolute flex items-center justify-center group-hover:scale-105 top-0 right-0 h-1/2 w-1/2 rounded-full bg-orange-600'>
                      <span className='text-[75%]'>{cart?.products?.length ?? 0}</span>
                    </div>
                  </div>
                  <UserNav isAdmin={user.role === 'admin'} avatarUrl={user.avatarUrl} username={user.name}/>
                </div>
              ) : (


                <div className='flex gap-x-2 items-center'>

                  <button
                    onClick={() => {
                      openAuthDialog('login');
                    }}
                    className='bg-green-300 bg-opacity-70 transition-all hover:bg-green-700 hover:bg-opacity-100 text-white px-4 py-2 rounded-md'>Log
                    in
                  </button>
                  <button
                    onClick={() => {
                      openAuthDialog('register');
                    }}
                    className='hover:bg-neutral-900 transition-colors text-white px-4 py-2 rounded-md'>Register
                  </button>

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
