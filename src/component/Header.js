import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../image/logo.png';
import { PiUserCircleFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import UserLink from '../commen/index';
import { toast } from 'react-toastify';
import { setUserData } from '../store/userSlice';
import ROLE from '../commen/role'

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const headerLogOut = async () => {
    try {
      const fetchData = await fetch(UserLink.logout.url, {
        method: UserLink.logout.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message || 'Logout successful');
        dispatch(setUserData(null));
      }
      if(data.error){
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out. Please try again later.');
    }
  };

  return (
    <header className='w-full bg-slate-300 h-16 shadow-md'>
      <div className='h-full flex  justify-between p-4 items-center mx-auto container'>
        <div>
          <Link to="/">
            <img src={Logo} alt='logo' className='h-20 w-20' />
          </Link>
        </div>
        <div className='flex items-center gap-5 relative'>
          <div className='relative group'>
          {user?._id &&(
            <div className='text-3xl cursor-pointer flex justify-center items-center'>
              {user?.profilepic? (
                <img src={user.profilepic} alt={user?.name} className='h-10 w-10 rounded-full' />
              ) : (
                <PiUserCircleFill />
              )}
            </div>
          )}
            {user?.role === ROLE.ADMIN && (
              <div className="absolute top-full items-center text-center bg-white p-2 shadow-lg rounded hidden group-hover:block group-focus-within:block z-50">
              <nav>
                <Link to='/admin' className="block py-1 px-2 whitespace-nowrap hover:bg-slate-100">
                  Admin Panel
                </Link>
              </nav>
            </div>
            )}
            

          </div>
          <div>
            {user?._id ? (
              <button onClick={headerLogOut} className='rounded-full bg-slate-900 px-2 py-1 text-white' >
                Log Out
              </button>
            ) : (
              <Link to='/login'>
                <button className='rounded-full bg-slate-900 px-2 py-1 text-white'>
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
