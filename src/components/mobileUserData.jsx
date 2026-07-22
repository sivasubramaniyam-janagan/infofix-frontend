import { useEffect, useState } from "react"
import api from "../../utilities/api"
import { Link, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg";

export default function MobileUserData(){
    const [user,setUser] = useState(null)
    const navigate=useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            api.get("/users/me",{headers:{
                Authorization:"Bearer "+token 
            }}).then((res)=>{
                setUser(res.data)
            }).catch((err)=>{console.log("error")})
        }
    },[])
    

    return (
        <div className="border-2 border-accent rounded-2xl">
            {user? 
                <div className="flex justify-center h-12 w-12  aspect-square  items-center relative">
                    <img src={user.image} className="w-12 h-12 aspect-square  rounded-lg shadow-2xl text-accent object-cover" ></img>
                    <select className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e)=>{
                        if(e.target.value=="option2"){navigate("/settings") }
                        else if(e.target.value=="option3"){navigate("/my-orders") }
                        else if(e.target.value=="option4"){
                           localStorage.removeItem("token")
                            navigate("/login") }
                            e.target.value=""
                       
                    }}>
                        <option value="" disabled hidden></option>
                        <option value="option2"  className="bg-secondary p-1">Settings</option>
                        <option value="option3"  className="bg-secondary p-1">My orders</option>
                        <option value="option4"  className="bg-secondary p-1">Logout</option>
                    </select>
                </div>:
                <div className="flex flex-col">
                    <Link to="/login" className="flex h-12 aspect-square justify-center items-center text-2xl  shadow-2xl rounded-2xl text-accent "><CgProfile /></Link>
                    
                </div>
            }
        </div>

    )
}