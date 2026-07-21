import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../../utilities/api"
import toast from "react-hot-toast"
import LoadingAnimation from "../components/loadingAnimation"
import SlideShow from "../components/slidShow"
import getPrice from "../../utilities/getPrice"
import { addToCart, getCart } from "../../utilities/cart"

export function ProductOverViewPage(){

    const parameters = useParams()
    const [product,setProduct] = useState(null)
    const navigate=useNavigate()
    const [status,setStatus] = useState("Loading")
    
    useEffect(()=>{
        if(status=="Loading"){
            api.get("/products/"+parameters.productId).then((response)=>{
            setProduct(response.data)
            
            setStatus("success")
        }).catch((err)=>{
            setStatus("err")
            toast.error("Error fetching products")
            console.log(err)
        })
        }
    },[])
    
    return (
        <div className="flex items-center justify-center h-full w-full">
            {
                
                status=="Loading" && <LoadingAnimation/>
            }

            {
                status=="err" && <div>
                    <h1>Failed to load products</h1>
                    <Link to="/" className="text-center"><h1 className="bg-accent p-1.5 rounded-2xl mt-2">Back to products</h1></Link>
                </div>
            }

            {
                status=="success" && <div className="flex h-full w-full lg:flex-row flex-col justify-center ">
                    <div className="flex w-9/12 lg:w-[50%] h-full p-2.5 justify-center items-center">
                       <SlideShow images={product.images}/>
                    </div>
                    <div className="flex w-full lg:w-[50%] h-full  ">
                        <div className="h-full w-full flex flex-col p-6">
                            <h1 className="text-3xl font-semibold text-secondary mt-">{product.name}</h1>
                           <h1 className="text-2xl font-semibold text-gray-500 mt-2.5">
                            {
                                product.altNames.map((name,index)=>{
                                    return(
                                        <span key={index}>  {name}</span>
                                    )
                                })
                            }
                            </h1>
                            <h2 className="text-sm font-semibold text-gray-500 ">{product.productId}</h2>
                            <div className="flex flex-col mt-2.5">
                                <h1 className="text-3xl font-semibold  text-accent">{getPrice(product.price)}</h1>
                                {
                                    product.labelledPrice > product.price && <h1 className="text-1xl font-semibold line-through">{getPrice(product.labelledPrice)}</h1>
                                }
                                
                            </div>
                            <span className="text-gray-700 mt-2.5">
                                <h2>
                                    {product.brand}
                                </h2>
                                <h2>
                                    {product.model}
                                </h2>
                                <h2>
                                    {product.category}
                                </h2>
                            </span>
                            <p className="mt-2.5">{product.description}</p>

                            <div className="flex gap-8 mt-3 fixed bottom-20 pb-1 bg-primary lg:static">
                                <button className="w-36 h-10 rounded-lg bg-green-500 hover:bg-green-800 transition-colors duration-300 text-white font-semibold" 
                                    onClick={()=>{addToCart(product,1)
                                        toast.success("Added")}}>Add to cart</button>
                                <Link className="w-36 h-10 flex rounded-lg bg-accent hover:bg-blue-900 transition-colors duration-300 text-white font-semibold justify-center items-center"
                                    to='/checkout' state={
                                        [{
                                            product:{
                                                productId:product.productId,
                                                image:product.images[0],
                                                price:product.price,
                                                labelledPrice:product.labelledPrice,
                                                name:product.name
                                                },
                                            quantity:1
                                        }]
                                    }>Buy now</Link>
                            </div>



                        </div>
                    </div>
                </div>
            }

        </div>
    )
} 