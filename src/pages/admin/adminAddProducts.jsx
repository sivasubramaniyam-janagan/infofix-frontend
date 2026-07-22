import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import uploadMedia from "../../../utilities/mediaUpload"

export default function AdminAddProducts(){
    
    const [productId, setProductId] = useState("")
    const [name , setName] = useState("")
    const [altnames, setAltnames] = useState("")
    const [price, setPrice] = useState("")
    const [labelledPrice , setLabelledPrice  ] = useState("")
    const [description ,setDescription] = useState("")
    const [images ,setImages] = useState([])
    const [brand , setBrand]= useState("")
    const [model, setModel]=useState("")
    const [category, setCategory] = useState("")
    const [isAvailable,setIsAvailable] = useState(true)
    const [stock,setStock] = useState(0)
    const [isAdding , setIsAdding] = useState(false)


    const navigateTo = useNavigate()
    async function handleSave() {

        setIsAdding(true)
       
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
            productId:productId,
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

        const response = await axios.post(import.meta.env.VITE_API_URL + "" +"/products" ,productData , {
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        console.log(response)
        toast.success("product created successfully")
        navigateTo("/admin/products")
    }catch(err){
        toast.error(err?.response?.data.message || "somthing went wrong")
        setIsAdding(false)
    }


    }


    
    return (
        <div className="w-full h-full flex items-center flex-col p-1.5 overflow-scroll">
            <div className="bg-accent w-full p-5 h-20 flex justify-between shadow-2xl sticky top-0" >
                <h1 className="text-2xl font-semibold text-blue-50">Add Product</h1>
                <div className="h-full">
                    <button onClick={handleSave} className="p-1.5 bg-emerald-500 text-amber-50 w-28 rounded-2xl  hover:bg-emerald-900" disabled={isAdding}>{isAdding ? "Saving" :"Save"}</button>
                    <button className="p-1.5 bg-red-500 text-amber-50 w-28 rounded-2xl ml-1  hover:bg-red-950" >Cancel</button>
                </div>
            </div>

            <div className="w-full bg-white flex shadow-2xl p-3 mt-3.5 flex-wrap">

                <div className="p-2 w-2/4">
                    <label className="block font-semibold">Product ID</label>
                    <input className="bg-white text-black border border-gray-600 p-1.5 w-full rounded-sm"
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
                            <option value="Processors (CPU)">Processors (CPU)</option>
                            <option value="Graphics Cards (GPU)">Graphics Cards (GPU)</option>
                            <option value="Motherboards">Motherboards</option>
                            <option value="RAM / Memory">RAM / Memory</option>
                            <option value="Storage (SSD/HDD)">Storage (SSD/HDD)</option>
                            <option value="Power Supplies (PSU)">Power Supplies (PSU)</option>
                            <option value="Cases">Cases</option>
                            <option value="Cooling Systems">Cooling Systems</option>
                            <option value="Monitors">Monitors</option>
                            <option value="Keyboards">Keyboards</option>
                            <option value="Mice">Mice</option>
                            <option value="Headsets & Speakers">Headsets & Speakers</option>
                            <option value="Networking Equipment">Networking Equipment</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Prebuilt PCs">Prebuilt PCs</option>
                            <option value="Accessories & Cables">Accessories & Cables</option>
                            
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
                            <option value="Intel">Intel</option>
                            <option value="AMD">AMD</option>
                            <option value="NVIDIA">NVIDIA</option>
                            <option value="ASUS">ASUS</option>
                            <option value="MSI">MSI</option>
                            <option value="Gigabyte">Gigabyte</option>
                            <option value="ASRock">ASRock</option>
                            <option value="Corsair">Corsair</option>
                            <option value="Kingston">Kingston</option>
                            <option value="Samsung">Samsung</option>
                            <option value="Western Digital">Western Digital</option>
                            <option value="Seagate">Seagate</option>
                            <option value="Cooler Master">Cooler Master</option>
                            <option value="NZXT">NZXT</option>
                            <option value="Logitech">Logitech</option>
                            <option value="Razer">Razer</option>
                            

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