import { Link } from "react-router-dom"
import getPrice from "../../utilities/getPrice"



export default function ProductCard(props){
    const product = props.product
    return (
        <Link to={"/overview/"+product.productId} >
            <div className="flex flex-col cursor-pointer justify-between bg-white shadow-2xl p-3 w-[300px] h-[450px] m-3.5 rounded-2xl overflow-hidden  hover:[&_.primary-image]:opacity-0 ">
               <div className="relative">
                 <img src={product.images[0]} className="w-[300px] h-[300px] object-cover rounded-2xl  "></img>
                  <img src={product.images[1]} className="primary-image transition-opacity duration-500 w-[300px] h-[300px] object-cover rounded-2xl absolute top-0 left-0  "></img>
               </div>
                
                <h1 className="text-secondary font-semibold mt-1 ">{product.name}</h1>
               
               <div>
                {
                    product.labelledPrice > product.price && <span className="line-through">{getPrice(product.labelledPrice)}</span> 
                }
                <h1 className="font-semibold text-2xl">{getPrice(product.price)}</h1>
                </div>

            </div> 
        </Link>
    )
} 