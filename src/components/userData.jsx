import { useEffect, useState } from "react"
import api from "../../utilities/api"
import { Link, useNavigate } from "react-router-dom"

export default function UserData(){
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
        <div>
            {user? 
                <div className="flex justify-center items-center">
                    <img src={user.image} className="w-12 rounded-full"></img>
                    <select className="p-1" onChange={(e)=>{
                        if(e.target.value=="option2"){navigate("/settings") }
                        else if(e.target.value=="option3"){navigate("/my-orders") }
                        else if(e.target.value=="option4"){
                           localStorage.removeItem("token")
                            navigate("/login") }
                        e.target.value="option1"
                    }}>
                        <option value="option1"  className="bg-secondary p-1">{user.firstname}</option>
                        <option value="option2"  className="bg-secondary p-1">Settings</option>
                        <option value="option3"  className="bg-secondary p-1">My orders</option>
                        <option value="option4"  className="bg-secondary p-1">Logout</option>
                    </select>
                </div>:
                <div className="flex flex-col">
                    <Link className="font-semibold hover:text-gray-400 " to="/login">Login</Link>
                    <Link className="font-semibold hover:text-gray-400" to="/register">Register</Link>
                </div>
            }
        </div>

    )
}