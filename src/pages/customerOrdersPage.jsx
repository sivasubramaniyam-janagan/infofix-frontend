import { useEffect, useState } from "react";
import LoadingAnimation from "../components/loadingAnimation";
import api from "../../utilities/api"
import CustomerOrderDetailsModel from "../components/customerOrderDetailsModal";
import toast from "react-hot-toast";
import getPrice from "../../utilities/getPrice";


export default function CustomerOrdersPage(){
    
    const [orders,setOrders] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    const [currentPage,setCurrentPage] = useState(1)
    const [pagesize,setPageSize] = useState(3)
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
       <div className="w-full h-full  p-2">

        <div className="bg-accent w-full p-5  flex justify-between items-center " >
                <h1 className="text-2xl font-semibold text-blue-50">Orders</h1>
                <h1 className="text-amber-50 ">Total Orders : {totalOrders}</h1>
                
            </div>

        
        {isLoaded ?
          <div className="flex justify-center items-center gap-2 flex-col w-full mt-2.5">
            {
                orders.map((order)=>{
                    return (
                        <div key={order.orderId} className="bg-white shadow-2xl rounded-2xl p-2 border-t-4 border-amber-50 w-full lg:w-1/2 flex flex-col">
                            
                            <div className="flex justify-between">
                                <span className="text-center">{order.email}</span>
                                <span className="text-center">{order.orderId}</span>
                            </div>
                            <div className="flex justify-between">
                            <div className="flex ">
                                <span className="text-center">{order.firstname}</span>
                                <span className="text-center">{order.lastname}</span>
                            </div>
                                <span className="text-center">{order.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-center">{order.phone}</span>
                                <span className="text-center">{order.date.slice(0, 10) }</span>
                                <span className="text-center">{getPrice(order.total)}</span>
                                <span className="cursor-pointer flex justify-center">{<CustomerOrderDetailsModel order={order}/>}</span>
                            </div>
                            

                          
                            
                            
                            
                            
                            
                        </div>
                    )
                })
            }
           
            </div>
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