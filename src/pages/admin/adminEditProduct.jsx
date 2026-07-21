import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import uploadMedia from "../../../utilities/mediaUpload"

export default function AdminEditProduct(){
    const location = useLocation()
    const [productId, setProductId] = useState(location.state?.productId || "")
    const [name , setName] = useState(location.state?.name || "")
    const [altnames, setAltnames] = useState("")
    const [price, setPrice] = useState(location.state?.price || "")
    const [labelledPrice , setLabelledPrice  ] = useState(location.state?.labelledPrice || "")
    const [description ,setDescription] = useState(location.state?.description || "")
    const [images ,setImages] = useState([])
    const [brand , setBrand]= useState(location.state?.brand || "")
    const [model, setModel]=useState(location.state?.model || "")
    const [category, setCategory] = useState(location.state?.category || "")
    const [isAvailable,setIsAvailable] = useState(location.state?.isAvailable || "")
    const [stock,setStock] = useState(location.state?.stock || "")
    const [isUpdating,setIsUpdating] = useState(false)

    const navigateTo = useNavigate()
   
    useEffect(
        ()=>{
            if(location.state==null){
                toast.error("No product detected")
                navigateTo("/admin")
            }
        }
    )
    
    async function handleUpdate() {
        setIsUpdating(true)
        try{
        const token = localStorage.getItem("token")

        if(token==null){
            toast.error("somthing went wrong login again")
            navigateTo("/login")
            return
        }
        
        const mediaPromises = []
        
        toast.success("uploading images")
        for (let i = 0 ; i < images.length ; i++){
            mediaPromises.push(uploadMedia(images[i]))
        }
        
        const mediaUrls = await Promise.all(mediaPromises) //return  a  array of urls
         
        const alternativeNames = altnames.split(",")

        const productData = {
            
            name:name,
            altNames:alternativeNames,
            price:price,
            labelledPrice:labelledPrice,
            description:description,
            images:mediaUrls,
            brand:brand,
            model:model,
            category:category,
            isAvailable:isAvailable,
            stock:stock
        }

        if(mediaUrls.length==0){
            productData.images=location.state.images
        }

        const response = await axios.put(import.meta.env.VITE_API_URL + "" +"/products/"+productId ,productData , {
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        console.log(response)
        toast.success("product update successfully")
        navigateTo("/admin/products")
    }catch(err){
        toast.error(err?.response?.data.message || "Failed to update product")
        setIsUpdating(false)
    }


    }


    
    return (
        <div className="w-full h-full flex items-center flex-col p-1.5 overflow-scroll">
            <div className="bg-accent w-full p-5 h-20 flex justify-between shadow-2xl sticky top-0" >
                <h1 className="text-2xl font-semibold text-blue-50">Edit Product</h1>
                <div className="h-full">
                    <button onClick={handleUpdate} className="p-1.5 bg-emerald-500 text-amber-50 w-28 rounded-2xl  hover:bg-emerald-900" disabled={isUpdating} >{isUpdating ? "Updating":"Update"}</button>
                    <button className="p-1.5 bg-red-500 text-amber-50 w-28 rounded-2xl ml-1  hover:bg-red-950" >Cancel</button>
                </div>
            </div>

            <div className="w-full bg-white flex shadow-2xl p-3 mt-3.5 flex-wrap">

                <div className="p-2 w-2/4">
                    <label className="block font-semibold">Product ID</label>
                    <input className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
                    disabled={true}
                    value={productId}
                    onChange={(e)=>{setProductId(e.target.value)}}
                    ></input>
                </div>

                 <div className="p-2 w-2/4">
                    <label className="block font-semibold">Name</label>
                    <input className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    ></input>
                </div>

                <div className="p-2 w-full">
                    <label className="block font-semibold">Alternative Names</label>
                    <input className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
                    value={altnames}
                    onChange={(e)=>{setAltnames(e.target.value)}}
                    ></input>
                </div>

                <div className="p-2 w-1/4">
                    <label className="block font-semibold">Price</label>
                    <input className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
                    value={price}
                    onChange={(e)=>{setPrice(e.target.value)}}
                    ></input>
                </div>

                <div className="p-2 w-1/4">
                    <label className="block font-semibold">Labelled Price</label>
                    <input className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
                    value={labelledPrice}
                    onChange={(e)=>{setLabelledPrice(e.target.value)}}
                    ></input>
                </div>

                <div className="p-2 w-1/4">
                    <label className="block font-semibold">Category</label>
                    <select className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
                        value={category}
                        onChange={(e)=>{setCategory(e.target.value)
                        }} >
                            <option value="Digital Printing">Digital Printing</option>
                            <option value="Mug Printing">Mug Printing</option>
                            <option value="Offset Printing">Offset Printing</option>
                            <option value="Large Format Printing">Large Format Printing</option>
                            <option value="Screen Printing">Screen Printing</option>
                            <option value="Sublimation Printing">Sublimation Printing</option>
                            <option value="Sticker Printing">Sticker Printing</option>
                            <option value="Business Cards">Business Cards</option>
                            <option value="Flyers">Flyers</option>
                            <option value="Banners">Banners</option>
                            <option value="Posters">Posters</option>
                            <option value="Brochures">Brochures</option>
                            <option value="Custom Orders">Custom Orders</option>
                            
                    </select>
                </div>
                 
                <div className="p-2 w-1/4">
                    <label className="block font-semibold">Images</label>
                    <input type="file" className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
                    multiple
                    onChange={(e)=>{setImages(e.target.files) }}
                    ></input>
                </div>
                    

                <div className="p-2 w-full">
                    <label className="block font-semibold">Description</label>
                    <textarea className="bg-white text-black border border-gray-600 p-1.5 w-full h-16 rounded-sm"
                        value={description} 
                        onChange={(e)=>{setDescription(e.target.value)}}

                    ></textarea>
                </div>

                <div className="p-2 w-1/4">
                    <label className="block font-semibold">Brand</label>
                    <select className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
                        value={brand}
                        onChange={(e)=>{setBrand(e.target.value)
                        }} >
                            <option value="HP">HP</option>
                            <option value="Canon">Canon</option>
                            <option value="Epson">Epson</option>
                            <option value="Brother">Brother</option>
                            <option value="Ricoh">Ricoh</option>
                            <option value="Xerox">Xerox</option>
                            <option value="Kyocera">Kyocera</option>
                            <option value="Konica Minolta">Konica Minolta</option>
                            <option value="Lexmark">Lexmark</option>
                            <option value="Roland">Roland</option>
                            <option value="Mimaki">Mimaki</option>
                            <option value="Durst">Durst</option>
                            <option value="Agfa">Agfa</option>
                            <option value="Fujifilm">Fujifilm</option>
                            <option value="OKI">OKI</option>
                            

                    </select>
                </div>

                <div className="p-2 w-1/4">
                    <label className="block font-semibold">Model</label>
                    <input className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
                    value={model}
                    onChange={(e)=>{setModel(e.target.value)}}
                    ></input>
                </div>

                <div className="p-2 w-1/4">
                    <label className="block font-semibold">Stock</label>
                    <input className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
                    value={stock}
                    onChange={(e)=>{setStock(e.target.value)}}
                    ></input>
                </div>

                <div className="p-2 w-1/4">
                    <label className="block font-semibold">Availability</label>
                    <select className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
                        value={isAvailable}
                        onChange={(e)=>{setIsAvailable(e.target.value)
                        }} >
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                    </select>
                </div>





            </div>
        </div>
    )
}