import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Admin = () => {

  const {adminInfo}=useSelector((store)=>store.adminAuth)

 return adminInfo?<Outlet/>:<Navigate to={'/admin'} replace/>

 
 
}

export default Admin