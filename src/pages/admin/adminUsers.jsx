import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/loadingAnimation";
import api from "../../../utilities/api";


export default function AdminUsers(){

    const [users,setUsers] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    

     useEffect(()=>{

        if(!isLoaded){
        const token = localStorage.getItem("token")
        axios.get(import.meta.env.VITE_API_URL+"/users/getallusers",{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
            }).then((response)=>{
             setUsers(response.data)
             setIsLoaded(true)
            }).catch((error)=>{
                setIsLoaded(true)
                toast.error("error loading")
            })
        }
        },[isLoaded])

    async function blockuser(email) {
        try{
            const token = localStorage.getItem("token")
            const response = await api.post("/users/block-user",{email},{headers : {
                "Authorization":`Bearer ${token}`
            }})

            toast.success(response.data.message)
            setIsLoaded(false)
        }
        catch(error){
            toast.error(error?.response?.data?.message||"Error")
        }
    }

    async function unblockuser(email) {
        try{
            const token = localStorage.getItem("token")
            const response = await api.post("/users/unblock-user",{email},{headers : {
                "Authorization":`Bearer ${token}`
            }})

            toast.success(response.data.message)
            setIsLoaded(false)
        }
        catch(error){
            toast.error(error?.response?.data?.message||"Error")
        }
    }

    
   


    return (
       <div className="w-full h-full overflow-scroll p-2">

        <div className="bg-accent w-full p-5 h-20 flex " >
                <h1 className="text-2xl font-semibold text-blue-50">Users</h1>
                
            </div>

        
        {isLoaded ?
            <table className="mt-7 w-full"  > 
            <thead className="sticky top-2.5">
                <tr >
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border" >Image</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Email</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Firstname</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">lastname</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">isEmailVerified</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Isblocked</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">IsAdmin</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                users.map((user,index)=>{
                    return (
                        <tr key={index} className="odd:bg-gray-100 even:bg-gray-300 border-t-4 border-amber-50 hover:bg-accent hover:text-amber-50">
                            <td className="p-2 text-center"><img alt="profile" src={user.image} className="w-20 h-20 p-1 rounded-full border-2 border-white"></img></td>
                            <td className="p-2 text-center">{user.email}</td>
                            <td className="p-2 text-center">{user.firstname}</td>
                            <td className="p-2 text-center">{user.lastname}</td>
                            <td className="p-2 text-center">{user.isEmailVerified ?"verified":"not verified" }</td>
                            <td className="p-2 text-center">{user.isBlocked ?"Blocked":"Allowed"}</td>
                            <td className="p-2 text-center">{user.isAdmin ?"Admin":"customer"}</td>
                            <td className="p-2 text-center">
                                {
                                    !user.isBlocked ? <button className="px-2 py-1 rounded-sm bg-red-500" onClick={()=>{blockuser(user.email)}}>Block</button> :
                                    <button className="px-2 py-1 rounded-sm bg-green-500" onClick={()=>{unblockuser(user.email)}}>Unblock</button>
                                }
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
            </table>
            :
            <LoadingAnimation/>
            }       </div> 
    )
    
}