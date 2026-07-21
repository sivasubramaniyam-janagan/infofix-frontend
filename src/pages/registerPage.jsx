import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname,setLastName] = useState("")
    const navigateTo = useNavigate()
    const [isRegistering,setIsRegistering] =useState(false)

    function handleRegister(){
        setIsRegistering(true)

        if(confirmPassword!=password){
            toast.error("Passwords does not match")
            setIsRegistering(false)
            return 
        }
        if (firstname === "" || lastname === "" || email === "" || password === "") {
           toast.error("fields cannot be empty")
           setIsRegistering(false)
             return
        }

        axios.post(import.meta.env.VITE_API_URL+"/users",{
            email:email,
            password:password,
            firstname:firstname,
            lastname:lastname

        }).then((response)=>{
            
           toast.success("user created successfuly")
           navigateTo("/login")

        }).catch((err)=>{
            toast.error(err?.response?.data?.message || "Error creating user")
        }).finally(()=>{
            setIsRegistering(false)}
        )
        
    }

    return (
        <div className="h-screen w-full bg-[url('/bg.jpg')] bg-center bg-cover flex">
            <div className="w-0 lg:w-1/2 h-full ">

            </div>

            <div className="w-full lg:w-1/2 h-full flex items-center justify-center">

                <div className="lg:w-6/10 w-11/12 backdrop-blur-md shadow-black flex flex-col text-center items-center rounded-2xl p-6" >
                    <h3 className="text-xl font-bold mb-4 text-white">Sign up</h3>
                   <input 
                   onChange={
                    (e)=>{
                        
                        setEmail(e.target.value)
                    }
                   }
                   type="email" value={email} placeholder="Email" className="h-10 w-full lg:w-9/10 rounded-md my-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-500 " />

                   <input 
                   onChange={
                    (e)=>{
                        
                        setFirstName(e.target.value)
                    }
                   }
                    value={firstname} placeholder="First Name" className="h-10 w-full lg:w-9/10 rounded-md my-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-500 " />


                     <input 
                   onChange={
                    (e)=>{
                        
                        setLastName(e.target.value)
                    }
                   }
                    value={lastname} placeholder="Last" className="h-10 w-full lg:w-9/10 rounded-md my-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-500 " />

                   <input 
                   onChange={(e)=>{
                    
                    setPassword(e.target.value)
                   }}
                   type="password" value={password} placeholder="Password" className="h-10 w-full lg:w-9/10 rounded-md my-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-500" /> 

                    <input 
                   onChange={(e)=>{
                    
                    setConfirmPassword(e.target.value)
                   }}
                   type="password" value={confirmPassword} placeholder="confirm Password" className="h-10 w-full lg:w-9/10 rounded-md my-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-500" /> 

                   <button className="bg-blue-500 text-white rounded-md h-10 w-9/10 my-2 hover:bg-blue-600" onClick={handleRegister} disabled={isRegistering}>{isRegistering ? "Signing..":"SigUp"}</button>
                    <p className="text-sm text-gray-400 my-2">Already have an account?<Link to="/login"><span className="text-blue-500 cursor-pointer">Login</span></Link></p>
                </div>


            </div>


        </div>


    )
}