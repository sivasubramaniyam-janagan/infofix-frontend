import { useEffect, useState } from "react"
import LoadingAnimation from "../components/loadingAnimation"
import api from "../../utilities/api"
import toast from "react-hot-toast"
import uploadMedia from "../../utilities/mediaUpload"

export default function Settings(){
    const [user,setUser] = useState(null)
    const token=localStorage.getItem("token")

    const [firstname,setFirstName]= useState("")
    const [lastname,setLastName]= useState("")
    const [image,setImage]= useState("")
    const [newImage,setNewImage] = useState(null)

    const [password,setPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const [isUpdating,setIsUpdating] = useState(false)
    const [isUpdatingProfile,setIsUpdatingProfile] = useState(false)

    useEffect(()=>{
        if(token){
            
                api.get("users/me",{headers : {Authorization:"Bearer "+token}}).then((res)=>{
                    setUser(res.data)
                    setFirstName(res.data.firstname)
                    setLastName(res.data.lastname)
                    setImage(res.data.image)
                }).catch((err)=>{
                    toast.error(err?.response?.data?.message||"something went wrong")

                })
            
        }
    },[token])

    async function updateProfile() {
        setIsUpdatingProfile(true)
        try{
            
            let uploadedimage = image
            if(newImage){
                uploadedimage = await uploadMedia(newImage)
            }
            const newToken = await api.put("/users",{firstname,lastname,image:uploadedimage},{headers:{Authorization:"Bearer "+token}})
            localStorage.setItem("token",newToken.data.token)
            toast.success("updated")
            setIsUpdatingProfile(false)
            window.location.reload();
        }catch(err){
            toast.error(err?.response?.data?.message||"somthing went wrong!")
            setIsUpdatingProfile(false)
        }
    }

    function changePassword(){
        setIsUpdating(true)
        if(password==newPassword){
            toast.error("current password and new password must be diffrent")
            setIsUpdating(false)
            return
        }

        if(newPassword!=confirmPassword){
            toast.error("passwords does not match")
            setIsUpdating(false)
            return
        }

        api.put("/users/password",{password,newPassword},{headers:{Authorization:"Bearer "+token}}).then((res)=>{
            setIsUpdating(false)
            toast.success("password changed")
            localStorage.removeItem("token")
            window.location.replace("/login")

        }).catch((err)=>{
            toast.error(err?.response?.data?.message)
            setIsUpdating(false)
            return
        })
    }

    return (
        <>
        {
            user?<div className="flex lg:w-full lg:h-full flex-col lg:flex-row gap-2 lg:justify-around p-2.5 items-center ">

                <div className="lg:w-96 w-9/10 h-3/4 flex flex-col p-3 rounded-2xl bg-white shadow-2xs gap-2">
                    <span className="text-2xl font-semibold">Basic Information</span>
                    <span className="">{user.email}</span>
                    <input onChange={(e)=>{setFirstName(e.target.value)}} value={firstname} className="w-full border-2 border-gray-400 p-1.5 rounded-sm mt-2"></input>
                    <input onChange={(e)=>{setLastName(e.target.value)}} value={lastname} className="w-full border-2 border-gray-400 p-1.5 rounded-sm mt-2"></input>
                    <input onChange={(e)=>{setNewImage(e.target.files[0])}} type="file" className="w-full border-2 border-gray-400 p-1.5 rounded-sm mt-2"></input>
                    <button onClick={updateProfile} className="bg-accent text-amber-50 p-2 rounded-2xl" disabled={isUpdatingProfile}>{isUpdatingProfile?"Updating":"Update"}</button>

                </div>

                <div className="lg:w-96 h-3/4 w-9/10 flex flex-col p-3 rounded-2xl bg-white shadow-2xs gap-2.5 ">
                    <span className="text-2xl font-semibold">Chanege Password</span>
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder="Current Password" className="w-full border-2 border-gray-400 p-1.5 rounded-sm mt-2"></input>
                    <input onChange={(e)=>{setNewPassword(e.target.value)}} value={newPassword} placeholder="New Password" className="w-full border-2 border-gray-400 p-1.5 rounded-sm mt-2"></input>
                    <input onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmPassword} placeholder="confimrPassword" className="w-full border-2 border-gray-400 p-1.5 rounded-sm mt-2"></input>
                    <button onClick={changePassword} className="bg-accent text-amber-50 p-2 rounded-2xl" disabled={isUpdating}>{isUpdating?"Updating":"Update"}</button>
                </div>
            </div> 
            
            
            :<div className="flex w-full h-full justify-center items-center"><LoadingAnimation/></div>
        }
        </>
    )
}