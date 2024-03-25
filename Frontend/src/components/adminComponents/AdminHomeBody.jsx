import React from 'react'
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

const AdminHomeBody = () => {
  const {adminInfo} = useSelector((state)=> state.adminAuth);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        {/* Welcome message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-indigo-600">Welcome Back, {adminInfo.name} ! </h1>
          <p className="text-gray-700 text-lg">
            You are now logged in to your account.
          </p>
        </div>

        {/* User summary card */}
        <div className="bg-white shadow-lg rounded-lg px-8 py-6 sm:p-10">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-indigo-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 008 0zM12 14a7 7 0 00-7 7v4a1 1 0 01-1-1v-4a7 7 0 00-7-7h4a1 1 0 011 1v4a7 7 0 007 7z"
              />
            </svg>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Admin</h3>
              <p className="text-gray-600">{adminInfo.email}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 text-base">
              This is your home page after successful login. You can now access
              features and functionalities available to logged-in users.
            </p>
          </div>
          <div className="mt-4 w-full flex justify-center">
            <Link to='/admin/dashboard'>
          <button className="flex items-center bg-white border hover:bg-indigo-500 hover:text-white transition duration-500  border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <span>Go to Dashboard</span>
          </button>
            </Link>
        </div>

        </div>
      </div>
    </div>
  )
}

export default AdminHomeBody
