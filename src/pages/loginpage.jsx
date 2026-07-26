import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import api from "../../utilities/api"

export default function Login(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isclicked,setISclicked] = useState(false)
    const navigateTo = useNavigate()
    const googleLogin = useGoogleLogin({
        onSuccess:(response)=>{
            api.post("/users/google-login",{token:response.access_token}).then((response)=>{
                localStorage.setItem("token",response.data.token)
                if(response.data.isAdmin){
                    navigateTo("/admin")
                     }
                else{
                navigateTo("/")
                }
            }).catch((error)=>{
                toast.error("google login faild")
            })
        },
        onError:(error)=>{toast.error("google login faild")}
    })

    function handleLogin(){
        setISclicked(true)
        axios.post(import.meta.env.VITE_API_URL+"/users/login",{
            email:email,
            password:password
        }).then((response)=>{
            
            console.log(response)
            localStorage.setItem("token",response.data.newtoken)
            console.log(localStorage.getItem("token"))

            if(response.data.isAdmin){
                navigateTo("/admin")
            }
            else{
                navigateTo("/")
            }

        }).catch((err)=>{
            toast.error(err.response.data.message)
        }).finally(()=>{setISclicked(false)})
        
    }

    return (
        <div className="h-screen w-full bg-[url('/bg.jpg')] bg-center bg-cover flex">
            <div className="w-0 lg:w-1/2 h-full ">

            </div>

            <div className="w-full lg:w-1/2 h-full flex items-center justify-center ">

                <div className="w-11/12  lg:w-72 backdrop-blur-md shadow-black flex flex-col text-center items-center rounded-2xl p-6" >
                    <h3 className="text-xl font-bold mb-4 text-white">Sign In</h3>
                   <input 
                   onChange={
                    (e)=>{
                        
                        setEmail(e.target.value)
                    }
                   }
                   type="email" value={email} placeholder="Email" className="h-10 w-60 rounded-md my-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 text-white" />
                   <input 
                   onChange={(e)=>{
                    
                    setPassword(e.target.value)
                   }}
                   type="password" value={password} placeholder="Password" className="h-10 w-60  text-white rounded-md my-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200" />

                   <p className="text-sm text-gray-100 my-2">Forgot Password? <Link to="/forgot-password" className="text-blue-500 cursor-pointer">click here</Link></p>
                   
                   <button className={`${isclicked ? "bg-blue-600" : "bg-blue-500"} text-white rounded-md h-10 w-60 my-2 hover:bg-blue-600`} onClick={handleLogin} disabled={isclicked}>Sign in</button>
                    <button className="bg-white text-secondary rounded-md h-10 w-60 my-2 hover:bg-gray-200 flex justify-around items-center" onClick={googleLogin}><FcGoogle /> Sign in with Google</button>

                    <p className="text-sm text-gray-200 my-2">Don't have an account?<Link to="/register"> <span className="text-blue-500 cursor-pointer">Sign Up</span></Link></p>
                </div>
            </div>
        </div>


    )
}