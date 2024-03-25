import React from 'react';
import {FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/userSlice/usersApiSlice';
import { logout } from '../slices/userSlice/authSlice';
import { useDispatch } from 'react-redux';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async()=> {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      console.log('reachedhere');
      navigate('/');  
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="left-0 w-full h-14 bg-gradient-to-r from-teal-400 to-teal-600 shadow-lg">
      <div className="container flex flex-auto items-center h-full justify-between px-6">
        {/* Brand Name or Logo */}
        <div className="text-xl font-semibold text-white">MERN AUTH</div>
  
        {/* Navigation Links */}
        <ul className="flex space-x-5">
          <Link to='/profile'>
          <li className='flex items-center'>
            <FaUser className="text-white mr-2 cursor-pointer hover:text-gray-200" />
            <span className="text-white hover:text-gray-200 cursor-pointer">Profile</span>
          </li>
          </Link>
          
          <li className="flex items-center" onClick={logoutHandler}>
            <FaSignOutAlt className="text-white mr-2 cursor-pointer hover:text-gray-200" />
            <span className="text-white hover:text-gray-200 cursor-pointer">Logout</span>
          </li>

        </ul>
      </div>
    </nav>
  
  );
};

export default Header;
