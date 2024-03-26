import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { ToastContainer } from "react-toastify"
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import PrivateRoute from "./components/userComponents/PrivateRoute.jsx";
import AdminPrivateRoute from "./components/adminComponents/AdminPrivateRoute.jsx";
// user components
import Login from "./screens/user/Login.jsx";
import Signup from "./screens/user/Signup.jsx";
import Home from "./screens/user/Home.jsx";
import Profile from "./screens/user/Profile.jsx";
// admin components
import Admin from './screens/admin/Admin.jsx'
import AdminLogin from "./screens/admin/AdminLogin.jsx";
import AdminHome from "./screens/admin/AdminHome.jsx";
import AdminDashboard from "./screens/admin/AdminDashboard.jsx";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path:'/signup',
    element:<Signup/>
  },

  // Its private routes
  {
    path:'',
    element:<PrivateRoute/>,
    children:[
      {
        path:'/profile',
        element:<Profile/>
      },
      {
        path:'/home',
        element:<Home/>
      },
    ]
  },
  
  // Its admin routes
  {
    path:'/admin',
    element:<AdminLogin/>
  },
  {
   path:'/admin',
   element:<AdminPrivateRoute><Admin/></AdminPrivateRoute> ,
   children:[
    {
      path:'home',
      element:<AdminHome/>  
    }, 
    {
      path:'dashboard',
      element:<AdminDashboard/>  
    }, 

   ]
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer/>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
