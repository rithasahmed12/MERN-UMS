import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaSignOutAlt, FaUser} from 'react-icons/fa'
import {useAdminlogoutMutation} from '../../slices/adminSlice/adminApliSlice'
import { adminLogout } from '../../slices/adminSlice/adminAuthSlice'
import { useDispatch } from 'react-redux'

const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useAdminlogoutMutation();

  const logoutHandler = async()=>{
    try {
      await logout().unwrap();
      dispatch(adminLogout());
      navigate('/admin');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="left-0 w-full h-14 bg-gradient-to-r from-indigo-400 to-indigo-600 shadow-lg">
    <div className="container flex flex-auto items-center h-full justify-between px-6">
      {/* Brand Name or Logo */}
      <div className="text-xl font-semibold text-white">MERN AUTH</div>

      {/* Navigation Links */}
      <ul className="flex space-x-5">
        <Link to='/admin/dashboard'>
        <li className='flex items-center'>
          <FaUser className="text-white mr-2 cursor-pointer hover:text-gray-200" />
          <span className="text-white hover:text-gray-200 cursor-pointer">Dashboard</span>
        </li>
        </Link>
        
        <li className="flex items-center" onClick={logoutHandler}>
          <FaSignOutAlt className="text-white mr-2 cursor-pointer hover:text-gray-200" />
          <span className="text-white hover:text-gray-200 cursor-pointer">Logout</span>
        </li>

      </ul>
    </div>
  </nav>
  )
}

export default HeaderAdmin

