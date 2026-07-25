import { useState } from "react"
import { LuEye } from "react-icons/lu"
import getPrice from "../../utilities/getPrice"
import toast from "react-hot-toast"
import api from "../../utilities/api"


export default function OrderDetailsModel(props){
    const [isModelOpen,setIsModelOpen] =useState(false)
    const refresh=props.refresh
    const order=props.order

    const [isUpdating,setIsUpdating] = useState(false)
    const [notes,setNotes]= useState(order.notes)
    const [status,setStatus] = useState(order.status)    

    async function orderUpdate(){
        setIsUpdating(true)
        const token = localStorage.getItem("token")

        try{
            await api.put("/order/"+order.orderId,{status,notes},{
                headers:{
                    Authorization:"Bearer "+token
            }})
            toast.success("Updated Successfuly")
            setIsUpdating(false)
            refresh()
        }
        catch(err){
            toast.error(err?.response?.data?.message || "Failed to update order")
            setIsUpdating(false)
        }
    }

    return (
        
        <><LuEye className="text-2xl bg-accent text-white w-15 h-6 rounded-sm hover:bg-secondary " onClick={()=>{setIsModelOpen(true)}}/>
        {isModelOpen && <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black/25">
            <div className="bg-amber-50 w-xl h-3/4 flex flex-col p-3.5 rounded-2xl">
                <div className="flex w-full justify-end p-1 "><h1 className=" text-red-700 hover:text-red-900 hover:font-bold" onClick={()=>{setIsModelOpen(false)}}>X</h1></div>
                <div className="flex justify-between">
                    <span className="font-semibold">{order.orderId}</span>
                    <span>{order.email}</span>
                    <span>🕿 {order.phone}</span>
                </div>
                <div className="flex w-full">
                    <span>address : {order.postalCode} {order.addressLine1} {order.addressLine2} {order.city}  {order.province}</span>
                </div>

                 <div className="flex w-full flex-col">
                    <span className="text-accent">{order.status} </span>
                    <span className="text-black">{order.date.slice(0,10)} </span>
                    <p className="text-gray-500">{order.notes}</p>
                </div>



                <div className="flex flex-col w-full gap-2.5 overflow-y-scroll">
                    {order.items.map((item,index)=>{
                        return(
                            <div key={index} className="flex w-full shadow-2xl p-1">
                                <img src={item.product.image} className="w-24 p-0.5 m-1 rounded-2xl"></img>
                                <div className="flex flex-col shrink-0">
                                    <span>{item.product.name}</span>
                                    <span>Quantity : {item.quantity}</span>
                                    <span>Price : {getPrice(item.product.price)}</span>
                                </div>
                                <div className="flex items-center justify-end h-full w-full">
                                    <span>{getPrice(item.product.price*item.quantity)}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                    <div className="flex justify-end">
                        <span>Total : {getPrice(order.total)}</span>
                    </div>

                    <div className="flex justify-between items-end">
                        
                        <div className="w-2/4 flex flex-col ">
                            <label>Edit Notes</label>
                            <textarea className="border-2 w-full rounded-sm" value={notes} onChange={(e)=>{setNotes(e.target.value)}}></textarea>
                        </div>
                        
                        <div className="w-1/4 flex flex-col ">
                            <label>Edit status</label>
                            <select className="border-2 h-8 border-gray-600 rounded-sm" value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                            <option value="pending">pending</option>
                            <option value="completed">completed</option>
                            <option value="shipped">shipped</option>
                        </select>
                        </div>

                        <div className=" flex items-center">
                            <button className="bg-accent text-amber-50 pl-5 pr-5 rounded-sm h-7 " disabled={isUpdating} onClick={orderUpdate}>{isUpdating?"updating":"Update"}</button>
                        </div>

                        

                    </div>
            </div>
            
            </div>}
        </>
        
    )
}