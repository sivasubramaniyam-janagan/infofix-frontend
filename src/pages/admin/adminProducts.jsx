import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/loadingAnimation";
import ProductDeleteModel from "../../components/productDeleteModal";


export default function AdminProductsPage(){

    const [products,setProducts] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    

     useEffect(()=>{

        if(!isLoaded){
        const token = localStorage.getItem("token")
        axios.get(import.meta.env.VITE_API_URL+""+"/products",{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
            }).then((response)=>{
             setProducts(response.data)
             setIsLoaded(true)
            })}
        },[isLoaded])

    
   


    return (
       <div className="w-full h-full overflow-scroll p-2">

        <div className="bg-accent w-full p-5 h-20 flex " >
                <h1 className="text-2xl font-semibold text-blue-50">Product Details</h1>
                
            </div>

        
        {isLoaded ?
            <table className="mt-7 w-full"  > 
            <thead className="sticky top-2.5">
                <tr >
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border" >Images</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">ProductId</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Name</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Price</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Labelled Price</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Brand</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Category</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Stock</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Availabality</th>
                    <th className="p-5 text-amber-50 bg-accent border-amber-50 border">Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                products.map((product)=>{
                    return (
                        <tr key={product.productId} className="odd:bg-blue-400 even:bg-blue-300 border-t-4 border-amber-50 hover:bg-accent hover:text-amber-50">
                            <td className="p-4 text-center"><img alt="Error loading" src={product.images[0]} className="w-20 h-20 p-1 rounded-full border-2 border-white"></img></td>
                            <td className="p-4 text-center">{product.productId}</td>
                            <td className="p-4 text-center">{product.name}</td>
                            <td className="p-4 text-center">{product.price}</td>
                            <td className="p-4 text-center">{product.labelledPrice}</td>
                            <td className="p-4 text-center">{product.brand}</td>
                            <td className="p-4 text-center">{product.category}</td>
                            <td className="p-4 text-center">{product.stock}</td>
                            <td className="p-4 text-center">{product.isAvailable ? "Available" : "N/A"}</td>
                            <td className="p-4 text-center ">
                                <ProductDeleteModel product={product} refresh={
                                    ()=>{
                                        setIsLoaded(false)
                                    }
                                }/>
                               <Link to={"/admin/editproduct"} state={product}>
                                <button className="block bg-green-400 hover:bg-green-950 text-amber-50 p-1 mt-1 w-20 rounded-[10px]">Edit</button>
                                </Link>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
            </table>
            :
            <LoadingAnimation/>
            }
            
            <Link to='/admin/addProducts' className="fixed bottom-8 right-8 bg-accent text-amber-50 text-5xl rounded-xl p-1.5 hover:bg-blue-950 hover:text-amber-100 hover:animate-[spin_0.6s_ease-in-out_1] border-2 border-amber-50" ><FaPlus /></Link>
       </div> 
    )
    
}