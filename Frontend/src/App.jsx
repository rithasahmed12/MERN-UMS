import { Outlet } from "react-router-dom"
import Signup from "./screens/user/Signup"
import Header from "./components/userComponents/Header"

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <ToastContainer />
    <Outlet />
    </>
  )
}

export default App
