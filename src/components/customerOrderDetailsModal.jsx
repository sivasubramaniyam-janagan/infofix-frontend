import { useState } from "react"
import { LuEye } from "react-icons/lu"
import getPrice from "../../utilities/getPrice"
import { FaPhoneAlt } from "react-icons/fa";



export default function CustomerOrderDetailsModel(props){
    const [isModelOpen,setIsModelOpen] =useState(false)
    const order=props.order

    
      

   

    return (
        
        <><LuEye onClick={()=>{setIsModelOpen(true)}}/>
        {isModelOpen && <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black/25">
            <div className="bg-white w-11/12 lg:w-xl h-3/4 flex flex-col p-3.5 rounded-2xl">
                <div className="flex w-full justify-end p-1 "><h1 className=" text-red-700" onClick={()=>{setIsModelOpen(false)}}>X</h1></div>
                <div className="flex lg:hidden justify-between">
                    <div className="flex flex-col">
                        <span>{order.orderId}</span>
                        <span>{order.email}</span>
                    </div>
                  <div className="flex items-center"><FaPhoneAlt /> - {order.phone}</div>
                </div>

                <div className=" hidden justify-between lg:flex">
                    <span>{order.orderId}</span>
                    <span>{order.email}</span>
                    <div className="flex items-center"><FaPhoneAlt /> - {order.phone}</div>
                
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
                                <img src={item.product.image} className="lg:w-24 w-16 p-0.5 m-1 rounded-2xl"></img>
                                <div className="flex flex-col text-[13px] lg:text-[15px] shrink-0">
                                    <span>{item.product.name}</span>
                                    <span>Quantity : {item.quantity}</span>
                                    <span  >Price : {getPrice(item.product.price)}</span>
                                </div>
                                <div className="flex items-center text-[13px] lg:text-[20px]  justify-end h-full w-full">
                                    <span>{getPrice(item.product.price*item.quantity)}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                    <div className="flex justify-end">
                        <span>Total : {getPrice(order.total)}</span>
                    </div>

                   
            </div>
            
            </div>}
        </>
        
    )
}