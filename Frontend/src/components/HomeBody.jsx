import React from 'react';
import { useDispatch,useSelector } from 'react-redux';

const HomeBody = () => {
    const {userInfo} = useSelector((state)=> state.auth)
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        {/* Welcome message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-teal-600">Welcome Back, {userInfo.name} ! </h1>
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
              className="w-8 h-8 text-teal-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 008 0zM12 14a7 7 0 00-7 7v4a1 1 0 01-1-1v-4a7 7 0 00-7-7h4a1 1 0 011 1v4a7 7 0 007 7z"
              />
            </svg>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{userInfo.name}</h3>
              <p className="text-gray-600">{userInfo.email}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 text-base">
              This is your home page after successful login. You can now access
              features and functionalities available to logged-in users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
