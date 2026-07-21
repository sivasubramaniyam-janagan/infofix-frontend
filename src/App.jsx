
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/homepage.jsx'
import AdminPage from './pages/admin.jsx'
import TestPage from './pages/testpage.jsx'
import Login from './pages/loginpage.jsx'
import { ToastBar } from 'react-hot-toast'
import { Toaster } from "react-hot-toast";
import RegisterPage from './pages/registerPage.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgotPassword from './pages/forgotPassword.jsx'



function App() {
  return (
    <>
      <GoogleOAuthProvider clientId='708817170735-dd9fideujfpp3k6to7mc0nj4c17cd762.apps.googleusercontent.com'>
      <div className='w-full h-screen flex justify-center items-center mb-20 lg:mb-0'>
        <Toaster position="top-center" reverseOrder={false} />
       <Routes>
          <Route path='/*' element={<HomePage/>}></Route>
          <Route path='/admin/*' element={<AdminPage/>}></Route>
          <Route path='/test' element={<TestPage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
        </Routes>
      </div> 
      </GoogleOAuthProvider>
    </>
  )
}

export default App
