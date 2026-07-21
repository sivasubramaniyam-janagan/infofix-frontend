import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utilities/cart"
import getPrice from "../../utilities/getPrice"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

export default function CartPage(){
    const [cart,setCart] = useState(getCart())

    
    return(
        <div className="flex flex-col gap-5 items-center pb-36 p-3.5 w-full h-full">
            {cart.map((item)=>{
                return(
                <div className="h-40 w-full lg:w-lg bg-white rounded-2xl shadow-2xl p-2.5 flex relative" key={item.product.productId}>
                    <div>
                        <img src={item.product.image} className=" w-20 lg:w-28 rounded-2xl " ></img>
                    </div>
                    <div className="ml-2">
                        <h1 className="font-semibold text-[20px]">{item.product.name}</h1>
                         <h1 className="text-gray-500">{item.product.productId}</h1>
                        {
                            (item.product.labelledPrice > item.product.price) && <span className="line-through">{getPrice(item.product.labelledPrice)}</span>
                        }
                        <h1 className="font-semibold text-accent text-[20px]">{getPrice(item.product.price)}</h1>
                    </div>
                    <div className="absolute flex right-2  h-full w-40 justify-end items-end flex-col p-4">
                        <div className="border-2 border-black p-1 rounded-2xl justify-between  flex items-center">
                            <button onClick={()=>{
                                addToCart(item.product,-1)
                                setCart(getCart())
                            }}>-</button>
                            <span className="w-12 text-center p-">{item.quantity}</span>
                            <button onClick={()=>{
                                addToCart(item.product,1)
                                setCart(getCart())
                            }}>+</button>
                            
                        </div>
                            <h1>{getPrice(item.quantity*item.product.price)}</h1>
                    </div>
                    
                </div>

                )
            })
            }

            <div className="w-8/10 lg:w-lg p-2.5 rounded-t-lg flex bg-white border-accent border-2 fixed bottom-20 lg:bottom-0 justify-between">
                <Link to='/checkout' state={cart} className="bg-accent p-2.5 rounded-2xl text-amber-50">Checkout</Link>
                <h1 className="text-2xl text-accent font-semibold">{getPrice(getTotal(cart))}</h1>
            </div>


            

        </div>
        


    )
}