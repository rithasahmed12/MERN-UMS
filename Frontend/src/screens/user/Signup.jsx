import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import Loader from '../../components/userComponents/Loader'
import { useRegisterMutation } from '../../slices/userSlice/usersApiSlice'
import { setCredentials } from '../../slices/userSlice/authSlice'
import { validateSignupForm } from '../../validation.js'

const Signup = () => {
  const [name, setName] = useState('') 
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [confirmPassword, setConfirmPassword] = useState('') 

  const {userInfo} = useSelector((state)=> state.auth );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, {isLoading}] = useRegisterMutation()

  useEffect(()=>{
    if(userInfo){
      navigate('/home')
    }
  },[navigate,userInfo])

  const submitHandler = async(e)=>{
    e.preventDefault();
       
    const formErrors = validateSignupForm(name,email,password);
    if (Object.keys(formErrors).length > 0) {
      console.log(formErrors);
      toast.error(formErrors.name);
      toast.error(formErrors.email);
      toast.error(formErrors.password)
      return;
    }

    if(password !== confirmPassword){
      toast.error('Passwords do not match')
    }else{
      try {
        const res = await register({name,email,password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate('/home');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <form onSubmit={submitHandler}>
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold">Signup</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                <input value={name} onChange={(n)=> setName(n.target.value)} id="name" name="name" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Name" />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
              </div>
              <div className="relative">
                <input value={email} onChange={(e)=> setEmail(e.target.value)} id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
              </div>
              <div className="relative">
                <input value={password} onChange={(p)=> setPassword(p.target.value)} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
              </div>
              <div className="relative">
                <input value={confirmPassword} onChange={(c)=> setConfirmPassword(c.target.value)} id="confirmPassword" name="confirmPassword" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Confirm Password" />
                <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
              </div>
            </div>
          </div>
        </div>

        {isLoading && <Loader/>}

        <div className="w-full flex justify-center">
          <button className="flex items-center bg-white border hover:bg-teal-500 hover:text-white transition duration-500  border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <span>Register</span>
          </button>
        </div>
          </form>
        <div className='text-sm mt-5 text-center'>
        <span className='me-2'>Already registered?</span>
        <Link to='/'>
        <span className='text-teal-500 hover:text-teal-700 cursor-pointer'>Login</span>
        </Link>
        </div>
  
      </div>
    </div>
  </div>
  )
}

export default Signup
