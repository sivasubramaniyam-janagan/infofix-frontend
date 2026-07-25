import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utilities/cart"
import getPrice from "../../utilities/getPrice"
import { useLocation } from "react-router-dom"
import CreateOrderModel from "../components/createOrderModel"

export default function CheckoutPage(){
    const location=useLocation()
    const [cart,setCart] = useState(location.state)



    

    return(
        <div className="flex flex-col gap-5 items-center pb-20 p-3.5 w-full min-h-screen">
            {cart.map((item , index)=>{
                return(
                <div className=" w-full lg:w-lg bg-white rounded-2xl shadow-2xl p-2.5 flex relative" key={item.product.productId}>
                    <div>
                        <img src={item.product.image} className="w-20 lg:w-28 rounded-2xl " ></img>
                    </div>
                    <div className="ml-2">
                        <h1 className="font-semibold lg:text-[20px]">{item.product.name}</h1>
                         <h1 className="text-gray-500 text-[12px]">{item.product.productId}</h1>
                        {
                            (item.product.labelledPrice > item.product.price) && <span className="line-through">{getPrice(item.product.labelledPrice)}</span>
                        }
                        <h1 className="font-semibold text-accent text-[18px]">{getPrice(item.product.price)}</h1>
                    </div>
                    <div className="absolute flex right-2  h-full w-40 justify-end items-end flex-col p-4">
                        <div className="border border-black p-1 rounded-2xl justify-between  flex items-center">
                            <button onClick={()=>{
                                const newCart = [...cart]
                                newCart[index].quantity -= 1
                                if(newCart[index].quantity <= 0){
                                    newCart.splice(index, 1)
                                }
                                setCart(newCart)
                            }}>-</button>
                            <span className="w-12 text-center p-">{item.quantity}</span>
                            <button onClick={()=>{
                                const newCart = [...cart]
                                newCart[index].quantity += 1
                                setCart(newCart)
                            }}>+</button>
                            
                        </div>
                            <h1 className="text-[12px] lg:text-[15px]">{getPrice(item.quantity*item.product.price)}</h1>
                    </div>
                    
                </div>

                )
            })
            }

            <div className="w-9/10 lg:w-lg p-2.5 rounded-t-lg flex bg-white border-accent border-2 fixed bottom-18 lg:bottom-0 justify-between">
                <CreateOrderModel cart={cart}></CreateOrderModel>
                <h1 className="text-[18px] text-accent font-semibold">{getPrice(getTotal(cart))}</h1>
            </div>


            

        </div>
        


    )
}