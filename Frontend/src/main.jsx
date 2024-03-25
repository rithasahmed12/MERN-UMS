import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx';
import Login from './screens/user/Login.jsx'
import Signup from './screens/user/Signup.jsx'
import Home from './screens/user/Home.jsx';
import Profile from './screens/user/Profile.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<Login />} />
      <Route path='/signup' element={<Signup/>} />
      {/* Private Routes */}
      <Route path='' element={<PrivateRoute />}>
      <Route path='/home' element={<Home />} /> 
      <Route path='/profile' element={<Profile />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
)
