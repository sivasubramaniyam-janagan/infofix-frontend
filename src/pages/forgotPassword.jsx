import { use, useState } from "react"
import api from "../../utilities/api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ForgotPassword(){
    const [isOTPsent,setIsOTPsent] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,SetConfirmPasswrd] = useState("")
    const [otp,setOTP] = useState("")
    const [isClicked,setIsClicked]=useState(false)
    const navigateTo=useNavigate()

    async function sendOTP() {
        setIsClicked(true)
        api.post("/users/send-otp",{email}).then((response)=>{
            toast.success(response.data.message||"success")
            setIsOTPsent(true)
            setIsClicked(false)
        }).catch((error)=>{
            toast.error("error sending otp")
            setIsClicked(false)
        })
        
    }
    
    async function resetPassword() {
        setIsClicked(true)
        if(password!=confirmPassword){
            toast.error("passwords do not match")
            return setIsClicked(false)
        }

        if(password.length<8){
            toast.error("password must be at least 8 characters")
            return setIsClicked(false)
        }

        api.post("/users/verify-otp",{
            email:email,
            password:password,
            otp:otp
        }).then(()=>{
            toast.success("password rest success")
            navigateTo("/login")
        }).catch((error)=>{
            toast.error( error?.response?.data?.message ||"Error reseting password")
        }).finally(()=>{setIsClicked(false)})

    }
    return (
    <>
        {!isOTPsent ? <div className="flex flex-col items-center justify-around h-60 w-80 bg-white rounded-2xl shadow-2xl p-3.5">
            <h1 className="text-2xl font-semibold text-secondary">Forgot password?</h1>
            <input value={email} placeholder="email" className="w-full border-2 rounded-sm border-accent p-1.5" onChange={(e)=>{setEmail(e.target.value)}}></input>
            <button disabled={isClicked} className={`w-1/2 text-white p-2.5 rounded-sm hover:bg-secondary ${isClicked ? "bg-secondary":" bg-accent"}` } onClick={sendOTP}>Send OTP</button>
        </div>:
        
        
        <div className="flex flex-col items-center justify-around h-60 w-80 bg-white rounded-2xl shadow-2xl p-3.5">
            <input value={otp} placeholder="OTP sent to your mail" className="w-full border-2 rounded-sm border-accent p-1.5" onChange={(e)=>{setOTP(e.target.value)}}></input>
            <input value={password} type="password" placeholder="Enter new password" className="w-full border-2 rounded-sm border-accent p-1.5" onChange={(e)=>{setPassword(e.target.value)}}></input>
            <input value={confirmPassword} type="password" placeholder="Confirm password" className="w-full border-2 rounded-sm border-accent p-1.5" onChange={(e)=>{SetConfirmPasswrd(e.target.value)}}></input>
            <button disabled={isClicked}  className={`w-1/2 text-white p-2.5 rounded-sm ${isClicked?"bg-secondary":"bg-accent"} hover:bg-secondary`} onClick={resetPassword}>Reset Password</button>

        </div>}
    </>
    )
}