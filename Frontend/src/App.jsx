import { Outlet } from "react-router-dom"
import Signup from "./screens/user/Signup"
import Header from "./components/Header"
import { ToastContainer } from "react-toastify"
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
