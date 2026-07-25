import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/loadingAnimation";
import ProductDeleteModel from "../../components/productDeleteModal";
import api from "../../../utilities/api"
import OrderDetailsModel from "../../components/OrderDetailsModel";

export default function AdminOrdersPage(){
    
    const [orders,setOrders] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    const [currentPage,setCurrentPage] = useState(1)
    const [pagesize,setPageSize] = useState(5)
    const [totalPages,setTotalPages] = useState(0)
    const [totalOrders,setTotalOrders] = useState(0)
    
     useEffect(()=>{

        if(!isLoaded){
        const token = localStorage.getItem("token")
        api.get("/order/"+pagesize+"/"+currentPage,{
            headers:{
                Authorization:"Bearer "+token
            }
        }).then((res)=>{
            setOrders(res.data.orders)
            setTotalPages(res.data.totalPages)
            setTotalOrders(res.data.orderCount)

            setIsLoaded(true)
            
            
        }).catch((err)=>{
            toast.error("error loading orders")
            setIsLoaded(true)
        })
        }
        },[isLoaded])

    
   


    return (
       <div className="w-full h-full overflow-scroll p-2">

        <div className="bg-accent w-full p-5 h-20 flex justify-between items-center " >
                <h1 className="text-2xl font-semibold text-blue-50">Orders</h1>
                <h1 className="text-amber-50 ">Total Orders : {totalOrders}</h1>
                
            </div>

        
        {isLoaded ?
            <table className="mt-7 w-full"  > 
            <thead className="sticky top-2.5">
                <tr >
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border" >OrderId</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Email</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">First Name</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Last Name</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Phone</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Date</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Total</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Pending</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Action</th>
                    
                </tr>
            </thead>
            <tbody>
            {
                orders.map((order)=>{
                    return (
                        <tr key={order.orderId} className="odd:bg-gray-100 even:bg-gray-300 border-t-4 border-amber-50">
                            
                            <td className="p-4 text-center">{order.orderId}</td>
                            <td className="p-4 text-center">{order.email}</td>
                            <td className="p-4 text-center">{order.firstname}</td>
                            <td className="p-4 text-center">{order.lastname}</td>
                            <td className="p-4 text-center">{order.phone}</td>
                            <td className="p-4 text-center">{order.date.slice(0, 10) }</td>
                            <td className="p-4 text-center">{order.total}</td>
                            <td className="p-4 text-center">{order.status}</td>
                            <td className="p-4 cursor-pointer flex justify-center ">{<OrderDetailsModel refresh={()=>{setIsLoaded(false)}} order={order}/>}</td>
                            
                        </tr>
                    )
                })
            }
            </tbody>
            </table>
            :
            <LoadingAnimation/>
            }
            <div className="flex justify-end items-end gap-3.5 mt-2.5">
                <button className="bg-gray-400 pl-2.5 pr-2.5 rounded-sm hover:bg-gray-600" disabled={currentPage==1} onClick={()=>{
                    setCurrentPage(currentPage-1)
                    setIsLoaded(false)
                }}>Previous</button>
                <span className="border-2 border-gray-500 pl-2.5 pr-2.5 rounded-sm ">page {currentPage} of {totalPages}</span>
                <button className="bg-gray-400 pl-2.5 pr-2.5 rounded-sm hover:bg-gray-600" disabled={currentPage==totalPages} onClick={()=>{
                    setCurrentPage(currentPage+1)
                    setIsLoaded(false)
                    }}>Next </button>
            </div>
       </div> 
    )
    
}