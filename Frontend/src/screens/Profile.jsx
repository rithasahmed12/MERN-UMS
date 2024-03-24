import Header from '../components/Header'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import { setCredentials } from '../slices/authSlice'

const Profile = () => {
    const [name, setName] = useState('') 
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [confirmPassword, setConfirmPassword] = useState('') 

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const {userInfo} = useSelector((state)=> state.auth );

    useEffect(()=> {
        setName(userInfo.name)
        setEmail(userInfo.email)
    },[userInfo.setName, userInfo.setEmail])

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("passwords do not match");
        }else{
            console.log('submit');
        }
    }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          {/* <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div> */}
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="flex justify-between items-center mt-8">
              <Link
                to="/home"
                className="flex items-center bg-white border hover:bg-teal-500 hover:text-white transition duration-500 border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.293 9.293a1 1 0 0 1 0-1.414l3-3a1 1 0 1 1 1.414 1.414L9.414 8H17a1 1 0 1 1 0 2H9.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span>Back</span>
              </Link>
              <Link
                to="/edit-profile"
                className="flex items-center bg-white border hover:bg-teal-500 hover:text-white transition duration-500 border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span>Edit Profile</span>
              </Link>
            </div>
            <div className="max-w-md mx-auto">
              <div className="flex justify-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg"
                  alt="Profile"
                  className="h-28 w-28 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">User Profile</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <p className="text-gray-900">{name}</p>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <p className="text-gray-900">{email}</p>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bio
                    </label>
                    <p className="text-gray-900">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed euismod tellus sed dictum faucibus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile
