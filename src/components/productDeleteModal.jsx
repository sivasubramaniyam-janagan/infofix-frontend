import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ProductDeleteModel(props){

    const [isModalOpen,setIsModalOpen] = useState(false)
    const navigateTo = useNavigate()
    const product=props.product
    const refresh=props.refresh
    
    function handleDelete(){  
        const token = localStorage.getItem("token")
        axios.delete(`${import.meta.env.VITE_API_URL}/products/${product.productId}`,
                    {
                        headers: {
                        Authorization: `Bearer ${token}`,
                     }
                    }
            ).then(()=>{
                toast.success("Deleted")
                refresh()
            }).catch((err)=>{toast.error(err.message)})
                                        
    }

    return (
        <>
        <button className="block bg-red-400 hover:bg-red-950 text-amber-50 p-1 w-20 rounded-[10px]" onClick={()=>{setIsModalOpen(true)}}>delete</button>
        {
        isModalOpen && <div className="w-screen h-screen bg-black/40 fixed top-0 left-0 flex items-center justify-center ">
            <div className="w-[450px] h-[250px] bg-primary rounded-2xl flex flex-col justify-center items-center p-4 text-black text-2xl">
                <h1>
                    Are you sure you want to delete the product with Product ID{" "}
                    <span className="font-semibold">{product.productId}</span>?
                    </h1>
                <div className="flex justify-between w-full pl-9 pr-9 mt-3.5">
                    <button className="bg-red-600 hover:bg-red-950 p-1.5 w-24 rounded-2xl "onClick={handleDelete}>Delete</button>
                    <button className="bg-gray-600 hover:bg-gray-900 p-1.5 w-24 rounded-2xl "onClick={()=>{setIsModalOpen(false)}}>Cancel</button>
                    
                </div>

            </div>
        </div>
        }
        </>
    )
}