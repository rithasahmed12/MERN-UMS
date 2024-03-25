import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useAdminLoginMutation } from '../../slices/adminSlice/adminApliSlice';
import { setAdminCredentials } from '../../slices/adminSlice/adminAuthSlice'
import {toast} from 'react-toastify'
import Loader from '../../components/adminComponents/Loader.jsx';


const AdminLogin = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [adminLogin, {isLoading}] = useAdminLoginMutation();
  
    const {adminInfo} = useSelector((state)=> state.adminAuth );
  
    useEffect(()=>{
      if(adminInfo){
        navigate('/admin/home');
      }
    },[navigate,adminInfo])

  
     const submitHandler = async(e) => {
        e.preventDefault();
        try {

          const res = await adminLogin({email,password}).unwrap();
          dispatch(setAdminCredentials({...res}));
          navigate('/admin/home')
        
        } catch (err) {
          console.log(err?.data?.message);
          toast.error(err?.data?.message || err.error);
        }
     }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
  
        <form onSubmit={submitHandler}>
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold text-center mb-3">Admin Login</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

              <div className="relative">
                <input value={email} onChange={(e)=> setEmail(e.target.value)} id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
              </div>
              <div className="relative">
                <input value={password} onChange={(e)=> setPassword(e.target.value)} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
              </div>
            </div>
          </div>
        </div>
  
          {isLoading && <Loader/>}
        <div className="w-full flex justify-center">
          <button type='submit' className="flex items-center bg-white border hover:bg-indigo-500 hover:text-white transition duration-500  border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <span>Login</span>
          </button>
          
        </div>
              </form>
         
       
  
      </div>
    </div>
  </div>
  )
}

export default AdminLogin
